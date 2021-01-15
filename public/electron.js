const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { 
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    // minWidth: 670,
    width: isDev ? 1000: 500,
    height: isDev ? 750 : 500,
    frame: false,
    icon: path.join(__dirname, "./favicon.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // and load the index.html of the app.
  // mainWindow.loadURL("http://localhost:3000");
  mainWindow.loadURL(isDev 
      ? "http://localhost:3000"
      : path.join("file:///", __dirname, "./index.html")
  );
  // Open the DevTools.
  if (isDev) mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("close", () => {
  mainWindow.close();
});

ipcMain.on("minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("maximize", (event, arg) => {
  mainWindow.setFullScreen(!mainWindow.isFullScreen());
  
  event.reply("maximize", mainWindow.isFullScreen());
});