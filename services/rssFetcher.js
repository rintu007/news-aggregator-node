const Parser = require('rss-parser');
const { saveArticle } = require('../models/newsModel');
const { extractTopics } = require('./topicExtractor');
const config = require('../config.json');

const rssFeeds = process.env.RSS_FEEDS
  ? process.env.RSS_FEEDS.split(',')
  : config.rssFeeds;

const fetchAndStoreNews = async () => {
  const parser = new Parser();
  console.log(rssFeeds);

  for (const url of rssFeeds) {
    console.log(url);
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items) {
        const topics = await extractTopics(item.title + ' ' + item.contentSnippet);
        console.log(topics);
        const article = {
          title: item.title,
          description: item.contentSnippet,
          pubDate: new Date(item.pubDate),
          sourceUrl: item.link,
          topics,
        };
        await saveArticle(article);
      }
    } catch (error) {
      console.error(`Error fetching RSS feed from ${url}:`, error.message);
    }
  }
};

module.exports = { fetchAndStoreNews };
