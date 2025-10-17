#!/usr/bin/env node
// Simple i18n audit: compares messages/fr.json (canonical) with en/ar mirrors
// Also scans code for useTranslations/getTranslations usage to detect used-but-missing keys

import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const messagesDir = path.join(root, 'messages');
const locales = ['fr', 'en', 'ar'];

function readJSON(f) {
  try {
    return JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch (e) {
    console.error(`JSON parse error in ${f}:`, e.message);
    process.exitCode = 1;
    return {};
  }
}

function flatten(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

function _unflattenKeys(keys) {
  // just utility if ever needed; not used right now
  const root = {};
  for (const key of keys) {
    const parts = key.split('.');
    let cur = root;
    parts.forEach((p, i) => {
      if (i === parts.length - 1) cur[p] = '';
      else cur = cur[p] = cur[p] || {};
    });
  }
  return root;
}

// Load locale files
const files = Object.fromEntries(
  locales.map((l) => [l, path.join(messagesDir, `${l}.json`)]),
);
const data = Object.fromEntries(
  Object.entries(files).map(([l, f]) => [l, readJSON(f)]),
);

const flat = Object.fromEntries(
  Object.entries(data).map(([l, obj]) => [l, flatten(obj)]),
);

const canonical = flat.fr;
const missingByLocale = { en: [], ar: [] };
for (const key of Object.keys(canonical)) {
  for (const l of ['en', 'ar']) {
    if (!(key in flat[l])) missingByLocale[l].push(key);
  }
}

// Find extra keys that are in mirrors but not in canonical (possible duplicates/mis-nesting)
const extraByLocale = { en: [], ar: [] };
for (const l of ['en', 'ar']) {
  for (const key of Object.keys(flat[l])) {
    if (!(key in canonical)) extraByLocale[l].push(key);
  }
}

// Scan code for translation key usage (basic heuristic)
const codeGlobs = ['app', 'components', 'lib', 'hooks', 'contexts'];
const codeFiles = [];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx|ts|js|jsx)$/.test(entry.name)) codeFiles.push(p);
  }
}
codeGlobs.forEach((d) => walk(path.join(root, d)));

// Build a map of local t variables to their namespaces per file
const usedKeys = new Set();
function isLikelyKey(k) {
  // Filter out paths, urls, sql, etc. Allow dot-separated tokens
  return /^[A-Za-z0-9_.-]+$/.test(k) && !k.includes('..') && !k.startsWith('.') && !k.includes('/');
}

for (const file of codeFiles) {
  const src = fs.readFileSync(file, 'utf8');
  const tVarToNs = new Map();
  let m;
  // const t = useTranslations('Namespace')
  const useTRegex = /(?:const|let|var)\s+(\w+)\s*=\s*useTranslations\(\s*['"]([^'"\)]+)['"]\s*\)/g;
  while ((m = useTRegex.exec(src))) {
    tVarToNs.set(m[1], m[2]);
  }
  // const t = await getTranslations('Namespace') or without await
  const getTRegex = /(?:const|let|var)\s+(\w+)\s*=\s*(?:await\s*)?getTranslations\(\s*['"]([^'"\)]+)['"]\s*\)/g;
  while ((m = getTRegex.exec(src))) {
    tVarToNs.set(m[1], m[2]);
  }
  // t('key') occurrences tied to known t variables
  for (const [tVar, ns] of tVarToNs.entries()) {
    const callRegex = new RegExp(tVar + "\\(\\s*['\"]([^'\"]+)['\"]", 'g');
    while ((m = callRegex.exec(src))) {
      const k = m[1];
      if (!isLikelyKey(k)) continue;
      usedKeys.add(`${ns}.${k}`);
    }
  }
  // Also capture any direct t('Namespace.key') literals (rare but possible)
  // Only capture direct calls when a namespace is included (has a dot)
  const directTRegex = /\bt\(\s*['"]([A-Za-z0-9_.-]+\.[A-Za-z0-9_.-]+)['"]\s*\)/g;
  while ((m = directTRegex.exec(src))) {
    const k = m[1];
    if (!isLikelyKey(k)) continue;
    usedKeys.add(k);
  }
}

// Report used-but-missing per locale
const usedMissing = { fr: [], en: [], ar: [] };
for (const key of usedKeys) {
  for (const l of locales) {
    if (!(key in flat[l])) usedMissing[l].push(key);
  }
}

function print(title, items) {
  console.log(`\n=== ${title} (${items.length}) ===`);
  items.slice().sort().forEach((k) => console.log(k));
}

print('Missing in EN vs FR canonical', missingByLocale.en);
print('Missing in AR vs FR canonical', missingByLocale.ar);
print('Extra in EN not in FR', extraByLocale.en);
print('Extra in AR not in FR', extraByLocale.ar);
print('Used but missing in FR', usedMissing.fr);
print('Used but missing in EN', usedMissing.en);
print('Used but missing in AR', usedMissing.ar);

// Exit non-zero if any used-missing
const totalMissing = usedMissing.fr.length + usedMissing.en.length + usedMissing.ar.length;
if (totalMissing > 0) {
  process.exitCode = 2;
}
