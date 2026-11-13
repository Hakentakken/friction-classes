import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// Ownership proofs are plain-text HTML files, not marketing pages. Validate
// their required contents before excluding them from page metadata checks.
export function isVerificationFile(root, file) {
  if (!/^google[a-f0-9]+\.html$/.test(file)) return false;
  assert.equal(fs.readFileSync(path.join(root, file), 'utf8').trim(),
    `google-site-verification: ${file}`, `${file}: valid Google verification proof`);
  return true;
}
