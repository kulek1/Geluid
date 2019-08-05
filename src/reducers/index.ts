import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import server from './server';
import { History } from 'history';

const rootReducer = (history: History) =>
  combineReducers({
    app,
    server,
    router: connectRouter(history)
  });

export default rootReducer;
