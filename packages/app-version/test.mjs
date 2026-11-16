// CI check: sync and check against a throwaway Capacitor and Cordova app.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const bin = join(import.meta.dirname, 'bin.mjs');
const run = (cwd, ...args) => execFileSync(process.execPath, [bin, ...args], { cwd, stdio: 'pipe' }).toString();
const fails = (cwd, ...args) => assert.throws(() => run(cwd, ...args));

function app(files) {
  const dir = mkdtempSync(join(tmpdir(), 'app-version-'));
  for (const [file, text] of Object.entries(files)) {
    mkdirSync(join(dir, file, '..'), { recursive: true });
    writeFileSync(join(dir, file), text);
  }
  return dir;
}

// Capacitor
const cap = app({
  'package.json': '{ "version": "2.6.7" }',
  'android/app/build.gradle': 'versionCode 1\n        versionName "1.0.0"\n',
  'fastlane/metadata/android/en-US/changelogs/.keep': '',
});
fails(cap, 'check');
run(cap, 'sync');
assert.match(readFileSync(join(cap, 'android/app/build.gradle'), 'utf8'), /versionCode 206007\n\s+versionName "2.6.7"/);
fails(cap, 'check'); // the new changelog is empty
writeFileSync(join(cap, 'fastlane/metadata/android/en-US/changelogs/206007.txt'), 'Fixes');
run(cap, 'check');
run(cap, 'check', '--tag', 'v2.6.7');
fails(cap, 'check', '--tag', '2.6.8');
writeFileSync(join(cap, 'fastlane/metadata/android/en-US/changelogs/206007.txt'), 'x'.repeat(501));
fails(cap, 'check');

// Cordova
const cordova = app({
  'package.json': '{ "version": "3.70.0" }',
  'config.xml': '<widget id="a" version="3.69.2">\n</widget>',
});
run(cordova, 'sync');
assert.match(readFileSync(join(cordova, 'config.xml'), 'utf8'), /version="3.70.0" android-versionCode="370000"/);
run(cordova, 'check');

fails(app({ 'package.json': '{ "version": "1.0.0-beta.1" }' }), 'check');
console.log('app-version OK');
