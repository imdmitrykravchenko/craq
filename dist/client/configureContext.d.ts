import { ComponentType } from 'react';
import { RouteDefinition } from 'router6/src';
import { ReducersMapObject } from 'redux';
import Context from '../core/Context';
import { CraqAction, Registry } from '../types';
declare const _default: ({ reducers, actions, components, routes, }: {
    actions: Registry<CraqAction>;
    components: Registry<ComponentType>;
    reducers: ReducersMapObject;
    routes: RouteDefinition[];
}) => Context<{}>;
export default _default;
