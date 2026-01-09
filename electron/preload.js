const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("podcasts", {
  addFeed: (url) => ipcRenderer.invoke("feed:add", url),
  listFeeds: () => ipcRenderer.invoke("feed:list"),
  listEpisodes: (feedUrl) => ipcRenderer.invoke("episode:list", feedUrl),
  updateEpisodeProgress: (episodeId, progress) => ipcRenderer.invoke("episode:updateProgress", episodeId, progress),
});

contextBridge.exposeInMainWorld("windowData", {
  isAlwaysOnTop: () => ipcRenderer.invoke("windowData:isAlwaysOnTop"),
  onAlwaysOnTopChanged: (callback) => {
    ipcRenderer.on("windowData:alwaysOnTopChanged", (event, isAlwaysOnTop) => {
      callback(event, isAlwaysOnTop);
    });
  },
});
