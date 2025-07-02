import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ionicons',
  sourceMap: false,
  outputTargets: [
    {
      type: 'dist',
      collectionDir: './collection',
      empty: false,
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
      dir: './components',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        {
          src: './components/test/*.svg',
          dest: './assets/',
        },
        {
          src: './components/test/',
          dest: './test/',
        },
        {
          src: './svg/*.svg',
          dest: './svg/',
        },
      ],
      empty: false,
      serviceWorker: false,
    },
  ],
};
