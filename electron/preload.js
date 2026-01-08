const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("podcasts", {
  addFeed: (url) => ipcRenderer.invoke("feed:add", url),
  listFeeds: () => ipcRenderer.invoke("feed:list"),
  listEpisodes: (id) => ipcRenderer.invoke("episode:list", id),
});

contextBridge.exposeInMainWorld("windowData", {
  isAlwaysOnTop: () => ipcRenderer.invoke("windowData:isAlwaysOnTop"),
  onAlwaysOnTopChanged: (callback) => {
    ipcRenderer.on("windowData:alwaysOnTopChanged", (event, isAlwaysOnTop) => {
      callback(event, isAlwaysOnTop);
    });
  },
});
