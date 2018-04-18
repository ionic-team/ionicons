var fs = require('fs-extra');
var path = require('path');
var archiver = require('archiver');

var svgsDir = path.join(__dirname, '..', 'dist','svg');
var distzipDir = path.join(__dirname, '..', 'dist');

var archive = archiver('zip', {
  zlib: { level: 9 }
});
var output = fs.createWriteStream(distzipDir + '/ionicons.zip');
output.on('close', function() {
  console.log('Svg zip archive created.');
});

archive.pipe(output);
archive.directory(svgsDir, false);
archive.on('error', function(err){
    throw err;
});
archive.finalize();
