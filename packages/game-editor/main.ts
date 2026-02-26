import { app, BrowserWindow, screen, ipcMain, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
let menu = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();
    createMenu();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  app.on('browser-window-blur', () => {
    win.webContents.send('win-focus', false)
  })

  app.on('browser-window-focus', () => {
    win.webContents.send('win-focus', true)
  })

  ipcMain.on('show-app-menu', (event, arg) => {
    if (win) {
      menu.popup({ window: win, x: arg.x, y: arg.y })
    }
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.


} catch (e) {
  // Catch Error
  // throw e;
}

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    title: 'weather',
    show: false,
    x: 0,
    y: 0,
    width: 1366,
    height: 768,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      allowRunningInsecureContent: (serve) ? true : false,
      webSecurity: false
    },
  });

  win.center();

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '../../node_modules', 'electron')
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });

  win.on('ready-to-show', () => {
    win.show();
    win.focus();
  });

  return win;
}

function createMenu() {
  const isMac = process.platform === 'darwin'

  let template: any = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
            { role: 'close' }
          ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }


  ];

  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);

  return menu;
}

