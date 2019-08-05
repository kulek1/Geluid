import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import server from './server';

const rootReducer = (history: any) =>
  combineReducers({
    app,
    server,
    router: connectRouter(history)
  });

export default rootReducer;
