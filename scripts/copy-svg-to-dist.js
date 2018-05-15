console.log('Copy optimized svg files');

var fs = require('fs-extra');
var path = require('path');

var optimizedSvgsDir = path.join(__dirname, '..', 'dist', 'svg');
var componentSvgsDir = path.join(__dirname, '..', 'dist', 'ionicons', 'svg');
var collectionSvgsDir = path.join(__dirname, '..', 'dist', 'collection', 'icon', 'svg');

fs.emptyDirSync(componentSvgsDir);
fs.emptyDirSync(collectionSvgsDir);

fs.copySync(optimizedSvgsDir, collectionSvgsDir);
fs.moveSync(optimizedSvgsDir, componentSvgsDir)
