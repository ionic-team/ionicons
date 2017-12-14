exports.config = {
  namespace: 'DocsSite',
  srcDir: 'site/',
  wwwDir: '../../docs/',
  copy: [
    { src: '../../../dist/css', dest: 'css' },
    { src: '../../../dist/fonts', dest: 'fonts' }
  ],
  serviceWorker: false
};
