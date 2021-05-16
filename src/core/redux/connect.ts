import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

import { ComponentContext } from '../../types';

const context = createContext<ComponentContext<{}>>(null);

const ContextProvider = context.Provider;

const connect = (mapStateToProps, mapContextToProps) => {
  return (Component) => {
    return (ownProps) => {
      const stateProps: object = mapStateToProps
        ? useSelector(mapStateToProps)
        : {};
      const contextProps: object = mapContextToProps
        ? mapContextToProps(useContext(context))
        : {};

      return React.createElement(Component, {
        ...ownProps,
        ...stateProps,
        ...contextProps,
      });
    };
  };
};

export { ContextProvider };

export default connect;
