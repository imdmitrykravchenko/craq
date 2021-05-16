import { Store } from 'redux';
import Router6 from 'router6/src';
import { CraqAction, Registries, ComponentContext, CraqService, ServiceContext } from '../types';
export default class Context<S> {
    private store;
    private readonly actionContext;
    protected readonly serviceContext: ServiceContext;
    readonly componentContext: ComponentContext<S>;
    stats: {
        [key: string]: any;
    };
    router: Router6;
    private registries;
    constructor({ store, router, registries, }: {
        store: Store<S>;
        router: Router6;
        registries: Registries<S>;
    });
    dispatch(action: any): Promise<any>;
    action<P, T extends CraqAction<S, P>>(action: T, payload?: P): Promise<ReturnType<T>>;
    service<P, T extends CraqService<P>>(service: T, payload?: P): Promise<ReturnType<T>>;
    getStore(): Store<S, import("redux").AnyAction>;
    getAction(name: string): import("../types").NavigateCraqAction<S>;
    getComponent<T = {}>(name: string, type?: string): T;
    getComponentsByType<T = {}>(type: string): {
        [key: string]: T;
    };
}
