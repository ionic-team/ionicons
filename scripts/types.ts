import { PluginConfig } from 'svgo';

export interface SvgData {
  /**
   * airplane-outline.svg
   */
  fileName: string;

  /**
   * airplane
   */
  title: string;

  /**
   * /src/svg/airplane-outline.svg
   */
  srcFilePath: string;

  /**
   * /dist/ionicons/svg/airplane-outline.svg
   */
  optimizedFilePath: string;

  /**
   * /dist/svg/airplane-outline.svg
   */
  distSvgFilePath: string;

  /**
   * optimized svg content
   */
  optimizedSvgContent?: string;

  /**
   * airplane-outline
   */
  iconName: string;

  /**
   * airplane-outline.mjs
   */
  fileNameMjs: string;

  /**
   * airplane-outline.js
   */
  fileNameCjs: string;

  /**
   * airplaneOutline
   */
  exportName: string;
}
