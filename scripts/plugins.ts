import { PluginConfig } from 'svgo';
import type { CustomPlugin } from './types';

const setRootIoniconClass: PluginConfig = {
    name: 'addClassesToSVGElement',
    params: {
        className: 'ionicon'
    }
}

const removeStyleAttribute: PluginConfig = {
    name: 'removeAttrs',
    params: {
        attrs: ['style']
    }
}

const addFillNoneCss: PluginConfig = {
    name: 'addFillNoneCss',
    fn: () => ({
        element: {
            enter: (element) => {
                if (element.attributes.fill) {
                    if (element.attributes.fill === 'none') {
                        element.attributes.class = [
                            ...(element.attributes.class?.split(' ') || []),
                            'ionicon-fill-none'
                        ].join(' ');
                    }
                    delete element.attributes.fill;
                } else if (element.attributes.name === 'stroke') {
                    delete element.attributes.stroke;
                } else if (element.attributes.name === 'stroke-width' && element.attributes.value === '32') {
                    delete element.attributes.strokeWidth;
                    element.attributes.class += ' ionicon-stroke-width';
                }
            }
        }
    })
}

const forceCurrentColor: PluginConfig = {
    name: 'forceCurrentColor',
    fn: () => ({
        element: {
            enter: (element) => {
                const attr = element.attributes.stroke || element.attributes.fill;
                const attrName = element.attributes.stroke
                    ? 'stroke'
                    : element.attributes.fill
                        ? 'fill'
                        : undefined;

                if (attrName) {
                    if (attr === '#000' || attr === 'currentColor') {
                        element.attributes[attrName] = 'currentColor';
                    } else if (attr !== 'none') {
                        throw new Error(`invalid "${attrName}" value: ${element.attributes[attrName]}`);
                    }
                }
            }
        }
    })
}

const validatePlugin: PluginConfig = {
    name: 'validate',
    fn: () => ({
        element: {
            enter: (element) => {
                if (element.attributes.style) {
                    console.warn(`Inline style attributed detected: <${element.name} style="${element.attributes.style}">...</${element.name}>`);
                }
                if (element.name === 'style') {
                    console.warn('Inline style element detected');
                }
            }
        }
    })
}

const basePlugins: PluginConfig[] = [
    'removeStyleElement',
    removeStyleAttribute,
    'removeScriptElement',
    'removeDimensions',
    setRootIoniconClass,
    validatePlugin,
]

export const webComponentPassPlugins: PluginConfig[] = [
    ...basePlugins,
    addFillNoneCss,
]

export const sourcePassPlugins: PluginConfig[] = [
    ...basePlugins,
    forceCurrentColor
]

