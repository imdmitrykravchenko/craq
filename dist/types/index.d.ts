import { Action } from 'redux-act';
import Router6, { Route } from 'router6/src';
export declare type CraqAction<S = {}, P = {}> = (context: ActionContext<S>, payload?: P) => any;
export declare type NavigateCraqAction<S = {}> = CraqAction<S, {
    route: Route;
    type: string;
    params: Record<string, string>;
}>;
export declare type CraqService<P = {}> = (context: ServiceContext, payload?: P) => any;
export declare type ComponentContext<S> = {
    action: <P, T extends CraqAction<S, P>>(action: T, payload?: P) => Promise<ReturnType<T>>;
};
export declare type ServiceContext = {
    service: <P, T extends CraqService<P>>(service: T, payload?: P) => Promise<ReturnType<T>>;
};
export declare type ServerServiceContext<T> = ServiceContext & {
    ctx: T;
};
export declare type ActionContext<S> = ServiceContext & ComponentContext<S> & {
    router: Router6;
    getState: () => S;
    dispatch: (action: Action<any>) => Promise<void>;
};
export declare type Registry<T> = {
    register: (key: string, value: T) => void;
    has: (key: string) => boolean;
    get: (key: string) => T;
    entries: () => Record<string, T>;
};
export declare type Registries<S> = {
    actions: Registry<NavigateCraqAction<S>>;
    components: Registry<any>;
};
