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

  var opts = {
    file: input
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
}


// def generate_css_from_scss(data):
//   try:
//     os.makedirs(CSS_FOLDER_PATH)
//   except OSError as e:
//     if e.errno != errno.EEXIST:
//       raise

//   compile_scss_to_css('ionicons', data)
//   compile_scss_to_css('ionicons-core', data)


// def compile_scss_to_css(filename, data):
//   scss_file_path = os.path.join(OUTPUT_SCSS_FOLDER_PATH, '%s.scss' % filename)
//   css_file_path = os.path.join(CSS_FOLDER_PATH, '%s.css' % filename)
//   css_min_file_path = os.path.join(CSS_FOLDER_PATH, '%s.min.css' % filename)

//   print "Generate CSS From %s" % filename
//   cmd = "sass %s %s --style compact" % (scss_file_path, css_file_path)
//   call(cmd, shell=True)

//   cmd = "sass %s %s --style compressed" % (scss_file_path, css_min_file_path)
//   call(cmd, shell=True)