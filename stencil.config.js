exports.config = {
  namespace: 'ionicons',
  generateDistribution: true,
  generateWWW: false,
  distDir: 'dist/',
  srcDir: 'src/components/'
};

exports.devServer = {
  root: 'docs',
  watchGlob: '**/**'
};
