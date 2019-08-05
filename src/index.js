import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ipcRenderer } from 'electron';
import Root from './containers/Root';
import { store, history } from './store/configureStore.dev';
import './sass/app.global.scss';
import {
  setStatus,
  setIpAddress,
  setListenersCount,
  setAudioDevices
} from './actions/';

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

ipcRenderer.on('server-ip', (event, payload) =>
  store.dispatch(setIpAddress(payload))
);
ipcRenderer.on('server-status', (event, payload) =>
  store.dispatch(setStatus(payload))
);
ipcRenderer.on('server-all-listeners', (event, payload) =>
  store.dispatch(setListenersCount(payload))
);
ipcRenderer.on('server-audio-devices', (event, payload) =>
  store.dispatch(setAudioDevices(payload))
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
