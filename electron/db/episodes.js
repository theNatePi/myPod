const { getDB } = require("./index");

function listEpisodes(feedUrl) {
  const db = getDB();
  return db.prepare("SELECT * FROM episodes WHERE feed_url = ? ORDER BY pub_date DESC").all(feedUrl);
}

function updateEpisodeProgress(episodeId, progress) {
  const db = getDB();
  return db.prepare("UPDATE episodes SET progress = ? WHERE id = ?").run(progress, episodeId);
}

module.exports = {
  listEpisodes,
  updateEpisodeProgress,
};
