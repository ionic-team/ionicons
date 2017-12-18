console.log('Copy optimized svg files to dist/ionicons/svg');

var fs = require('fs-extra');
var path = require('path');

var optimizedSvgsDir = path.join(__dirname, '..', 'dist', 'collection', 'icon', 'svg');
var componentSvgDir = path.join(__dirname, '..', 'dist', 'ionicons', 'svg');

fs.emptyDirSync(componentSvgDir);

fs.copy(optimizedSvgsDir, componentSvgDir);
