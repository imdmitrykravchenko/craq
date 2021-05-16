import { createStore, combineReducers, applyMiddleware } from 'redux';

export default ({ initialState = {}, middleware = [], reducers = {} } = {}) =>
  createStore(
    combineReducers(reducers),
    initialState,
    middleware.length ? applyMiddleware(...middleware) : undefined,
  );
