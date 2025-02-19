const { app, BrowserWindow, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('index.html'); // Or load a URL if needed

    // Disable automatic page reloads
    mainWindow.webContents.on('will-navigate', (event) => {
        event.preventDefault(); // Prevent navigation from happening
    });

    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F5' || input.key === 'Control+R') {
            event.preventDefault(); // Prevent F5 or Ctrl+R (reload) from working
        }
    });

    // Check for updates
    autoUpdater.checkForUpdatesAndNotify();
});

// Auto-updater events
autoUpdater.on("update-available", () => {
    dialog.showMessageBox({
        type: "info",
        title: "Update Available",
        message: "A new version is available. Downloading now...",
    });
});

autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
        type: "info",
        title: "Update Ready",
        message: "Updates have been downloaded. The app will restart to apply updates.",
    }).then(() => {
        autoUpdater.quitAndInstall();
    });
});
