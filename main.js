const { app, BrowserWindow } = require('electron');

let mainWindow;
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // Important: enable webview support
      webviewTag: true,
      // The rest can be adjusted as needed
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
});
