import { isRoutingError, RouteMiddleware } from 'router6';

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
  actionNameOrNormalizedAction: string | NormalizedAction,
): NormalizedAction =>
  typeof actionNameOrNormalizedAction === 'string'
    ? { name: actionNameOrNormalizedAction, params: {}, options: {} }
    : actionNameOrNormalizedAction;

const actionsMiddleware =
  <T extends Context<any, any>>(
    context: T,
    {
      log = false,
      isServer,
      handleRoutingError,
      executionFlow,
    }: {
      log?: boolean;
      isServer: boolean;
      handleRoutingError?: (e, next) => Promise<any>;
      executionFlow: <E extends Error>(
        execution: Promise<ActionExecutionResult[]>,
        next: (error?: E) => void,
      ) => void;
    },
    stats: ActionExecutionResult = {},
  ): RouteMiddleware =>
  (router) =>
  ({ to, type }, next) => {
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
                () => {
                  if (log) {
                    console.log(`Actions middleware: action ${name} is done`);
                  }

                  return { [name]: true };
                },
                (e) => {
                  if (log) {
                    console.log(
                      `Actions middleware: error during action ${name}`,
                      e,
                    );
                  }

                  if (isRoutingError(e)) {
                    if (handleRoutingError) {
                      return handleRoutingError(e, next);
                    }
                    throw e;
                  }

                  return { [name]: false };
                },
              );
          },
        ),
    );

    return executionFlow(execution, next);
  };

export default actionsMiddleware;
