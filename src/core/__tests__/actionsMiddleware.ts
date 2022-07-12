import Router6, { NotFoundError } from 'router6/src';
import actionsMiddleware from '../actionsMiddleware';
import Context from '../Context';
import createRegistry from '../registry';

describe('actionsMiddleware', () => {
  describe('server side', () => {
    const getTestContext = (throwingAction) => {
      const router = new Router6([
        {
          path: '/abc',
          name: 'name',
          config: {
            actions: ['notThrowing/action', 'throwing/action'],
          },
        },
        {
          name: '404',
          path: '/(.*)',
          config: {
            error: true,
            actions: ['404/action'],
          },
        },
      ]);
      const actions = createRegistry();

      actions.register('404/action', () => {});
      actions.register('notThrowing/action', () => {});
      actions.register('throwing/action', throwingAction);

      const context = new Context({
        store: null,
        router,
        registries: { actions, components: createRegistry() },
      });

      router.use(
        actionsMiddleware(context, {
          isServer: true,
          handleRoutingError: (e, next) => Promise.reject(next(e)),
          executionFlow: (execution, next) =>
            execution
              .then(
                (results) => {
                  context.stats.actions = results.reduce(
                    (result, action) => ({ ...result, ...action }),
                    {},
                  );
                },
                (error) => {
                  context.stats.error = error;

                  return error;
                },
              )
              .then(next),
        }),
      );

      return context;
    };

    it('handle any error', async () => {
      const context = getTestContext(() => {
        return Promise.reject(new Error('NOPE'));
      });
      const route = await context.router.start('/abc?a=1');

      expect(context.stats.actions['throwing/action']).toBe(false);
      expect(context.stats.actions['notThrowing/action']).toBe(true);
      expect(route).toMatchObject({
        error: null,
        state: undefined,
        query: { a: '1' },
        params: {},
        config: {
          actions: ['notThrowing/action', 'throwing/action'],
        },
        name: 'name',
        path: '/abc',
      });
    });

    it('handle 404', async () => {
      const context = getTestContext(() => {
        const err = new NotFoundError('NOPE');

        err.meta = { route: '404' };

        return Promise.reject(err);
      });
      const route = await context.router.start('/abc?a=1');

      expect(context.stats.actions['404/action']).toBe(true);

      expect(route).toMatchObject({
        error: expect.any(Object),
        state: undefined,
        query: { a: '1' },
        params: {},
        config: { error: true, actions: ['404/action'] },
        name: '404',
        path: '/abc',
      });
    });
  });
});
