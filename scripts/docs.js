const fs = require('fs-extra');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const DOCS_BUILD_DIR = path.join(DOCS_DIR, 'build');

fs.emptyDirSync(DOCS_BUILD_DIR);

fs.copySync(
  path.join(DIST_DIR, 'ionicons.js'),
  path.join(DOCS_BUILD_DIR, 'ionicons.js')
);

fs.copySync(
  path.join(DIST_DIR, 'ionicons'),
  path.join(DOCS_BUILD_DIR, 'ionicons')
);

fs.copySync(
  path.join(DIST_DIR, 'css'),
  path.join(DOCS_BUILD_DIR, 'css')
);

fs.copySync(
  path.join(DIST_DIR, 'fonts'),
  path.join(DOCS_BUILD_DIR, 'fonts')
);

fs.copySync(
  path.join(DIST_DIR, 'svg'),
  path.join(DOCS_BUILD_DIR, 'svg')
);

fs.copySync(
  path.join(SRC_DIR, 'svg'),
  path.join(DOCS_BUILD_DIR, 'src')
);

fs.copySync(
  path.join(DIST_DIR, 'png'),
  path.join(DOCS_BUILD_DIR, 'png')
);
