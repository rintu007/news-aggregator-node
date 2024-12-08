CREATE DATABASE news_aggregator;

USE news_aggregator;

CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    publication_date DATETIME NOT NULL,
    source_url VARCHAR(255) NOT NULL,
    topics TEXT NOT NULL
);
