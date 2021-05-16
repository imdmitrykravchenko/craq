/// <reference types="node" />
import '@babel/polyfill';
import ServerContext from './ServerContext';
import { Renderer, RendererOptions } from './types';
export declare const createCraqServer: (createContext: <T>(ctx: T) => ServerContext<any, T>, App: any, { bundles, renderers, options, }: {
    renderers: Record<string, Renderer>;
    bundles: Record<string, () => Promise<void>>;
    options: RendererOptions;
}) => {
    listen: (port: number) => import("http").Server;
};
