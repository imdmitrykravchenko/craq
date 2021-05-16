import React from 'react';
import { ComponentContext } from '../../types';
declare const ContextProvider: React.Provider<ComponentContext<{}>>;
declare const connect: (mapStateToProps: any, mapContextToProps: any) => (Component: any) => (ownProps: any) => React.CElement<any, React.Component<any, any, any>>;
export { ContextProvider };
export default connect;
