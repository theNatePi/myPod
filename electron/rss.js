const Parser = require("rss-parser");

const parser = new Parser({
  timeout: 10000,
});

// In-memory storage for feeds
const feeds = new Map();

function normalizeFeed(feed, feedUrl) {
  return {
    id: feed.link || feedUrl,
    feedUrl: feedUrl, // Store the original URL for lookup
    title: feed.title,
    description: feed.description,
    image: feed.itunes?.image || feed.image?.url,
    author: feed.itunes?.author,
    link: feed.link,
    episodes: feed.items.map(item => normalizeEpisode(item, feed)),
  };
}

function normalizeEpisode(item, feed) {
  // Helper to get first non-undefined value
  const firstDefined = (...values) => values.find(v => v !== undefined);
  
  return {
    id: item.guid || item.id,
    title: item.title,
    description: item.contentSnippet || item.content,
    audioUrl: item.enclosure?.url,
    image: firstDefined(item.itunes?.image, item.image?.url, feed.itunes?.image, feed.image?.url),
    duration: item.itunes?.duration,
    pubDate: new Date(item.pubDate),
  };
}

async function fetchFeed(url) {
  console.log(`Fetching feed: ${url}`);
  const feed = await parser.parseURL(url);
  return normalizeFeed(feed, url);
}

async function addFeed(url) {
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
  addFeed,
  getAllFeeds,
  getEpisodes,
};