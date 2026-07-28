# Contributing to Ionicons

Thank you for your interest in contributing to Ionicons! :tada:

This document outlines the guidelines and processes for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Environment Setup](#environment-setup)
- [Development Workflow](#development-workflow)
  * [Branch Strategy](#branch-strategy)
  * [Component Modifications](#component-modifications)
  * [Testing](#testing)
  * [Code Style](#code-style)
  * [Building](#building)
- [Submitting Issues](#submitting-issues)
- [Submitting Pull Requests](#submitting-pull-requests)

## Code of Conduct

Please read our [Contributor Code of Conduct](./CODE_OF_CONDUCT.md) for information on our rules of conduct. By contributing to Ionicons, you agree to abide by its terms.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git

### Environment Setup

1. We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage Node.js versions:
   - For macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
   - For Windows: Use [nvm-windows](https://github.com/coreybutler/nvm-windows)
   - Install and use the LTS version: `nvm install --lts && nvm use --lts`

   Alternatively, you can [download the installer](https://nodejs.org/) for the LTS version of Node.js directly.

2. Fork the repository on GitHub
3. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/ionicons.git
   cd ionicons
   ```
4. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/ionic-team/ionicons.git
   ```
5. Create a new branch from `main` for your change:
   ```bash
   git checkout -b your-feature-branch
   ```
6. Install dependencies:
   ```bash
   npm install
   ```
7. Run the initial build:
   ```bash
   npm run build
   ```
8. If desired, [modify the Icon Component](#component-modifications)
9. Or, modify and preview the site

## Development Workflow

### Branch Strategy

- Always create a new branch from `main` for your changes:
  ```bash
  git checkout main
  git pull upstream main
  git checkout -b your-feature-branch
  ```

### Component Modifications

If you're modifying the `ion-icon` component:

1. Navigate to `src/components/` directory and open the `icon` component to modify
2. Make your changes to the component code
3. Test your changes locally with `npm start`
4. Run the full test suite: `npm run test.spec` for unit tests and `npm run test.e2e` for E2E tests
5. All PRs that change component behavior must include tests covering the changes

### Testing

Tests are crucial for maintaining confidence in changes. All PRs that modify component behavior must include tests covering those changes.

#### Local Development & Previewing

To preview component changes during development:

```bash
npm start
```

This starts the dev server with live-reloading. The test landing page displays all available test pages.

Test pages are organized in `src/components/icon/test/` with individual folders for each test scenario.

#### Unit Tests

Run Jest tests for component logic:

```bash
npm run test.spec
```

#### E2E Tests

Run Playwright tests to generate visual regression snapshots and verify component behavior:

```bash
npm run test.e2e
```

View the HTML report after tests complete:

```bash
npx playwright show-report
```

> [!IMPORTANT]
> All E2E test navigation URLs must include a trailing slash (e.g., `/icon/test/basic/` not `/icon/test/basic`). The trailing slash ensures proper directory routing, correct timing for script initialization, and consistent page loading across browsers.

##### Updating Snapshots

To update visual regression snapshots with new baselines:

```bash
npm run test.e2e -- --update-snapshots
```

Or for a specific test:

```bash
npm run test.e2e -- src/components/icon/test/basic/icon.e2e.ts --update-snapshots
```

> [!NOTE]
> Updating snapshots locally updates your gitignored screenshot files for local testing. To update the official repository snapshots, run the "Update Reference Screenshots" GitHub action with your development branch selected.

### Code Style

- This project uses Prettier for code formatting
- Run `npm run prettier` to format your code before submitting

### Building

- Run `npm run build` to build the complete package
- Run `npm run build.files` to rebuild only the SVG icon files

## Submitting Issues

Please submit issues for:
- Bug reports
- Feature requests
- General questions about the project

When creating issues:

1. If you have a question about using Ionicons, please ask on the [Ionic Forum](http://forum.ionicframework.com/) or in the [Ionic Discord](https://ionic.link/discord).

2. It is required that you clearly describe the steps necessary to reproduce the issue you are running into. Although we would love to help our users as much as possible, diagnosing issues without clear reproduction steps is extremely time-consuming and simply not sustainable.

3. The issue list of this repository is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.

4. Check if a similar issue already exists by searching through [existing issues](https://github.com/ionic-team/ionicons/issues?utf8=%E2%9C%93&q=is%3Aissue). You can search through existing issues to see if there is a similar one reported. Include closed issues as it may have been closed with a solution.

5. Use the provided issue templates and clearly describe:
   - Expected behavior
   - Actual behavior
   - Steps to reproduce (for bugs)
   - Browser/device information when relevant

6. [Create a new issue](https://github.com/ionic-team/ionicons/issues/new/choose) that thoroughly explains the problem.

## Submitting Pull Requests

1. Before submitting a Pull Request (PR), please:
   - Create an issue first to discuss the proposed changes
   - Comment on an existing issue mentioning you'd like to work on it
   - Look for issues labeled with [`help wanted`](https://github.com/ionic-team/ionicons/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) if you're new to the project

2. Creating the PR:
   - Update your fork to the latest upstream main
   - Make your changes in a new git branch
   - Follow the code style of the project
   - Include relevant tests
   - Make sure all tests pass: `npm test`
   - Update documentation if needed
   - [Create a new pull request](https://github.com/ionic-team/ionicons/compare) with the `main` branch as the base.
