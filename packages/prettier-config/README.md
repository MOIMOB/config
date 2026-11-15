# @moimob/prettier-config

Shared Prettier config: `printWidth: 120`, `singleQuote: true`, everything else Prettier defaults (2-space indent, LF, trailing commas).

```sh
npm i -D prettier @moimob/prettier-config
```

`package.json`:

```json
{ "prettier": "@moimob/prettier-config" }
```

Angular projects (formats `*.html` with the Angular parser):

```json
{ "prettier": "@moimob/prettier-config/angular" }
```

Need extra options or plugins? Use `prettier.config.mjs`:

```js
import base from '@moimob/prettier-config';

export default { ...base, plugins: ['prettier-plugin-organize-attributes'] };
```

Copy these into each repo too (a package can't ship them): `.editorconfig`, `.gitattributes`, `.prettierignore` (see the repo's `templates/`).
