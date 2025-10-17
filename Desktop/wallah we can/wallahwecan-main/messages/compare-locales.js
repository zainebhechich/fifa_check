import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const localesDir = path.dirname(fileURLToPath(import.meta.url));
const _files = ['fr.json', 'en.json', 'ar.json'];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8'));
}

function flatten(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = true;
    }
  }
  return out;
}

function typeOf(val) {
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return typeof val; // 'object' | 'string' | 'number' | 'boolean' | 'undefined' | 'function' (unlikely)
}

function collectTypes(obj, prefix = '', map = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const t = typeOf(v);
    map[key] = t;
    if (t === 'object') {
      collectTypes(v, key, map);
    }
  }
  return map;
}

function diffKeys(baseKeys, cmpKeys) {
  const missing = [];
  for (const k of Object.keys(baseKeys)) {
    if (!(k in cmpKeys)) missing.push(k);
  }
  return missing;
}

function extraKeys(baseKeys, cmpKeys) {
  const extras = [];
  for (const k of Object.keys(cmpKeys)) {
    if (!(k in baseKeys)) extras.push(k);
  }
  return extras;
}

function typeMismatches(baseTypes, cmpTypes) {
  const mismatches = [];
  for (const k of Object.keys(baseTypes)) {
    if (k in cmpTypes) {
      const bt = baseTypes[k];
      const ct = cmpTypes[k];
      if (bt !== ct) mismatches.push({ key: k, fr: bt, other: ct });
    }
  }
  return mismatches;
}

function main() {
  const fr = readJson('fr.json');
  const en = readJson('en.json');
  const ar = readJson('ar.json');

  const frKeys = flatten(fr);
  const enKeys = flatten(en);
  const arKeys = flatten(ar);

  const frTypes = collectTypes(fr);
  const enTypes = collectTypes(en);
  const arTypes = collectTypes(ar);

  const enMissing = diffKeys(frKeys, enKeys);
  const arMissing = diffKeys(frKeys, arKeys);

  const enExtra = extraKeys(frKeys, enKeys);
  const arExtra = extraKeys(frKeys, arKeys);

  const enTypeDiffs = typeMismatches(frTypes, enTypes);
  const arTypeDiffs = typeMismatches(frTypes, arTypes);

  const report = {
    summary: {
      frCount: Object.keys(frKeys).length,
      enCount: Object.keys(enKeys).length,
      arCount: Object.keys(arKeys).length,
      enMissingCount: enMissing.length,
      arMissingCount: arMissing.length,
      enExtraCount: enExtra.length,
      arExtraCount: arExtra.length,
      enTypeMismatches: enTypeDiffs.length,
      arTypeMismatches: arTypeDiffs.length
    },
    enMissing,
    arMissing,
    enExtra,
    arExtra,
    enTypeMismatches: enTypeDiffs,
    arTypeMismatches: arTypeDiffs
  };

  console.log(JSON.stringify(report, null, 2));
}

main();
