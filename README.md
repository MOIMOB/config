# MOIMOB config

Shared tooling config for MOIMOB apps and websites.

| Package                                               |                 |
| ----------------------------------------------------- | --------------- |
| [`@moimob/prettier-config`](packages/prettier-config) | Prettier config |

`templates/` holds files every repo copies as-is: `.editorconfig`, `.gitattributes`, `.prettierignore` (base; add app-specific paths).

## Releasing

Bump `version` in the package's `package.json`, merge, then create a GitHub release with tag `<package>-v<version>` (e.g. `prettier-config-v1.0.1`). The `publish` workflow publishes it to npm via trusted publishing (OIDC, no token).
