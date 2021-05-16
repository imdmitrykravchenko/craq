import { Context } from 'koa';
import { Route } from 'router6/src/types';
import ServerContext from './ServerContext';
export declare type RendererOptions = {
    statsFilePath: string;
    formatMeta: (route: Route, state: object) => {
        title: string;
        description: string;
        canonical: string;
    };
};
export declare type Renderer<T = any> = (context: ServerContext<T, Context>, App: any, payload: {
    bundles: Record<string, () => Promise<void>>;
    options: RendererOptions;
}) => Promise<any>;
export declare type ServerStats = {
    actions: {
        [actionName: string]: boolean;
    };
    error: {
        code: number;
    };
};
export declare type InitialState = object;
