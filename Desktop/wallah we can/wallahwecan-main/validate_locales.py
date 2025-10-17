import json
from pathlib import Path

locales = ["fr", "ar"]
base_path = Path("messages/en.json")
base_catalog = json.loads(base_path.read_text(encoding="utf-8"))

base_keys = set(base_catalog.keys())

for locale in locales:
    locale_path = Path(f"messages/{locale}.json")
    locale_catalog = json.loads(locale_path.read_text(encoding="utf-8"))

    missing = base_keys - set(locale_catalog.keys())

    if missing:
        print(f"[{locale}] Missing keys ({len(missing)}): {sorted(missing)}")
        for key in missing:
            locale_catalog[key] = base_catalog[key]
        locale_path.write_text(
            json.dumps(locale_catalog, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print(f"[{locale}] Filled missing keys from en.json")
    else:
        print(f"[{locale}] All keys present.")
