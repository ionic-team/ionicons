var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');

var svgsDir = path.join(__dirname, '..', 'dist', 'svg');
var distzipDir = path.join(__dirname, '..', 'docs');
var distzipFile = path.join(distzipDir, 'ionicons.designerpack.zip');

fs.ensureDirSync(distzipDir);

var archive = archiver('zip', {
  zlib: { level: 9 }
});

var output = fs.createWriteStream(distzipFile);
output.on('close', () => {
  console.log('Svg zip archive created.');
});

archive.pipe(output);
archive.directory(svgsDir, false);
archive.on('error', (err) => {
  throw err;
});
archive.finalize();
