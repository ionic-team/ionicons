console.log('Build JPML files');

var jpml = require('@ionic/jpml');
var fs = require('fs-extra');
var path = require('path');

const OUT_DIR = [
  path.join(__dirname, '..', 'dist', 'ionicons', 'svg'),
  path.join(__dirname, '..', 'dist', 'collection', 'icon', 'svg')
];

OUT_DIR.forEach(outDir => {
  fs.emptyDirSync(outDir);
});

jpml.generate({
  include: ['dist/svg/'],
  outDir: OUT_DIR,
  filter: function(path) {
    return path.toLowerCase().split('.').pop() === 'svg';
  },
  fileName: function(path) {
    return path.replace('.svg', '.js');
  },
  key: function(path) {
    return path.replace('.svg', '');
  },
  wrapper: function(content, key) {
    return "loadIonicon('" + content.replace(/'/g, "\\\'") + "','" + key + "');"
  }
});
