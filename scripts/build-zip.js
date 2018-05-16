var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');

var svgsDir = path.join(__dirname, '..', 'dist', 'svg');
var distzipDir = path.join(__dirname, '..', 'docs');
var distzipFile = path.join(distzipDir, 'ionicons.designerpack.zip');

console.log('designerpack source:', svgsDir);

const svgCount = fs.readdirSync(svgsDir).length;

console.log('Total svg files to zip:', svgCount);
fs.ensureDirSync(distzipDir);

var archive = archiver('zip', {
  zlib: { level: 9 }
});

var output = fs.createWriteStream(distzipFile);
output.on('close', () => {
  console.log('designerpack created:', distzipFile);
});

archive.pipe(output);
archive.directory(svgsDir, false);
archive.on('error', (err) => {
  throw err;
});
archive.finalize();
