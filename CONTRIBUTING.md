# Contributing

Thanks for your interest in contributing to `react-animated-waves`! This guide will help you get started with the development process, from setting up your environment to submitting changes.

## Table of Contents

- [Getting Help](#getting-help)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing & Code Quality](#testing--code-quality)
- [Documentation](#documentation)
- [Release Process](#release-process)
- [Dependencies](#dependencies)
- [Security](#security)
- [Maintainer Guidelines](#maintainer-guidelines)
- [Recognition](#recognition)

## Getting Help

If you have questions, ideas, or need help:
- Search existing [GitHub Discussions](https://github.com/agrawal-rohit/react-animated-waves/discussions) first
- Open a new discussion for questions and proposals
- Create a [GitHub Issue](https://github.com/agrawal-rohit/react-animated-waves/issues) for bug reports

Please be specific about your environment and include steps to reproduce issues when reporting bugs.

## Development Setup

1. Fork the repository
2. Install dependencies: `pnpm install`
3. Start development (watch): `pnpm dev`
3. Start the local playground: `pnpm playground`
4. Run the test suite: `pnpm test`
5. Build the library: `pnpm build`

## Making Changes

### Branching Strategy

- Create feature branches from `main`
- Use descriptive branch names: `feat/<scope>-description` or `fix/<scope>-description`
- Keep changes focused and atomic

### Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description

Optional longer description

BREAKING CHANGE: details (if applicable)
```

Common types: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`, `chore`

### Pull Requests

- Run tests with coverage: `pnpm cov`
- Include tests for new features and bug fixes
- Reference related issues using GitHub keywords (e.g., `Closes #123`)
- Use a clear title and explain the why behind changes
- Keep PRs focused on a single purpose

## Testing & Code Quality

- Run tests with coverage: `pnpm cov`
- Check linting: `pnpm run lint`
- Format code: `pnpm run format`
- Run type checks: `pnpm run check`

Pre-commit hooks will automatically check your code quality. If they block your commit, run the appropriate fix commands and try again.

## Documentation

- Update `README.md` for public-facing changes
- Document new APIs, CLI commands, and configuration options
- Include examples for complex functionality
- Keep documentation consistent with code changes

Small documentation fixes (typos, clarifications) are always welcome!

## Release Process

### Overview

> [!IMPORTANT]
> - [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) must be configured
> - Ensure that `"Allow GitHub Actions to create and approve pull requests"` is checked in your repository settings *(Settings > Actions > General > Workflow permissions)*

This project uses a simple tag-driven release workflow powered by [npm trusted publishing](https://docs.npmjs.com/trusted-publishers). Majority of the release process is automated using [Github Actions](https://github.com/features/actions) which gets triggered when a new semver tag is pushed. The tag format determines what gets published:

- **Stable releases** (`v1.2.3`) → Published to npm with the `latest` tag
  ```bash
  git checkout main
  git pull origin main
  git tag v1.2.3
  git push origin v1.2.3
  ```
- **Pre-release/Release candidates** (`v1.2.3-rc.1`, `v1.2.3-beta.1`, `v1.2.3-alpha.1`) → Published with the `rc`, `beta`, or `alpha` tags
  ```bash
  git tag v1.2.3-rc.1    # or -beta.1, -alpha.1
  git push origin v1.2.3-rc.1
  ```

When the tag is pushed, the [Github Actions](https://github.com/features/actions) workflow performs the following steps:

1. Installs dependencies and builds the package
2. Publishes to npm with the appropriate tag (`latest`, `rc`, `beta`, or `alpha`)
3. Creates a GitHub Release with a changelog generated from the conventional commits using [git-cliff](https://git-cliff.org/)
4. Opens a pull request with the updated package version back into the `main` branch.

### Testing Pre-releases

After pushing a pre-release tag, you can test it before cutting a stable release:

```bash
npm install my-package@1.2.3-rc.1
```

Found a bug? Fix it on `main` and push a new pre-release tag (e.g., `v1.2.3-rc.2`). Rinse and repeat until it's ready to be rolled out as a stable release.

### Promoting to Stable

Once a pre-release has been tested and you're confident it's ready:

```bash
git tag v1.2.3
git push origin v1.2.3
```

## Dependencies

- Propose new dependencies via GitHub Issues first
- Consider bundle size, maintenance burden, and licensing
- Security updates and critical fixes are always welcome
- Include rationale and testing notes for dependency changes

## Security

- **Do not** report security vulnerabilities in public issues
- Use GitHub's [private vulnerability reporting](https://github.com/agrawal-rohit/react-animated-waves/security/advisories)

## Maintainer Guidelines

Some guidelines for maintainers:

- Changes to `main` should be added through pull requests
- Tag format must adhere to semver standards: `vX.Y.Z` for stable releases and `vX.Y.Z-rc.N`, `-beta.N`, `-alpha.N` for pre-releases
- Keep required checks and branch protection enabled on `main` branch
- Avoid modifying config files in the repository without discussion:
  - Configuration files (`cliff.toml`, `biome.json`, etc.)
  - CI workflows (`.github/workflows/*`)
  - Release tooling

If changes to these areas are needed, open an issue to discuss first.

## Recognition

Contributors are recognized through:

- GitHub's contributor graph
- Release notes (generated from commit messages)
- Community acknowledgments

Your contributions are greatly appreciated!
