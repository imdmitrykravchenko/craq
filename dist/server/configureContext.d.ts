import { Context } from 'koa';
import { ComponentType } from 'react';
import { RouteDefinition } from 'router6/src';
import { ReducersMapObject } from 'redux';
import { CraqAction, Registry } from '../types';
import ServerContext from './ServerContext';
declare const _default: ({ reducers, actions, components, routes, }: {
    actions: Registry<CraqAction>;
    components: Registry<ComponentType>;
    reducers: ReducersMapObject;
    routes: RouteDefinition[];
}) => (ctx: Context) => ServerContext<{}, Context>;
export default _default;
