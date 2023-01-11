import Router6 from 'router6';

import {
  CraqAction,
  Registries,
  ComponentContext,
  CraqService,
  ServiceContext,
  ActionContext,
  Store,
} from '../types';

export default class Context<S, A> {
  private store: Store<S, A>;

  protected readonly actionContext: ActionContext<S>;

  protected readonly serviceContext: ServiceContext;

  public readonly componentContext: ComponentContext<S>;

  public stats: { [key: string]: any };

  public router: Router6;

  private registries: Registries<S>;

  constructor({
    store,
    router,
    registries,
  }: {
    store: Store<S, A>;
    router: Router6;
    registries: Registries<S>;
  }) {
    this.registries = registries;
    this.stats = {};
    this.store = store;
    this.router = router;
    this.actionContext = {
      router,
      getState: () => store.getState(),
      dispatch: (action: A) => this.dispatch(action),
      action: (action, payload) => this.action(action, payload),
      service: (service, payload) => this.service(service, payload),
    };
    this.componentContext = {
      action: (...args) => this.action(...args),
    };
    this.serviceContext = {
      service: (...args) => this.service(...args),
    };
  }

  dispatch(action: A) {
    return Promise.resolve().then(() => this.store.dispatch(action));
  }

  action<P, T extends CraqAction<S, P>>(
    action: T,
    payload?: P,
  ): Promise<ReturnType<T>> {
    return Promise.resolve().then(() => action(this.actionContext, payload));
  }

  service<P, T extends CraqService<P>>(
    service: T,
    payload?: P,
  ): Promise<ReturnType<T>> {
    return Promise.resolve().then(() => service(this.serviceContext, payload));
  }

  getStore() {
    return this.store;
  }

  getAction(name: string) {
    return this.registries.actions.get(name);
  }

  getComponent<T = {}>(name: string, type?: string): T {
    return this.registries.components.get(
      [type, name].filter(Boolean).join('/'),
    );
  }

  getComponentsByType<T = {}>(type: string): { [key: string]: T } {
    const typePrefix = `${type}/`;

    return Object.entries(this.registries.components.entries()).reduce(
      (result, [key, value]) =>
        key.startsWith(typePrefix)
          ? { ...result, [key.replace(typePrefix, '')]: value }
          : result,
      {},
    );
  }
}
