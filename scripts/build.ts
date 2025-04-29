import path from 'node:path';

import fs from 'fs-extra';
import { optimize } from 'svgo';

import { webComponentPassPlugins, sourcePassPlugins } from './plugins';
import { reservedKeywords } from './constants';
import pkgData from '../package.json' with { type: 'json' };
import type { SvgData } from './types';

async function build(rootDir: string) {
  try {
    const srcDir = path.join(rootDir, 'src');
    const srcSvgDir = path.join(srcDir, 'svg');
    const iconDir = path.join(rootDir, 'icons');
    const distDir = path.join(rootDir, 'dist');
    const distIoniconsDir = path.join(distDir, 'ionicons');
    const distSvgDir = path.join(distDir, 'svg');
    const optimizedSvgDir = path.join(distIoniconsDir, 'svg');

    /**
     * Create the directories first, then empty them
     * This ensures they exist before we try to write files to them
     */
    await Promise.all([
      fs.ensureDir(iconDir),
      fs.ensureDir(distDir),
      fs.ensureDir(distSvgDir),
      fs.ensureDir(optimizedSvgDir),
      fs.ensureDir(distIoniconsDir),
    ]);

    /**
     * Empty the directories
     */
    await Promise.all([
      fs.emptyDir(iconDir),
      fs.emptyDir(distDir),
      fs.emptyDir(distSvgDir),
      fs.emptyDir(optimizedSvgDir),
      fs.emptyDir(distIoniconsDir),
    ]);

    const version = pkgData.version as string;
    const srcSvgData = await getSvgs(srcSvgDir, distSvgDir, optimizedSvgDir);
    await optimizeSvgs(srcSvgData);
    await Promise.all([
      createDataJson(version, srcDir, distDir, srcSvgData),
      createIconPackage(version, iconDir, srcSvgData),
    ]);

    const svgSymbolsContent = await createSvgSymbols(version, distDir, srcSvgData);

    await createCheatsheet(version, rootDir, distDir, svgSymbolsContent, srcSvgData);
    await createWebTypes(version, rootDir, distDir, srcSvgData);
    await copyToTesting(rootDir, distDir, srcSvgData);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function optimizeSvgs(srcSvgData: SvgData[]) {
  await Promise.all(
    srcSvgData.map(async (svgData) => {
      return optimizeSvg(svgData);
    }),
  );
}

async function optimizeSvg(svgData: SvgData) {
  const srcSvgContent = await fs.readFile(svgData.srcFilePath, 'utf8');

  const optimizedSvg = await optimize(srcSvgContent, { path: svgData.srcFilePath });
  const webComponentSvg = await optimize(optimizedSvg.data, {
    path: svgData.srcFilePath,
    plugins: webComponentPassPlugins,
  });
  const sourceSvg = await optimize(optimizedSvg.data, {
    path: svgData.srcFilePath,
    plugins: sourcePassPlugins,
  });

  // Ensure directories exist before writing files
  await Promise.all([
    fs.ensureDir(path.dirname(svgData.optimizedFilePath)),
    fs.ensureDir(path.dirname(svgData.distSvgFilePath)),
  ]);

  svgData.optimizedSvgContent = webComponentSvg.data;
  await Promise.all([
    fs.writeFile(svgData.optimizedFilePath, svgData.optimizedSvgContent),
    fs.writeFile(svgData.distSvgFilePath, sourceSvg.data),
  ]);
}

async function copyToTesting(rootDir: string, distDir: string, srcSvgData: SvgData[]) {
  const testDir = path.join(rootDir, 'www');
  const testBuildDir = path.join(testDir, 'build');
  const testSvgDir = path.join(testBuildDir, 'svg');

  // Ensure all directories exist
  await Promise.all([
    fs.ensureDir(testDir),
    fs.ensureDir(testBuildDir),
    fs.ensureDir(testSvgDir)
  ]);

  await Promise.all(
    srcSvgData
      .filter((svgData): svgData is SvgData & { optimizedSvgContent: string } => Boolean(svgData.optimizedSvgContent))
      .map(async (svgData) => {
        const testSvgFilePath = path.join(testSvgDir, svgData.fileName);
        await fs.writeFile(testSvgFilePath, svgData.optimizedSvgContent);
      }),
  );

  const distCheatsheetFilePath = path.join(distDir, 'cheatsheet.html');
  const testCheatsheetFilePath = path.join(testDir, 'cheatsheet.html');
  await fs.copyFile(distCheatsheetFilePath, testCheatsheetFilePath);
}

async function createSvgSymbols(version: string, distDir: string, srcSvgData: SvgData[]) {
  srcSvgData = srcSvgData.sort((a, b) => {
    if (a.iconName < b.iconName) return -1;
    if (a.iconName > b.iconName) return 1;
    return 0;
  });

  const symbolsSvgFilePath = path.join(distDir, 'ionicons.symbols.svg');

  const lines = [
    `<svg data-ionicons="${version}" style="display:none">`,
    `<style>`,
    `.ionicon {`,
    `  fill: currentColor;`,
    `  stroke: currentColor;`,
    `}`,
    `.ionicon-fill-none {`,
    `  fill: none;`,
    `}`,
    `.ionicon-stroke-width {`,
    `  stroke-width: 32px;`,
    `}`,
    `</style>`,
  ];

  srcSvgData
    .filter((svgData): svgData is SvgData & { optimizedSvgContent: string } => Boolean(svgData.optimizedSvgContent))
    .forEach((svgData) => {
      const svg = svgData.optimizedSvgContent
        .replace(`<svg xmlns="http://www.w3.org/2000/svg"`, `<symbol id="${svgData.iconName}"`)
        .replace(`</svg>`, `</symbol>`);
      lines.push(svg);
    });

  lines.push(`</svg>`, ``);

  const content = lines.join('\n');
  await fs.writeFile(symbolsSvgFilePath, content);
  return content;
}

async function createCheatsheet(
  version: string,
  rootDir: string,
  distDir: string,
  svgSymbolsContent: string,
  srcSvgData: SvgData[],
) {
  const CheatsheetTmpFilePath = path.join(rootDir, 'scripts', 'cheatsheet-template.html');
  const distCheatsheetFilePath = path.join(distDir, 'cheatsheet.html');

  const c = srcSvgData.map(
    (svgData) =>
      `<a href="./svg/${svgData.fileName}"><svg><use href="#${svgData.iconName}" xlink:href="#${svgData.iconName}"/></svg></a>`,
  );

  c.push(svgSymbolsContent);

  const html = (await fs.readFile(CheatsheetTmpFilePath, 'utf8'))
    .replace(/{{version}}/g, version)
    .replace(/{{count}}/g, srcSvgData.length.toString())
    .replace(/{{content}}/g, c.join('\n'));

  await fs.writeFile(distCheatsheetFilePath, html);
}

async function createWebTypes(version: string, rootDir: string, distDir: string, srcSvgData: SvgData[]) {
  const srcWebTypeFilePath = path.join(rootDir, 'src/ionicons.web-types.json');
  const distWebTypesFilePath = path.join(distDir, 'ionicons.web-types.json');
  const webTypes = JSON.parse(await fs.readFile(srcWebTypeFilePath, 'utf8'));

  webTypes.version = version;

  const icons = webTypes.contributions.html.ionicons;
  for (let data of srcSvgData) {
    icons.push({
      name: data.iconName,
      icon: 'dist/svg/' + data.fileName,
    });
  }

  const jsonStr = JSON.stringify(webTypes, null, 2) + '\n';
  await fs.writeFile(distWebTypesFilePath, jsonStr);
}

async function getSvgs(srcSvgDir: string, distSvgDir: string, optimizedSvgDir: string): Promise<SvgData[]> {
  const svgFiles = (await fs.readdir(srcSvgDir)).filter((fileName) => {
    return !fileName.startsWith('.') && fileName.endsWith('.svg');
  });

  const svgData = await Promise.all(
    svgFiles.map(async (fileName) => {
      // fileName: airplane-outline.svg

      if (fileName.toLowerCase() !== fileName) {
        throw new Error(`svg filename "${fileName}" must be all lowercase`);
      }

      // srcFilePath: /src/svg/airplane-outline.svg
      const srcFilePath = path.join(srcSvgDir, fileName);

      // srcFilePath: /src/svg/airplane-outline.svg
      const distSvgFilePath = path.join(distSvgDir, fileName);

      // optimizedFilePath: /dist/ionicons/svg/airplane-outline.svg
      const optimizedFilePath = path.join(optimizedSvgDir, fileName);

      const dotSplit = fileName.split('.');
      if (dotSplit.length > 2) {
        throw new Error(`svg filename "${fileName}" cannot contain more than one period`);
      }

      // iconName: airplane-outline
      const iconName = dotSplit[0];

      if (reservedKeywords.has(iconName)) {
        throw new Error(`svg icon name "${iconName}" is a reserved JavaScript keyword`);
      }

      // fileNameMjs: airplane-outline.mjs
      const fileNameMjs = iconName + '.mjs';

      // fileNameCjs: airplane-outline.mjs
      const fileNameCjs = iconName + '.js';

      // exportName: airplaneOutline
      const exportName = camelize(iconName);

      const title = toTitleCase(
        fileName.replace('.svg', '').replace('-outline', '').replace('-sharp', '').replace(/-/g, ' '),
      );

      return {
        fileName,
        title,
        srcFilePath,
        distSvgFilePath,
        srcSvgContent: await fs.readFile(srcFilePath, 'utf8'),
        optimizedFilePath,
        iconName,
        fileNameMjs,
        fileNameCjs,
        exportName,
      };
    }),
  );

  return svgData.sort((a, b) => {
    if (a.exportName < b.exportName) return -1;
    if (a.exportName > b.exportName) return 1;
    return 0;
  });
}

async function createIconPackage(version: string, iconDir: string, srcSvgData: SvgData[]) {
  await Promise.all([
    createEsmIcons(version, iconDir, srcSvgData),
    createCjsIcons(version, iconDir, srcSvgData),
    createDtsIcons(version, iconDir, srcSvgData),
  ]);
}

async function createEsmIcons(version: string, iconDir: string, srcSvgData: SvgData[]) {
  const iconEsmFilePath = path.join(iconDir, 'index.mjs');

  const o = [`/* Ionicons v${version}, ES Modules */`, ``];

  srcSvgData.forEach((svgData) => {
    o.push(`export const ${svgData.exportName} = ${getDataUrl(svgData)}`);
  });

  await fs.writeFile(iconEsmFilePath, o.join('\n') + '\n');
}

async function createCjsIcons(version: string, iconDir: string, srcSvgData: SvgData[]) {
  const iconCjsFilePath = path.join(iconDir, 'index.js');

  const o = [`/* Ionicons v${version}, CommonJS */`, ``];

  srcSvgData.forEach((svgData) => {
    o.push(`exports.${svgData.exportName} = ${getDataUrl(svgData)}`);
  });

  await fs.writeFile(iconCjsFilePath, o.join('\n') + '\n');
}

async function createDtsIcons(version: string, iconDir: string, srcSvgData: SvgData[]) {
  const iconDtsFilePath = path.join(iconDir, 'index.d.ts');

  const o = [`/* Ionicons v${version}, Types */`, ``];

  srcSvgData.forEach((svgData) => {
    o.push(`export declare var ${svgData.exportName}: string;`);
  });

  await fs.writeFile(iconDtsFilePath, o.join('\n') + '\n');
}

function getDataUrl(svgData: SvgData) {
  let svg = svgData.optimizedSvgContent;

  if (!svg) {
    throw new Error(`oh no! no optimized SVG content! ${svgData.fileName}`);
  }

  if (svg.includes(`'`)) {
    throw new Error(`oh no! no single quotes allowed! ${svgData.fileName}`);
  }
  if (svg.includes(`\n`) || svg.includes(`\r`)) {
    throw new Error(`oh no! no new lines allowed! ${svgData.fileName}`);
  }
  svg = svg.replace(/"/g, "'");
  return `"data:image/svg+xml;utf8,${svg}"`;
}

async function createDataJson(version: string, srcDir: string, distDir: string, srcSvgData: SvgData[]) {
  const srcDataJsonPath = path.join(srcDir, 'data.json');
  const distDataJsonPath = path.join(distDir, 'ionicons.json');

  const data = await fs.readJson(srcDataJsonPath).catch(() => ({}));
  data.icons = data.icons || [];

  // add new icons
  srcSvgData.forEach((svgData) => {
    if (!data.icons.some((i) => i.name === svgData.iconName)) {
      data.icons.push({
        name: svgData.iconName,
      });
    }
  });

  // remove dead icons
  data.icons = data.icons.filter((dataIcon) => {
    return srcSvgData.some((svgData) => dataIcon.name === svgData.iconName);
  });

  // sort
  data.icons = data.icons.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  data.icons.forEach((icon) => {
    icon.tags = icon.tags || icon.name.split('-');
    icon.tags = icon.tags.sort();
  });

  const srcJsonStr = JSON.stringify(data, null, 2) + '\n';
  await fs.writeFile(srcDataJsonPath, srcJsonStr);

  const distJsonData = {
    name: 'ionicons',
    version,
    icons: data.icons,
  };
  const distJsonStr = JSON.stringify(distJsonData, null, 2) + '\n';
  await fs.writeFile(distDataJsonPath, distJsonStr);
}

function camelize(text: string) {
  let words = text.split(/[-_]/g); // ok one simple regexp.
  return words[0].toLowerCase() + words.slice(1).map(upFirst).join('');
}

function upFirst(word: string) {
  return word[0].toUpperCase() + word.toLowerCase().slice(1);
}

function toTitleCase(str: string) {
  const s = str.trim().toLowerCase().split(' ');
  for (var i = 0; i < s.length; i++) {
    s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1);
  }
  return s.join(' ');
}

// let's do this
build(path.join(__dirname, '..'));
