import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Routes from './routes';
import reducers from './reducers';

const store = createStore(reducers);
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
