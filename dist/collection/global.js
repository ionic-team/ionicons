import { setMode } from "@stencil/core";
export default () => {
    setMode((el) => el.tagName === 'ION-ICON' ? el.mode || el.getAttribute('mode') : null);
};
