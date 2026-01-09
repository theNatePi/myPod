const { ipcMain, BrowserWindow } = require("electron");
const { getFeedByUrl } = require("./rss");
const { addFeed, listFeeds } = require("./db/feeds");
const { listEpisodes, updateEpisodeProgress } = require("./db/episodes");

ipcMain.handle("feed:add", async (_, feedUrl) => {
  const feed = await getFeedByUrl(feedUrl);
  return addFeed(feed);
});

ipcMain.handle("feed:list", async () => {
  const feeds = await listFeeds();
  return feeds;
});

ipcMain.handle("episode:list", async (_, feedUrl) => {
  const episodes = await listEpisodes(feedUrl);
  return episodes;
});

ipcMain.handle("episode:updateProgress", async (_, episodeId, progress) => {
  return updateEpisodeProgress(episodeId, progress);
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