declare const _default: ({ initialState, middleware, reducers }?: {
    initialState?: {};
    middleware?: any[];
    reducers?: {};
}) => import("redux").Store<import("redux").EmptyObject & {}, never> & {
    dispatch: unknown;
};
export default _default;
