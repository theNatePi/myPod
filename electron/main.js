const { app, BrowserWindow } = require("electron");
const { setupKeybinds } = require('./keybinds');
const { getOrInitDB } = require("./db");
const path = require("path");
require("./ipc");
require("./keybinds");

let isQuitting = false;
let mainWindow = null;

app.on("before-quit", () => {
  isQuitting = true;
});

app.on('will-quit', () => {
  // Final fallback to ensure process exits
  if (isQuitting) {
    process.exit(0);
  }
});

app.on('window-all-closed', () => {
  // Quit the app when all windows are closed (on all platforms)
  if (isQuitting) {
    // If we're quitting (CMD+Q), force immediate exit
    app.exit(0);
  } else {
    // Also quit when window is closed normally
    app.quit();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 480,
    frame: false,
    title: 'myPod',
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    resizable: false
  });

  mainWindow.loadURL("http://localhost:5173");

  // Handle window close - allow it to close normally
  // We'll quit the app in window-all-closed handler
  mainWindow.on('close', () => {
    // Allow window to close - we'll handle quit in window-all-closed
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  getOrInitDB();
  createWindow();
  setupKeybinds();
});

// Reopen window when dock icon is clicked on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    getOrInitDB();
    createWindow();
  } else if (mainWindow.isVisible() === false) {
    mainWindow.show();
  }
});
