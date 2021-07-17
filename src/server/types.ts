import { Context } from 'koa';
import { Route } from 'router6/src/types';

import ServerContext from './ServerContext';

export type RendererOptions = {
  statsFilePath: string;
  formatMeta: (
    route: Route,
    state: object,
  ) => {
    title: string;
    description: string;
    canonical: string;
    lang?: string;
    og?: { title: string; description: string };
  };
};
export type Renderer<T = any> = (
  context: ServerContext<T, Context>,
  App: any,
  payload: {
    bundles: Record<string, () => Promise<void>>;
    options: RendererOptions;
  },
) => Promise<any>;

export type ServerStats = {
  actions: { [actionName: string]: boolean };
  error: { code: number };
};
export type InitialState = object;
