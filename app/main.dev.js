/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import ip from 'ip';
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import { initSocketServer, reloadAudioInstance } from './server/socket';
import createServer from './webServer';

// Create Express Server to serve Client website from ../client directory
createServer();

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 750,
    height: 700,
    titleBarStyle: 'hiddenInset',
    resizable: false,
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    initSocketServer();
    setIpAddress();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

// IP Address to Redux
const setIpAddress = () => mainWindow.webContents.send('server-ip', ip.address());

// Connector between Electron & Socket Server
const setServerStatus = (data) => mainWindow.webContents.send('server-status', data);
const setServerListeners = (data) => mainWindow.webContents.send('server-all-listeners', data);
const setServerAudioDevices = (data) => mainWindow.webContents.send('server-audio-devices', data);

ipcMain.on('client-audio-devices', (event, deviceId) => reloadAudioInstance(deviceId));

export { setServerStatus, setServerListeners, setServerAudioDevices };
