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

This project uses a simple tag-driven release workflow powered by [npm trusted publishing](https://docs.npmjs.com/trusted-publishers). Push a tag, and [Github Actions](https://github.com/features/actions) handles the rest.

### How It Works

All development happens on `main`. When you're ready to release, just push a semver tag. The tag format determines what gets published:

- **Stable releases** (`v1.2.3`) → Published to npm with the `latest` tag
- **Release candidates** (`v1.2.3-rc.1`) → Published with the `rc` tag  
- **Beta releases** (`v1.2.3-beta.1`) → Published with the `beta` tag
- **Alpha releases** (`v1.2.3-alpha.1`) → Published with the `alpha` tag

### Creating a Release

Ensure `main` is ready, then push a tag:

**For a stable release:**
```bash
git checkout main
git pull origin main
git tag v1.2.3
git push origin v1.2.3
```

**For a pre-release (RC, beta, or alpha):**
```bash
git tag v1.2.3-rc.1    # or -beta.1, -alpha.1
git push origin v1.2.3-rc.1
```

### What Happens Automatically

When you push a tag, the release workflow kicks in and:

1. Installs dependencies and builds the package
2. Publishes to npm with the appropriate tag (`latest`, `rc`, `beta`, or `alpha`)
3. Creates a GitHub Release with a changelog generated from the conventional commits using [git-cliff](https://git-cliff.org/)
4. Opens a pull request with the updated package version back into the `main` branch.

### Things to Remember

- Keep `package.json` version at `0.0.0` in the repo — never bump it manually
- Don't commit version changes — CI handles that during release
- Tag format matters: `v1.2.3` for stable, `v1.2.3-rc.1` for pre-releases
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) must be configured on npmjs.com (see repository settings for details)

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

- Use pull requests for all changes to `main`
- Tag format must adhere to semver standards: `vX.Y.Z` for stable releases and `vX.Y.Z-rc.N`, `-beta.N`, `-alpha.N` for pre-releases
- Only push release tags when ready — tags trigger the full release pipeline
- Keep required checks and branch protection enabled on `main` branch
- Avoid modifying automation without discussion:
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
