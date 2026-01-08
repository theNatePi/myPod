const { ipcMain, BrowserWindow } = require("electron");
const { addFeed, getAllFeeds, getEpisodes } = require("./rss");

ipcMain.handle("feed:add", async (_, feedUrl) => {
  return addFeed(feedUrl);
});

ipcMain.handle("feed:list", async () => {
  return getAllFeeds();
});

ipcMain.handle("episode:list", async (_, feedId) => {
  return getEpisodes(feedId);
});

ipcMain.handle("windowData:isAlwaysOnTop", async () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    return focusedWindow.isAlwaysOnTop();
  }
  // Fallback: check all windows
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length > 0) {
    return allWindows[0].isAlwaysOnTop();
  }
  return false;
});
