import { Renderer } from './types';
export declare type JSResource = {
    type: 'js';
    async?: boolean;
    defer?: boolean;
    src?: string;
    code?: string;
    place?: string;
};
export declare type CSSResource = {
    type: 'css';
    href?: string;
    style?: string;
    place?: string;
};
declare const html: Renderer;
export default html;
