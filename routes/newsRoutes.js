const express = require('express');
const { getNewsArticles } = require('../controllers/newsController');

const router = express.Router();

// Fetch filtered articles
router.get('/', getNewsArticles);

module.exports = router;


