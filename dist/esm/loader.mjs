import { a as patchEsm, b as bootstrapLazy } from './core-c43f7ae6.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["ion-icon",[[1,"ion-icon",{"color":[1],"ariaLabel":[1537,"aria-label"],"ios":[1],"md":[1],"flipRtl":[4,"flip-rtl"],"name":[1],"src":[1],"icon":[8],"size":[1],"lazy":[4],"svgContent":[32],"isVisible":[32]}]]]], options);
  });
};

export { defineCustomElements };
