import qs from 'qs';
import { isRoutingError, RouteMiddleware } from 'router6/src';

import Context from './Context';

type ActionExecutionResult = { [actionName: string]: boolean };
const compileParam = (param: string, params) =>
  param.replace(/:(\w+)/g, (_, name) => params[name]);

type ActionOptions = { serverOnly?: boolean; clientOnly?: boolean };
type NormalizedAction = {
  name: string;
  params: object;
  options: ActionOptions;
};

const normalizeAction = (
  actionNameOrNormailizedAction: string | NormalizedAction,
): NormalizedAction =>
  typeof actionNameOrNormailizedAction === 'string'
    ? { name: actionNameOrNormailizedAction, params: {}, options: {} }
    : actionNameOrNormailizedAction;

const actionsMiddleware =
  <T extends Context<any>>(
    context: T,
    {
      isServer,
      handleRoutingError,
      executionFlow,
    }: {
      isServer: boolean;
      handleRoutingError?: (e, next, abort) => Promise<any>;
      executionFlow: (
        execution: Promise<ActionExecutionResult[]>,
        next: () => void,
        abort: (e: Error) => void,
      ) => void;
    },
    stats: ActionExecutionResult = {},
  ): RouteMiddleware =>
  (router) =>
  ({ to, type }, next, abort) => {
    const routerStarted = router.isStarted();
    const execution = Promise.all<ActionExecutionResult>(
      (to.config.actions || [])
        .map(normalizeAction)
        .filter(({ name }: { name: string }) => routerStarted || !stats[name])
        .map(
          ({
            name,
            params,
            options: { serverOnly, clientOnly },
          }: NormalizedAction) => {
            const hasPermissionToExecute = isServer ? !clientOnly : !serverOnly;
            const action = context.getAction(name);

            if (!action || !hasPermissionToExecute) {
              return Promise.resolve({ [name]: false });
            }

            return context
              .action(action, {
                type,
                route: to,
                params: Object.entries(params).reduce(
                  (result, [key, value]) => ({
                    ...result,
                    [key]: compileParam(value, to.params),
                  }),
                  {},
                ),
              })
              .then(
                () => ({ [name]: true }),
                (e) => {
                  console.log(`error during action ${name}`, e);

                  if (isRoutingError(e)) {
                    e.meta = { path: to.path };

                    if (handleRoutingError) {
                      return handleRoutingError(e, next, abort);
                    }
                    throw e;
                  }

                  return { [name]: false };
                },
              );
          },
        ),
    );

    return executionFlow(execution, next, abort);
  };

export default actionsMiddleware;
