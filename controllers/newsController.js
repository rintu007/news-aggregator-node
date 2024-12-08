const natural = require('natural');
const db = require('../db/dbConnection'); // Ensure this uses the promise-based pool

const extractTopics = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text.toLowerCase());

  const keywords = words.filter((word) => {
    return word.length > 3 && !['the', 'and', 'with', 'from', 'that', 'this'].includes(word);
  });

  return Array.from(new Set(keywords)); // Unique topics
};

// Fetch and process news articles from the database
const getNewsArticles = async (req, res) => {
  try {
    // Query the database to fetch news articles using async/await
    const query = 'SELECT * FROM news ORDER BY publication_date DESC LIMIT 10';
    const [results] = await db.query(query); // Use async/await to get results

    // Process the fetched articles and extract topics from their descriptions
    const newsArticles = results.map((article) => {
      const topics = extractTopics(article.description);
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        publication_date: article.publication_date,
        source_url: article.source_url,
        topics, // Extracted topics
      };
    });

    // Respond with the news articles and topics
    res.json(newsArticles);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching news articles');
  }
};

module.exports = { extractTopics, getNewsArticles };
