import json
import re
from collections.abc import MutableMapping
from copy import deepcopy
from pathlib import Path

# Configuration
LOCALES = ["fr", "ar"]
BASE_LOCALE = "en"
PROJECT_DIRS = [Path("./app"), Path("./components")]
REPORT_FILE = Path("translation_report.txt")

# Helper to ensure "use client" directive
CLIENT_DIRECTIVE = "'use client';"


def ensure_client_directive(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines:
        return False
    first_line = lines[0].strip().strip(';').strip('"\'')
    if first_line == "use client":
        return False
    if CLIENT_DIRECTIVE not in lines[0]:
        lines.insert(0, CLIENT_DIRECTIVE)
        path.write_text("\n".join(lines) + ("\n" if text.endswith("\n") else ""), encoding="utf-8")
        return True
    return False


def load_catalog(locale: str) -> dict:
    path = Path("messages") / f"{locale}.json"
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def save_catalog(locale: str, data: dict) -> None:
    path = Path("messages") / f"{locale}.json"
    with path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def get_nested(data: dict, dotted_key: str):
    current = data
    for part in dotted_key.split('.'):
        if isinstance(current, MutableMapping) and part in current:
            current = current[part]
        else:
            return None
    return current


def set_nested(data: dict, dotted_key: str, value) -> None:
    parts = dotted_key.split('.')
    current = data
    for part in parts[:-1]:
        if part not in current or not isinstance(current[part], MutableMapping):
            current[part] = {}
        current = current[part]
    current[parts[-1]] = value


def sort_dict(data):
    if isinstance(data, dict):
        return {key: sort_dict(data[key]) for key in sorted(data.keys())}
    if isinstance(data, list):
        return [sort_dict(item) for item in data]
    return data


def to_placeholder_structure(value, prefix: str):
    if isinstance(value, dict):
        return {k: to_placeholder_structure(v, prefix) for k, v in value.items()}
    if isinstance(value, list):
        return [to_placeholder_structure(v, prefix) for v in value]
    if isinstance(value, str):
        if value.startswith(prefix.strip()) or value.startswith("[UNTRANSLATED]"):
            return value
        return f"{prefix}{value}" if value else prefix.strip()
    return value


def mark_untranslated(value):
    return to_placeholder_structure(value, "[UNTRANSLATED] ")


def create_base_placeholder(locale_catalogs: dict, namespace: str):
    for locale in LOCALES:
        candidate = get_nested(locale_catalogs[locale], namespace)
        if candidate is not None:
            return to_placeholder_structure(candidate, "[TODO: translate] ")
    return "[TODO: translate]"


def collect_untranslated_paths(catalog: dict, prefix: str = ""):
    entries = []
    if isinstance(catalog, dict):
        for key, value in catalog.items():
            next_prefix = f"{prefix}.{key}" if prefix else key
            entries.extend(collect_untranslated_paths(value, next_prefix))
    elif isinstance(catalog, list):
        for index, value in enumerate(catalog):
            next_prefix = f"{prefix}[{index}]"
            entries.extend(collect_untranslated_paths(value, next_prefix))
    elif isinstance(catalog, str) and catalog.startswith("[UNTRANSLATED]"):
        entries.append(prefix)
    return entries


# Load catalogs upfront
base_catalog = load_catalog(BASE_LOCALE)
locale_catalogs = {locale: load_catalog(locale) for locale in LOCALES}

component_files = []
for directory in PROJECT_DIRS:
    if directory.exists():
        component_files.extend(directory.rglob("*.tsx"))

report_lines = []
base_modified = False
locale_modified = {locale: False for locale in LOCALES}

for file_path in component_files:
    text = file_path.read_text(encoding="utf-8")
    translation_namespaces = re.findall(r"useTranslations\((['\"])(.+?)\1\)", text)
    if not translation_namespaces:
        continue

    if ensure_client_directive(file_path):
        report_lines.append(f"[CLIENT] Added 'use client' to {file_path}")

    unique_namespaces = {ns for _, ns in translation_namespaces}

    for namespace in unique_namespaces:
        base_value = get_nested(base_catalog, namespace)
        if base_value is None:
            placeholder = create_base_placeholder(locale_catalogs, namespace)
            set_nested(base_catalog, namespace, placeholder)
            base_modified = True
            report_lines.append(f"[BASE_ADDED] {namespace} -> messages/{BASE_LOCALE}.json")
            base_value = placeholder

        for locale, catalog in locale_catalogs.items():
            locale_value = get_nested(catalog, namespace)
            if locale_value is None:
                new_value = mark_untranslated(deepcopy(base_value))
                set_nested(catalog, namespace, new_value)
                locale_modified[locale] = True
                report_lines.append(f"[MISSING] Added {namespace} to messages/{locale}.json")
            else:
                if locale_value == base_value:
                    new_value = mark_untranslated(deepcopy(base_value))
                    set_nested(catalog, namespace, new_value)
                    locale_modified[locale] = True
                    report_lines.append(f"[UNTRANSLATED] Marked {locale}/{namespace}")

# Persist catalogs keeping alphabetical order
if base_modified:
    save_catalog(BASE_LOCALE, sort_dict(base_catalog))

untranslated_summary = {}
for locale, modified in locale_modified.items():
    if modified:
        locale_catalogs[locale] = sort_dict(locale_catalogs[locale])
        save_catalog(locale, locale_catalogs[locale])
    untranslated_summary[locale] = collect_untranslated_paths(locale_catalogs[locale])

# Append untranslated summary to report
report_lines.append("\n[UNTRANSLATED SUMMARY]")
for locale, entries in untranslated_summary.items():
    if entries:
        for entry in entries:
            report_lines.append(f"- {locale}: {entry}")
    else:
        report_lines.append(f"- {locale}: None")

REPORT_FILE.write_text("\n".join(report_lines) if report_lines else "No updates required.", encoding="utf-8")

print(f"Scan complete. Report saved to {REPORT_FILE}")
