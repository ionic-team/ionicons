import { setMode } from '@stencil/core';

export default () => {
  setMode((el: any) => el.tagName === 'ION-ICON' ? el.mode || el.getAttribute('mode') : null);
};
