import { Icon } from './icon';
export declare const getIconMap: () => Map<string, string>;
export declare const addIcons: (icons: {
    [name: string]: string;
}) => void;
export declare const getUrl: (i: Icon) => string | null;
export declare const getName: (name: string | undefined, icon: string | undefined, mode: string | undefined, ios: string | undefined, md: string | undefined) => string | null;
export declare const getSrc: (src: string | undefined) => string | null;
export declare const isSrc: (str: string) => boolean;
export declare const isStr: (val: any) => val is string;
