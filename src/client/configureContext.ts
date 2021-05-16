import { ComponentType } from 'react';
import Router6, { RouteDefinition } from 'router6/src';
import { ReducersMapObject, createStore, combineReducers } from 'redux';

import Context from '../core/Context';
import { CraqAction, Registry } from '../types';
import { InitialState } from '../server/types';

export default ({
  reducers,
  actions,
  components,
  routes,
}: {
  actions: Registry<CraqAction>;
  components: Registry<ComponentType>;
  reducers: ReducersMapObject;
  routes: RouteDefinition[];
}) =>
  new Context({
    store: createStore(
      combineReducers(reducers),
      // @ts-ignore
      __INITIAL_STATE__ as InitialState,
    ),
    router: new Router6(routes),
    registries: { actions, components },
  });
