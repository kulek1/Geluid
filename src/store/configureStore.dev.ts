// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import { createBrowserHistory } from 'history';
// import { createLogger } from 'redux-logger';
// import rootReducer from '../reducers';
// import * as serverActions from '../actions/';
// import { routerMiddleware } from 'connected-react-router';

// const history = createBrowserHistory();

import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();

const middlewares = [routerMiddleware(history), thunk];

export const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(...middlewares))
);
