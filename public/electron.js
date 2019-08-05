const ip = require('ip');
const { initSocketServer, reloadAudioInstance } = require('./socket');
const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 750,
    height: 700,
    titleBarStyle: 'hiddenInset',
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => (mainWindow = null));

  mainWindow.webContents.on('did-finish-load', () => {
    initSocketServer();
    setIpAddress();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IP Address to Redux
const setIpAddress = () =>
  mainWindow.webContents.send('server-ip', ip.address());

// Connector between Electron & Socket Server
const setServerStatus = data =>
  mainWindow.webContents.send('server-status', data);
const setServerListeners = data =>
  mainWindow.webContents.send('server-all-listeners', data);
const setServerAudioDevices = data =>
  mainWindow.webContents.send('server-audio-devices', data);

ipcMain.on('client-audio-devices', (event, deviceId) =>
  reloadAudioInstance(deviceId)
);

module.exports = { setServerStatus, setServerListeners, setServerAudioDevices };
