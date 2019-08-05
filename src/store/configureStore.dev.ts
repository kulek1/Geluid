import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const history = createBrowserHistory();

const middlewares = [routerMiddleware(history), thunk];

export const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(...middlewares))
);
