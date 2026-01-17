const Parser = require("rss-parser");
const he = require("he");

const parser = new Parser({
  timeout: 10000,
});

// In-memory storage for feeds
const feeds = new Map();

// Helper function to decode HTML entities in strings
function decodeHtmlEntities(text) {
  if (!text || typeof text !== 'string') return text;
  return he.decode(text);
}

function normalizeFeed(feed, url) {
  return {
    link: url,
    title: decodeHtmlEntities(feed.title),
    description: decodeHtmlEntities(feed.description),
    image: feed.itunes?.image || feed.image?.url,
    author: decodeHtmlEntities(feed.itunes?.author),
    episodes: feed.items.map(item => normalizeEpisode(item, feed)),
  };
}

function normalizeEpisode(item, feed) {
  return {
    episodeId: item.guid || item.id,
    feedUrl: feed.link,
    title: decodeHtmlEntities(item.title),
    description: decodeHtmlEntities(item.contentSnippet || item.content),
    audioUrl: item.enclosure?.url,
    duration: item.itunes?.duration,
    pubDate: new Date(item.pubDate),
  };
}

async function fetchFeed(url) {
  console.log(`Fetching feed: ${url}`);
  const feed = await parser.parseURL(url);
  return normalizeFeed(feed, url);
}

async function getFeedByUrl(url) {
  try {
    // Check if feed already exists by URL
    const existingFeeds = Array.from(feeds.values());
    const existing = existingFeeds.find(f => f.feedUrl === url);
    if (existing) {
      return existing;
    }
    
    const feed = await fetchFeed(url);
    feeds.set(feed.id, feed);
    return feed;
  } catch (error) {
    throw new Error(`Failed to add feed: ${error.message}`);
  }
}

function getAllFeeds() {
  return Array.from(feeds.values());
}

function getEpisodes(feedId) {
  const feed = feeds.get(feedId);
  if (!feed) {
    throw new Error(`Feed with id ${feedId} not found`);
  }
  return feed.episodes || [];
}

module.exports = {
  fetchFeed,
  getFeedByUrl,
  getAllFeeds,
  getEpisodes,
};