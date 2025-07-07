import path from 'path';
import url from 'url';

import { createJestStencilPreset } from 'jest-stencil-runner';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default createJestStencilPreset({
  rootDir: __dirname,  
  // Add any additional Jest configuration here
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ]
});