---
title: Versioning
description: Package and documentation version behavior.
---

# Versioning

<VersionBadge />

The `sticks-lite` package version is stored in package metadata. The CLI reads
that metadata for `sticks --version`.

## Docs Version Source

The docs site reads its displayed package version from `docs/package.json`
through `src/version.ts`. The parent release check verifies that the docs
package version matches the language package version.

## What the Version Means

The package version covers the published interpreter, CLI, public TypeScript
API, and README. The docs should describe the same behavior as the current
package metadata in this workspace.

## Avoid Hard-Coded Version Text

When docs need to display the current package version, use the metadata-backed
version helper instead of typing a release number into prose. This keeps the
website aligned with the package during release updates.
