import { PluginConfig } from 'svgo';

const setRootIoniconClass: PluginConfig = {
  name: 'addClassesToSVGElement',
  params: {
    className: 'ionicon',
  },
};

const addFillNoneCss: PluginConfig = {
  name: 'addFillNoneCss',
  fn: () => ({
    element: {
      enter: (element) => {
        if (element.attributes.fill) {
          if (element.attributes.fill === 'none') {
            element.attributes.class = [...(element.attributes.class?.split(' ') || []), 'ionicon-fill-none'].join(' ');
          }
          delete element.attributes.fill;
        }
        if (element.attributes.stroke) {
          delete element.attributes.stroke;
        }
        if (
          element.attributes['stroke-width'] &&
          (element.attributes['stroke-width'] === '32px' || element.attributes['stroke-width'] === '32')
        ) {
          delete element.attributes['stroke-width'];
          element.attributes.class = [...(element.attributes.class?.split(' ') || []), 'ionicon-stroke-width'].join(
            ' ',
          );
        }
      },
    },
  }),
};

const forceCurrentColor: PluginConfig = {
  name: 'forceCurrentColor',
  fn: () => ({
    element: {
      enter: (element) => {
        const attr = element.attributes.stroke || element.attributes.fill;
        const attrName = element.attributes.stroke ? 'stroke' : element.attributes.fill ? 'fill' : undefined;

        if (attrName) {
          if (attr === '#000' || attr === 'currentColor') {
            element.attributes[attrName] = 'currentColor';
          } else if (attr !== 'none') {
            throw new Error(`invalid "${attrName}" value: ${element.attributes[attrName]}`);
          }
        }
      },
    },
  }),
};

const validatePlugin: PluginConfig = {
  name: 'validate',
  fn: () => ({
    element: {
      enter: (element) => {
        if (element.attributes.style) {
          console.warn(
            `Inline style attributed detected: <${element.name} style="${element.attributes.style}">...</${element.name}>`,
          );
        }
        if (element.name === 'style') {
          console.warn('Inline style element detected');
        }
      },
    },
  }),
};

const basePlugins: PluginConfig[] = [
  'removeStyleElement',
  'convertStyleToAttrs',
  'removeScripts',
  'removeDimensions',
  setRootIoniconClass,
  validatePlugin,
];

export const webComponentPassPlugins: PluginConfig[] = [...basePlugins, addFillNoneCss];

export const sourcePassPlugins: PluginConfig[] = [...basePlugins, forceCurrentColor];
