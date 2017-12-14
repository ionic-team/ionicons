const fs = require('fs-extra');
const path = require('path');
const svg2png = require('svg2png');
const crypto = require('crypto');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const TMP_DIR = path.join(ROOT_DIR, 'tmp');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SVG_SRC_DIR = path.join(SRC_DIR, 'svg');
const PNG_DIST_DIR = path.join(DIST_DIR, 'png');

const SIZES = [64];

fs.ensureDirSync(DIST_DIR);
fs.ensureDirSync(TMP_DIR);
fs.emptyDirSync(PNG_DIST_DIR);

SIZES.forEach(size => {
  const pngDir = path.join(PNG_DIST_DIR, size.toString());
  fs.emptyDirSync(pngDir);
});

var svgFileNames = fs.readdirSync(SVG_SRC_DIR).filter(f => {
  return f.split('.').pop() === 'svg';
});

svgFileNames.forEach(svgFileName => {
  const svgFilePath = path.join(SVG_SRC_DIR, svgFileName);
  const pngFileName = svgFileName.replace('.svg', '.png');

  const sourceBuffer = fs.readFileSync(svgFilePath);

  const hash = crypto.createHash('sha1')
                     .update(sourceBuffer.toString())
                     .digest('base64')
                     .replace(/\W/g, '');

  SIZES.forEach(size => {
    generatePng(pngFileName, sourceBuffer, hash, size);
  });
});


function generatePng(pngFileName, sourceBuffer, hash, size) {
  const cachedFilePath = path.join(TMP_DIR, hash + '.' + size + '.png');
  const pngFilePath = path.join(PNG_DIST_DIR, size.toString(), pngFileName);

  try {
    const cachedFileContent = fs.readFileSync(cachedFilePath);
    fs.writeFileSync(pngFilePath, cachedFileContent);

  } catch (e) {
    const outputBuffer = svg2png.sync(sourceBuffer, { width: size, height: size });

    fs.writeFileSync(pngFilePath, outputBuffer);
    fs.writeFileSync(cachedFilePath, outputBuffer);

    console.log('converted to png', size, pngFileName);
  }
}