// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import app from './app';
import server from './server';

const rootReducer = combineReducers({
  app,
  server,
  router,
});

export default rootReducer;
