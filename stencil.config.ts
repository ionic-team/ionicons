import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ionicons',
  srcDir: 'src/components/',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist'
    },
    { type: 'docs' },
    { type: 'www' }
  ],
  copy: [
    {
      src: '../svg/',
      dest: './build/ionicons/svg/'
    },
    {
      src: './test/*.svg',
      dest: './assets/'
    }
  ]
};
