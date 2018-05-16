// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import server from './server';

const rootReducer = combineReducers({
  server,
  router,
});

export default rootReducer;
