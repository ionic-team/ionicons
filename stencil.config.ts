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
          src: './components/icon/assets',
          dest: './icon/assets/',
        },
        {
          src: './components/icon/test',
          dest: './icon/test',
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
