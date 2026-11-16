# @moimob/app-version

`package.json` `version` is the only version source of a MOIMOB app. This keeps the Android version and the Play
"What's new" files in line with it.

- versionName = the version; versionCode = `major × 100000 + minor × 1000 + patch` (`2.4.0` → `204000`; minor ≤ 99,
  patch ≤ 999), written as literals into `android/app/build.gradle` (Capacitor) or `config.xml` (Cordova).
- One changelog per Play language: `fastlane/metadata/android/<lang>/changelogs/<versionCode>.txt`.

```shell
npm i -D @moimob/app-version
```

```json
"scripts": {
  "version": "moimob-version sync",
  "version:sync": "moimob-version sync",
  "version:check": "moimob-version check"
}
```

With `.npmrc` `git-tag-version=false`, `npm version minor` bumps `package.json` and runs `sync`, which writes the
Android version and creates empty changelogs to fill in.

- `moimob-version sync`: write the version, create missing changelogs.
- `moimob-version check [--tag <tag>]`: fail if a file is out of sync, a changelog is missing, empty or over 500
  characters, or the release tag (with or without `v`) doesn't match. CI runs `npm run version:check`; release
  workflows run `npx moimob-version check --tag "${{ github.event.release.tag_name }}"`.
