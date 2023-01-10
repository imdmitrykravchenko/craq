import { RouteMiddleware } from 'router6';

import Context from './Context';

type ActionExecutionResult = { [actionName: string]: boolean };
const compileParam = (param: string, params) =>
  param.replace(/:(\w+)/g, (_, name) => params[name]);

type NormalizedAction = {
  name: string;
  params: object;
};

const normalizeAction = (
  actionNameOrNormalizedAction: string | NormalizedAction,
): NormalizedAction =>
  typeof actionNameOrNormalizedAction === 'string'
    ? { name: actionNameOrNormalizedAction, params: {} }
    : actionNameOrNormalizedAction;

type CallbackPayload = {
  name: string;
  params: Record<string, string>;
};

const noop = () => {};

const actionsMiddleware =
  <T extends Context<any, any>>(
    context: T,
    {
      filter = () => true,
      onError,
      onSuccess = noop,
    }: {
      filter?: (action: NormalizedAction) => boolean;
      onError?: (e: Error, payload: CallbackPayload) => void | Promise<any>;
      onSuccess?: (payload: CallbackPayload) => void | Promise<any>;
    },
  ): RouteMiddleware =>
  (router) =>
  ({ to, type }, next) => {
    context.stats.actions = {};

    return Promise.all<ActionExecutionResult>(
      (to.config.actions || [])
        .map(normalizeAction)
        .filter(filter)
        .map(({ name, params }: NormalizedAction) => {
          const action = context.getAction(name);

          if (!action) {
            return Promise.resolve();
          }

          const compiledParams = Object.entries(params).reduce(
            (result, [key, value]) => ({
              ...result,
              [key]: compileParam(value, to.params),
            }),
            {},
          );
          const callbacksPayload: CallbackPayload = {
            name,
            params: compiledParams,
          };

          return context
            .action(action, { type, route: to, params: compiledParams })
            .then(
              () => onSuccess(callbacksPayload),
              (err) => onError(err, callbacksPayload),
            );
        }),
    ).then(() => next());
  };
export default actionsMiddleware;
