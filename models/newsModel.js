const db = require('../db/dbConnection');

const saveArticle = async (article) => {
  const { title, description, pubDate, sourceUrl, topics } = article;
  await db.execute(
    `INSERT INTO news (title, description, publication_date, source_url, topics)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, pubDate, sourceUrl, JSON.stringify(topics)]
  );
};

const getFilteredArticles = async (filters) => {
  const { keyword, startDate, endDate } = filters;
  let query = `SELECT * FROM news WHERE 1=1`;
  const params = [];

  if (keyword) {
    query += ` AND (title LIKE ? OR description LIKE ?)`;
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  if (startDate) {
    query += ` AND publication_date >= ?`;
    params.push(startDate);
  }

  if (endDate) {
    query += ` AND publication_date <= ?`;
    params.push(endDate);
  }

  const [rows] = await db.execute(query, params);
  return rows;
};

module.exports = { saveArticle, getFilteredArticles };
