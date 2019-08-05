import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app/reducer';
import server from './server/reducer';
import { History } from 'history';

const rootReducer = (history: History) =>
  combineReducers({
    app,
    server,
    router: connectRouter(history)
  });

export default rootReducer;
