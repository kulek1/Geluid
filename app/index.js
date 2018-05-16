import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './sass/app.global.scss';
import { setStatus, setIpAddress, setListenersCount, setAudioDevices } from './actions/server';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

ipcRenderer.on('server-ip', (event, payload) => store.dispatch(setIpAddress(payload)));
ipcRenderer.on('server-status', (event, payload) => store.dispatch(setStatus(payload)));
ipcRenderer.on('server-all-listeners', (event, payload) => store.dispatch(setListenersCount(payload)));
ipcRenderer.on('server-audio-devices', (event, payload) => store.dispatch(setAudioDevices(payload)));
