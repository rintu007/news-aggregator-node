# News Aggregator

A news aggregation application that fetches the latest news articles, processes their descriptions, and extracts relevant topics using NLP techniques or API-based topic detection services such as OpenAI, Google Cloud, or AWS Comprehend. The project can be easily configured to switch between different topic extraction models through a simple configuration change.

## Features

- **News Aggregation**: Fetches the latest news articles from a MySQL database.
- **Topic Extraction**: Extracts relevant topics from news descriptions using various methods.
- **Flexible Topic Models**: Switch between NLP-based topic extraction and API-driven solutions (OpenAI, Google Cloud, AWS Comprehend) via configuration.
- **Scheduled Fetching**: Automatically fetches and processes news articles every 5 minutes using Cron jobs.
- **Database**: Stores and retrieves news articles from a MySQL database.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for handling HTTP requests.
- **MySQL**: Database for storing news articles.
- **Natural**: NLP library for basic topic extraction (Word Tokenization).
- **Axios**: HTTP client for API requests to OpenAI, Google Cloud, and AWS Comprehend.
- **Cron**: Job scheduler to automate tasks like fetching news every 5 minutes.
- **dotenv**: Loads environment variables for secure API key management.

## Installation

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 16 or higher)
- **MySQL** Database server running
- **Google Cloud** API Key (for Google Cloud NLP)
- **AWS** API credentials (for AWS Comprehend)
- **OpenAI** API Key

### Steps to Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/news-aggregator.git
   cd news-aggregator

   ```

2. Install the dependencies:

   ```bash
    npm install


   ```

3. Create a .env file in the root directory of the project with the following variables:

   ```bash
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    OPENAI_API_KEY=your-openai-api-key
    AWS_REGION=your-aws-region
    AWS_ACCESS_KEY_ID=your-aws-access-key-id
    AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
    GOOGLE_CLOUD_API_KEY=your-google-cloud-api-key


   ```

4. Run the application:

   ```bash
   npm start



   ```

5. The server should now be running on http://localhost:3000.

## Configuration

The application supports different topic extraction models. You can switch between them by changing the TOPIC_MODEL environment variable in the .env file.

### Available Models

simple: Basic keyword extraction using the Natural library.
openai: Uses OpenAI’s API to extract topics from text.
aws: Uses AWS Comprehend to detect key phrases.
google: Uses Google Cloud NLP to analyze entities and extract topics.

- **simple:** Basic keyword extraction using the Natural library.
- **openai:** Uses OpenAI’s API to extract topics from text.
- **aws:** Uses AWS Comprehend to detect key phrases.
- **google:** Uses Google Cloud NLP to analyze entities and extract topics.

  ```bash
  TOPIC_MODEL=openai
  ```

### Cron Job

The application is configured to run a cron job that fetches news every 5 minutes. This is defined in the following line of code:

    cron.schedule('*/5 * * * *', fetchAndStoreNews);

This ensures that your database is periodically updated with the latest news.

## API Endpoints

#### GET /news

Fetches the latest 10 news articles from the database and processes them to extract topics.

    [
    {
        "id": 1,
        "title": "Breaking News: Major Event Happens",
        "description": "A description of the major event that happened in the news today.",
        "publication_date": "2024-12-08T12:00:00Z",
        "source_url": "http://news.com/article1",
        "topics": ["breaking", "major event", "news"]
    },
    ...
    ]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Natural - for keyword extraction.
- OpenAI API - for advanced text analysis.
- AWS Comprehend - for NLP services.
- Google Cloud NLP - for entity recognition.
- Node Cron - for scheduling periodic tasks.

## Author: Rintu Kumar Chowdhury - rintuchy.cse@gmail.com
