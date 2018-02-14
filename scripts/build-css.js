var sass = require('node-sass');
var fs = require('fs-extra');
var path = require('path');

var distScssDir = path.join(__dirname, '..', 'dist', 'scss');
var distCssDir = path.join(__dirname, '..', 'dist', 'css');

fs.emptyDirSync(distCssDir);

generateCss('ionicons');
generateCss('ionicons-core');


function generateCss(fileName) {
  var input = path.join(distScssDir, fileName + '.scss');
  var output = path.join(distCssDir, fileName + '.css');
  var outputMin = path.join(distCssDir, fileName + '.min.css');

  var opts = {
    file: input,
    outputStyle: 'expanded'
  };

  sass.render(opts, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(output, result.css.toString(), { encoding: 'utf-8' }, (err) => {
        if (err) {
          console.log(err);
        }
      })
    }
  });

  var optsMin = {
    file: input,
    outputStyle: 'compressed'
  };

  sass.render(optsMin, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(outputMin, result.css.toString(), { encoding: 'utf-8' }, (err) => {
        if (err) {
          console.log(err);
        }
      })
    }
  });
}
