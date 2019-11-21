const fs = require('fs-extra');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const SRC_SVG_DIR = path.join(SRC_DIR, 'svg');
const PKG_JSON = path.join(ROOT_DIR, 'package.json');
const SRC_JSON = path.join(SRC_DIR, 'data.json');
const DST_DIR = path.join(ROOT_DIR, 'dist');
const DST_JSON = path.join(DST_DIR, 'ionicons', 'data.json');

const DST_ICONS_DIR = path.join(ROOT_DIR, 'icons');
const DST_ICONS_PKGJSON = path.join(DST_ICONS_DIR, 'package.json');
const DST_ICONS_ESM = path.join(DST_ICONS_DIR, 'index.mjs');
const DST_ICONS_CJS = path.join(DST_ICONS_DIR, 'index.js');
const DST_ICONS_DTS = path.join(DST_ICONS_DIR, 'index.d.ts');


fs.emptyDirSync(DST_ICONS_DIR);

console.log('checking icon data: ' + SRC_JSON);

let srcData = fs.readJsonSync(SRC_JSON);
let svgFiles = fs.readdirSync(SRC_SVG_DIR);
let pkgData = fs.readJsonSync(PKG_JSON);
srcData['version'] = pkgData.version;

svgFiles = svgFiles.filter(f => f.indexOf('.svg') > -1).sort();
svgFiles.forEach(svgFile => {
  let iconName = svgFile.split('.')[0];

  let icon = srcData.icons.find(i => i.icons.indexOf(iconName) > -1);
  if (!icon) {
    console.log('icon data missing for: ' + svgFile);
  }
});

srcData.icons.forEach(i => {
  if (i.tags.length === 0) {
    console.log('icon data missing search tags for: ' + i.icons);
  }

  i.icons.forEach(iconName => {
    let svgFile = iconName + '.svg';

    let f = svgFiles.find(f => f === svgFile);
    if (!f) {
      console.log('icon data contains "' + iconName + '", but the file "' + path.join(SRC_SVG_DIR, svgFile) + '" doesn\'t exist');
    }
  });
});

const jsonContent = JSON.stringify(srcData);
fs.writeFileSync(DST_JSON, jsonContent);


function upFirst(word) {
  return word[0].toUpperCase() + word.toLowerCase().slice(1);
}

function camelize(text) {
  let words = text.split(/[-_]/g); // ok one simple regexp.
  return words[0].toLowerCase() + words.slice(1).map(upFirst).join('');
}


const moduleData = {};
const esm = [
  `/* Ionicons, ES Modules */`, ``
];
const cjs = [
  `/* Ionicons, CommonJS */`, ``
];
const dts = [
  `/* Ionicons, Types */`, ``
];

svgFiles.forEach(fileName => {
  // fileName: ios-add-circle-outline.svg

  // ios-add-circle-outline
  // logo-apple
  const modeName = fileName.split('.')[0];

  // ['ios', 'add', 'circle', 'outline']
  // ['logo', 'apple']
  const modeNameSplit = modeName.split('-');

  // ios, md, logo
  const mode = modeNameSplit[0];

  const isLogo = (mode === 'logo');

  // add-circle-outline
  // logo-apple
  const commonName = isLogo ? modeName : (modeNameSplit.slice(1).join('-'));

  // iosAddCircleOutlineSvg
  // logoAppleSvg
  const modeImportName = camelize(modeName) + 'Svg';

  // addCircleOutline
  // logoApple
  let exportCommonName = camelize(commonName);
  if (exportCommonName === 'switch') {
    exportCommonName = 'switcher';
  }

  let commonIconData = moduleData[exportCommonName];

  if (!commonIconData) {
    commonIconData = {
      fileName,
      exportCommonName,
      commonName,
      modes: {}
    };
    moduleData[exportCommonName] = commonIconData;
  }

  commonIconData.modes[mode] = {
    mode,
    modeName,
    modeImportName,
    fileName
  };
});


const sortedKeys = Object.keys(moduleData).sort();

sortedKeys.forEach(key => {
  const d = moduleData[key];
  const modes = Object.keys(d.modes).sort();

  if (modes.length > 1) {
    esm.push(`export const ${d.exportCommonName} = {`);
    cjs.push(`exports.${d.exportCommonName} = {`);
    dts.push(`export declare var ${d.exportCommonName}: {`);

    for (let i = 0; i < modes.length; i++) {
      const mode = modes[i];
      const suffix = i < modes.length - 1 ? ',' : '';

      const svgContent = getDataUrl(d.modes[mode].fileName);

      esm.push(`  ${mode}: ${svgContent}${suffix}`);
      cjs.push(`  ${mode}: ${svgContent}${suffix}`);

      dts.push(`  ${mode}: string;`);
    }

    esm.push(`};`);
    cjs.push(`};`);
    dts.push(`};`);

  } else {
    const svgContent = getDataUrl(d.fileName);

    esm.push(`export const ${d.exportCommonName} = ${svgContent};`);

    cjs.push(`exports.${d.exportCommonName} = ${svgContent};`);

    dts.push(`export declare var ${d.exportCommonName}: string;`);
  }
});

fs.writeFileSync(DST_ICONS_ESM, esm.join('\n') + '\n');
fs.writeFileSync(DST_ICONS_CJS, cjs.join('\n') + '\n');
fs.writeFileSync(DST_ICONS_DTS, dts.join('\n') + '\n');

fs.writeFileSync(DST_ICONS_PKGJSON, JSON.stringify({
  "name": "ionicons/icons",
  "module": "index.mjs",
  "main": "index.js",
  "typings": "index.d.ts",
  "private": true
}, null, 2));

function getDataUrl(filePath) {
  filePath = path.join(__dirname, '..', 'dist', 'ionicons', 'svg', filePath);
  let svg = fs.readFileSync(filePath, 'utf8');
  if (svg.includes(`'`)) {
    throw new Error(`oh no! no single quotes allowed! ${filePath}`);
  }
  if (svg.includes(`\n`) || svg.includes(`\r`)) {
    throw new Error(`oh no! no new lines allowed! ${filePath}`);
  }
  svg = svg.replace(/"/g, "'");
  return `"data:image/svg+xml;utf8,${svg}"`;
}
