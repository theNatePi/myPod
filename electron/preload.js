const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("podcasts", {
  addFeed: (url) => ipcRenderer.invoke("feed:add", url),
  listFeeds: () => ipcRenderer.invoke("feed:list"),
  listEpisodes: (id) => ipcRenderer.invoke("episode:list", id),
});
