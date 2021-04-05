const {
  app,
  ipcMain,
  BrowserView,
  BrowserWindow
} = require('electron');
const url = require('url');
const path = require('path');
const Store = require('electron-store');
const electronLocalshortcut = require('electron-localshortcut');

const { settings } = require('./server/data/settings');
const { Tablist } = require('./server/models/tablist');
const { ipcEventHandler } = require('./server/handlers/ipc');
const { windowEventHandler } = require('./server/handlers/window');
const { keyboardEventHandler } = require('./server/handlers/keyboard');

// Creates global window and store objects
let win;
const store = new Store({
  tabHistory: {
    type: "array",
    items: {
      type: "object"
    }
  }
});

const createWindow = () => {

  // Create BrowserWindow instance
  win = new BrowserWindow({
    show: false,
    frame: false,
    minWidth: settings.minWidth,
    minHeight: settings.minHeight,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load React application
  const reactURL = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(reactURL);
  win.maximize();
  win.show();

  const modal = new BrowserView();
  modal.webContents.loadURL('http://localhost:3000/settings')
  win.addBrowserView(modal);
  modal.setBounds({
    x: 0,
    y: settings.minHeight,
    width: 500,
    height: 500
  });

  let tablist = new Tablist(win);

  win.webContents.openDevTools();

  ipcEventHandler(win, { ipcMain: ipcMain, tablist: tablist, store: store });
  windowEventHandler(win);
  keyboardEventHandler(win, { tablist: tablist });

  // Null window on close
  win.on('closed', () => {
    win = null;
  });

}

app.on('ready', createWindow);

app.on('activate', () => win === null ? createWindow : void(0));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
