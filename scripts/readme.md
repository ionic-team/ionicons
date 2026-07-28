# Development and Build Scripts

## Updating Icons

The `src/svg` directory is the single source of truth for svgs. They should not already be optimized and can be the original svg export straight out of an svg editor. A build step before releasing will optimize the source svgs (remove comments, reduce the size, etc) and ensure they'll work within `ion-icon`.

## Build Locally

After an svg has been updated, added or deleted from the `src/svg` directory, run:

```sh
npm run build
```

The build command will optimize all of the icons and generate the files to be distributed. After the build command, all of the optimized svgs are saved in `dist/ionicons/svg`. Additionally the `dist` directory contains the distribution files for the `ion-icon` web component.

## Svg Symbols Cheatsheet

After a build, a new `www/cheatsheet.html` file will be created. This version uses svg symbols rather than `ion-icon`.

## ion-icon Component Preview

To see the `ion-icon` component in action, run:

```sh
npm start
```

## Release Steps

Releases are automated via GitHub Actions. To trigger a release:

1. Go to the [Release Orchestrator](https://github.com/ionic-team/ionicons/actions/workflows/release-orchestrator.yml) workflow
2. Click "Run workflow"
3. Select the release type:
   - **dev** — Creates a pre-release with a timestamp-based version (e.g., `8.0.14-dev.11784821417.1c794397`)
   - **production** — Creates a semver release; select `patch`, `minor`, or `major`
4. The workflow will build, publish to NPM, and create a GitHub release (for production releases)
