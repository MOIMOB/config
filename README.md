# MOIMOB config

Shared tooling config for MOIMOB apps and websites.

| Package                                               |                 |
| ----------------------------------------------------- | --------------- |
| [`@moimob/prettier-config`](packages/prettier-config) | Prettier config |

`renovate/default.json` is the shared Renovate preset. Each app's `renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>MOIMOB/config//renovate/default"]
}
```

It groups every minor/patch update into one weekly PR (Monday morning, Stockholm), Angular and Capacitor majors per family, GitHub Actions majors in one PR, waits 3 days after a release, refreshes lock files monthly, and leaves `mise.toml` majors (Node LTS, Java, Ruby) to be bumped by hand in all apps together.

`templates/` holds files every repo copies as-is: `.editorconfig`, `.gitattributes`, `.prettierignore` (base; add app-specific paths).

## Releasing

Bump `version` in the package's `package.json`, merge, then create a GitHub release with tag `<package>-v<version>` (e.g. `prettier-config-v1.0.1`). The `publish` workflow publishes it to npm via trusted publishing (OIDC, no token).
