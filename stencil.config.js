exports.config = {
  namespace: 'ionicons',
  srcDir: 'src/components/',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist'
    }
  ]
};

exports.devServer = {
  root: 'docs',
  watchGlob: '**/**'
};
