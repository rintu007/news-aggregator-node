const express = require('express');
const cron = require('node-cron');
const newsRoutes = require('./routes/newsRoutes');
const { fetchAndStoreNews } = require('./services/rssFetcher');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);

// Schedule periodic news fetching every 6 hours
cron.schedule('*/5 * * * *', fetchAndStoreNews);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
