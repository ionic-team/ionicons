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

const DST_ICONS_IMPORTS_DIR = path.join(DST_ICONS_DIR, 'imports');


fs.emptyDirSync(DST_ICONS_DIR);
fs.emptyDirSync(DST_ICONS_IMPORTS_DIR);

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
const esmIndex = [
  `/* Ionicons, ES Modules */`, ``
];
const cjsIndex = [
  `/* Ionicons, CommonJS */`, ``
];
const dtsIndex = [
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

    esmIndex.push(`import ${exportCommonName} from './imports/${commonName}.mjs';`);
  }

  commonIconData.modes[mode] = {
    mode,
    modeName,
    modeImportName,
    fileName
  };
});

esmIndex.push(``);


const sortedKeys = Object.keys(moduleData).sort();

sortedKeys.forEach(key => {
  const d = moduleData[key];
  const esmFilePath = path.join(DST_ICONS_IMPORTS_DIR, d.commonName + '.mjs');
  const cjsFilePath = path.join(DST_ICONS_IMPORTS_DIR, d.commonName + '.js');
  const esm = [];
  const cjs = [];

  const modes = Object.keys(d.modes).sort();

  if (modes.length > 1) {
    for (let i = 0; i < modes.length; i++) {
      const mode = modes[i];
      esm.push(`import ${mode} from '../../dist/ionicons/svg/${d.modes[mode].fileName}';`);
    }

    esm.push(``);
    esm.push(`export default /*#__PURE__*/ {`);

    cjs.push(`module.exports = /*#__PURE__*/ {`);

    dtsIndex.push(`export declare var ${d.exportCommonName}: {`);

    for (let i = 0; i < modes.length; i++) {
      const mode = modes[i];
      const suffix = i < modes.length - 1 ? ',' : '';

      esm.push(`  ${mode}: ${mode}${suffix}`);

      cjs.push(`  ${mode}: require('../../dist/ionicons/svg/${d.modes[mode].fileName}')${suffix}`);

      dtsIndex.push(`  ${mode}: string;`);
    }

    esm.push(`};`);
    cjs.push(`};`);
    dtsIndex.push(`};`);

  } else {
    esm.push(`import icon from '../../dist/ionicons/svg/${d.fileName}'`);
    esm.push(``);
    esm.push(`export default /*#__PURE__*/ icon;`);

    cjs.push(`module.exports = /*#__PURE__*/ require('../../dist/ionicons/svg/${d.fileName}');`);

    dtsIndex.push(`export declare var ${d.exportCommonName}: string;`);
  }

  esmIndex.push(`export { ${d.exportCommonName} }`);

  cjsIndex.push(`exports.${d.exportCommonName} = /*#__PURE__*/ require('./imports/${d.commonName}.js');`);

  fs.writeFileSync(esmFilePath, esm.join('\n'));
  fs.writeFileSync(cjsFilePath, cjs.join('\n'));
});

fs.writeFileSync(DST_ICONS_ESM, esmIndex.join('\n') + '\n');
fs.writeFileSync(DST_ICONS_CJS, cjsIndex.join('\n') + '\n');
fs.writeFileSync(DST_ICONS_DTS, dtsIndex.join('\n') + '\n');

fs.writeFileSync(DST_ICONS_PKGJSON, JSON.stringify({
  "name": "ionicons/icons",
  "module": "index.mjs",
  "main": "index.js",
  "typings": "index.d.ts",
  "sideEffects": [
    "imports/"
  ],
  "private": true
}, null, 2));
