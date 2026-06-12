# Distribution

This page explains how the compiler/interpreter package can be distributed so
students and teachers can install it with one command.

## Recommended Install Command

The public install command documented across Sticks Lite is:

```sh
npm install -g sticks-lite
```

After installation:

```sh
sticks main.slite
```

Local project usage:

```sh
npm install --save-dev sticks-lite
npx sticks main.slite
```

## Package Name

The compiler/interpreter repository is configured as:

```txt
sticks-lite
```

The executable name is:

```txt
sticks
```

That mapping is controlled by the `bin` field in the package manifest.

```json
{
  "bin": {
    "sticks": "./dist/cli/main.js"
  }
}
```

## Publishing To npm

From the compiler/interpreter repository:

```sh
npm install
npm run check
npm login
npm whoami
npm publish
```

The package should be built before publishing. The package manifest uses a
`prepublishOnly` script so `npm publish` runs the build automatically.

The package is documented as the unscoped npm package `sticks-lite`. Publishing
as `@brisqdev/sticks-lite` requires ownership of, or publish access to, the
`@brisqdev` npm scope.

## npm Authentication Requirements

npm requires package publishing to use either two-factor authentication on the
account or a granular access token created with bypass 2FA enabled.

For an interactive publish with a one-time password:

```sh
npm publish --otp=123456
```

Replace `123456` with the current code from your authenticator app. If your
account uses a security key flow, follow the prompt npm shows during publish.

For automated publishing, create a granular access token with publish access and
bypass 2FA enabled, then use that token in your CI environment as `NPM_TOKEN`.

## Versioning

Sticks Lite currently documents language version `v1.0`. Patch releases should
fix bugs without changing language behavior. Minor releases may add new built-in
functions or docs. Major releases may change language semantics and should be
coordinated with teachers before classroom rollout.

## Release Checklist

- Run the full test suite.
- Run sample programs with the `sticks` command.
- Confirm the README install command is correct.
- Confirm docs mention the same version.
- Confirm license text is included.
- Publish from a clean working tree.
- Install the published package in a temporary directory and run `sticks`.

## Classroom Deployment

Teachers should install and verify the tool before students use it. Sticks Lite
is intended for supervised educational use. It is not a security sandbox and
should not be used for unsupervised execution of untrusted code.
