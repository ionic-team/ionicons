import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ionicons',
  srcDir: 'src/components/',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist'
    }
  ]
};
