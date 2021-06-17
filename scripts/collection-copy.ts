import fs from 'fs-extra';
import { join } from 'path';

async function collectionCopy(rootDir: string) {
  // move optimized svgs to correct collection location
  const optimizedSrc = join(rootDir, 'dist', 'ionicons', 'svg');
  const collectionDest = join(rootDir, 'dist', 'collection', 'components', 'icon', 'svg');
  await fs.copy(optimizedSrc, collectionDest);

  // we don't to copy the src svgs to collection
  await fs.remove(join(rootDir, 'dist', 'collection', 'svg'));

  const cePackageDir = join(rootDir, 'components');
  const cePackageJsonPath = join(cePackageDir, 'package.json');
  const ceCjsPath = join(cePackageDir, 'index.cjs.js');

  const emptyCjs = `/*empty cjs*/`;
  await fs.writeFile(ceCjsPath, emptyCjs);

  const cePackageJson = {
    name: 'ionicons/components',
    description: 'Ionicons custom element.',
    main: './index.cjs.js',
    module: './index.js',
    types: './index.d.ts',
    private: true,
  };
  await fs.writeFile(cePackageJsonPath, JSON.stringify(cePackageJson, null, 2));
  
  /**
   * TODO: Remove this in Ionicons v6.0
   * Stencil 2 removed the legacy loader,
   * but that is what Ionicons users were using
   * to load Ionicons from a CDN. The lines
   * below will add in a legacy loader for users
   * to use so there is no breaking change in usage.
   */
  const installLoaderSrc = join(rootDir, 'scripts', 'install-loader.js');
  const installLoaderDest = join(rootDir, 'dist', 'ionicons.js');
  await fs.copyFile(installLoaderSrc, installLoaderDest)

  // this is temporary!!!!
  // removing the `type` from the d.ts export
  // to make it easier for users migrating between
  // of older versions of angular and typescript
  // to the newer verisons, where the `type` keyword
  // is used. This is a megahack, no doubt.
  const typesDist = join(rootDir, 'dist', 'types', 'index.d.ts');
  let types = await fs.readFile(typesDist, 'utf8');
  types = types.replace('export type', 'export');
  await fs.writeFile(typesDist, types);
}

collectionCopy(join(__dirname, '..'));
