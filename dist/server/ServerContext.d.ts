import { Store } from 'redux';
import { Context as KoaContext } from 'koa';
import Router6 from 'router6/src';
import Context from '../core/Context';
import { Registries, ServerServiceContext } from '../types';
export default class ServerContext<S, X = KoaContext> extends Context<S> {
    ctx: X;
    protected serviceContext: ServerServiceContext<X>;
    constructor({ store, router, ctx, registries, }: {
        registries: Registries<S>;
        store: Store<S>;
        router: Router6;
        ctx: X;
    });
}
