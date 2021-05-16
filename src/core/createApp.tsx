import React, { ComponentType } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'router6-react/src';

import { ContextProvider } from './redux/connect';
import Context from './Context';

export default (Content: ComponentType<{ context: Context<any> }>) => ({
  context,
}: {
  context: Context<any>;
}) => (
  <RouterProvider router={context.router}>
    <ContextProvider value={context.componentContext}>
      <Provider store={context.getStore()}>
        <Content context={context} />
      </Provider>
    </ContextProvider>
  </RouterProvider>
);
