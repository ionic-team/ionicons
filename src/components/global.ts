import { setMode } from '@stencil/core';

setMode((el: any) => el.tagName === 'ION-ICON' ? el.mode || el.getAttribute('mode') : null);
