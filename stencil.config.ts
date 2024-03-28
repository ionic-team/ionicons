import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ionicons',
  buildEs5: 'prod',
  sourceMap: false,
  outputTargets: [
    {
      type: 'dist',
      empty: false,
    },
    {
      type: 'dist-custom-elements',
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
        }
      ],
      empty: false,
      serviceWorker: false,
    },
  ],
};
