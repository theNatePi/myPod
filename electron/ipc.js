const { ipcMain } = require("electron");
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
