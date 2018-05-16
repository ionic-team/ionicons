var fs = require('fs-extra');
var path = require('path');

var docsBuild = path.join(__dirname, '..', 'docs', 'build');
var docsIonicons = path.join(__dirname, '..', 'docs', 'ionicons');

clean(docsBuild);
clean(docsIonicons);

function clean(dir) {
  console.log('Clean:', dir);
  fs.emptyDirSync(dir);
}