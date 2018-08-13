import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { Router } from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import App from './components/App';
import history from './helpers/history'
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
