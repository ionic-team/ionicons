const fs = require('fs-extra');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const SRC_SVG_DIR = path.join(SRC_DIR, 'svg');
const PKG_JSON = path.join(ROOT_DIR, 'package.json');
const SRC_JSON = path.join(SRC_DIR, 'data.json');
const DST_DIR = path.join(ROOT_DIR, 'dist');
const DST_JSON = path.join(DST_DIR, 'ionicons', 'data.json');
const DST_ESM = path.join(DST_DIR, 'ionicons', 'svg', 'index.mjs');
const DST_CJS = path.join(DST_DIR, 'ionicons', 'svg', 'index.js');
const DST_DTS = path.join(DST_DIR, 'ionicons', 'svg', 'index.d.ts');


console.log('checking icon data: ' + SRC_JSON);

let srcData = fs.readJsonSync(SRC_JSON);
let svgFiles = fs.readdirSync(SRC_SVG_DIR);
let pkgData = fs.readJsonSync(PKG_JSON);
srcData['version'] = pkgData.version;

svgFiles = svgFiles.filter(f => f.indexOf('.svg') > -1);
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


const BASE_PATH = '.'

function upFirst(word) {
  return word[0].toUpperCase() + word.toLowerCase().slice(1);
}

function camelize(text) {
  let words = text.split(/[-_]/g); // ok one simple regexp.
  return words[0].toLowerCase() + words.slice(1).map(upFirst).join('');
}


const moduleData = {};
const esmImports = [];
const cjsImports = [];

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
    modeImportName
  };

  const esmImport = `import ${modeImportName} from './${fileName}';`
  esmImports.push(esmImport);

  const cjsImport = `const ${modeImportName} = require('./${fileName}');`
  cjsImports.push(cjsImport);
});


/*
export const addCircleOutline = {
  ios: iosAddCircleOutlineSvg,
  md: mdAddCircleOutlineSvg
};

export const logoFlickr = logoFlickrSvg;
*/

const esmOutput = [...esmImports.sort()];
const cjsOutput = [];
const dtsOutput = [];

const sortedKeys = Object.keys(moduleData).sort();

sortedKeys.forEach(key => {
  const d = moduleData[key];

  const modes = Object.keys(d.modes).sort();

  if (modes.length === 1) {
    const esm = `export var ${d.exportCommonName} = ${d.modes[modes[0]].modeImportName};`;
    esmOutput.push(esm);

    const cjs = `exports.${d.exportCommonName} = ${d.modes[modes[0]].modeImportName};`;
    cjsOutput.push(cjs);

    const dts = `export declare const ${d.exportCommonName}: string;`;
    dtsOutput.push(dts);

  } else {
    const esm = `export var ${d.exportCommonName} = {`
    esmOutput.push(esm);

    const cjs = `exports.${d.exportCommonName} = {`;
    cjsOutput.push(cjs);

    const dts = `export declare const ${d.exportCommonName} = {`;
    dtsOutput.push(dts);

    for (let i = 0; i < modes.length; i++) {
      const mode = modes[i];
      const suffix = i < modes.length - 1 ? ',' : '';

      esmOutput.push(`  ${mode}: ${d.modes[mode].modeImportName}${suffix}`);
      cjsOutput.push(`  ${mode}: ${d.modes[mode].modeImportName}${suffix}`);
      dtsOutput.push(`  ${mode}: string${suffix}`);
    }

    esmOutput.push(`};`);
    cjsOutput.push(`};`);
    dtsOutput.push(`};`);
  }
});

fs.writeFileSync(DST_ESM, esmOutput.join('\n') + '\n');
fs.writeFileSync(DST_CJS, cjsOutput.join('\n') + '\n');
fs.writeFileSync(DST_DTS, dtsOutput.join('\n') + '\n');
