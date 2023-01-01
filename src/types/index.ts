import Router6, { Route } from 'router6';

export type CraqAction<S, P> = (context: ActionContext<S>, payload?: P) => any;

export type NavigateCraqActionPayload = {
  route: Route;
  type: string;
  params: Record<string, string>;
};

export type NavigateCraqAction<S = any> = CraqAction<
  S,
  NavigateCraqActionPayload
>;

export type CraqService<P> = (context: ServiceContext, payload?: P) => any;

export type ComponentContext<S> = {
  action: <P, T extends CraqAction<S, P>>(
    action: T,
    payload?: P,
  ) => Promise<ReturnType<T>>;
};

export type ServiceContext = {
  service: <P, T extends CraqService<P>>(
    service: T,
    payload?: P,
  ) => Promise<ReturnType<T>>;
};

export type Store<T, A> = {
  getState: () => T;
  dispatch: (action: A) => Promise<void>;
  subscribe: (listener: () => void) => () => void;
};

export type ActionContext<S, A = any> = ServiceContext &
  ComponentContext<S> &
  Pick<Store<S, A>, 'getState' | 'dispatch'> & {
    router: Router6;
  };

export type Registry<T> = {
  register: (key: string, value: T) => void;
  has: (key: string) => boolean;
  get: (key: string) => T;
  entries: () => Record<string, T>;
};

export type Registries<S> = {
  actions: Registry<NavigateCraqAction<S>>;
  components: Registry<any>;
};
