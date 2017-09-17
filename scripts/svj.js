console.log('Build JPML files');

var jpml = require('@ionic/jpml');


jpml.generate({
  include: ['dist/svg/'],
  outDir: 'src/components/icon/svj/',
  filter: function(path) {
    return path.toLowerCase().split('.').pop() === 'svg';
  },
  fileName: function(path) {
    return path.replace('.svg', '.svj');
  },
  key: function(path) {
    return path.replace('.svg', '');
  },
  wrapper: function(content, key) {
    return "loadIonicon('" + content.replace(/'/g, "\\\'") + "','" + key + "');"
  }
});
