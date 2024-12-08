const natural = require('natural');
const axios = require('axios');
const { ComprehendClient, DetectKeyPhrasesCommand } = require('@aws-sdk/client-comprehend'); // Import specific client and command
const { google } = require('googleapis');

const TOPIC_MODEL = process.env.TOPIC_MODEL || 'simple'; // Default to simple
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_API_KEY;

const extractTopics = async (text) => {
  switch (TOPIC_MODEL) {
    case 'simple':
      return simpleKeywordExtraction(text);
    case 'openai':
      return openAITopicExtraction(text);
    case 'aws':
      return awsComprehendTopicDetection(text);
    case 'google':
      return googleTopicDetection(text);
    default:
      throw new Error('Unsupported TOPIC_MODEL');
  }
};

// Simple Keyword Extraction
const simpleKeywordExtraction = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text.toLowerCase());
  const keywords = words.filter(
    (word) => word.length > 3 && !['the', 'and', 'with', 'from', 'that', 'this'].includes(word)
  );
  return Array.from(new Set(keywords));
};

// OpenAI Topic Extraction
const openAITopicExtraction = async (text) => {
  const prompt = `Extract topics from the following text: "${text}"`;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt,
        max_tokens: 50,
      },
      {
        headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
      }
    );
    const topics = response.data.choices[0].text.trim().split(',').map((topic) => topic.trim());
    return topics;
  } catch (error) {
    console.error('OpenAI Topic Extraction Error:', error.message);
    throw error;
  }
};

// AWS Comprehend Topic Detection with AWS SDK v3
const awsComprehendTopicDetection = async (text) => {
  const comprehendClient = new ComprehendClient({ region: AWS_REGION }); // Initialize the Comprehend client

  try {
    const params = {
      TextList: [text], // Single text in an array, can process multiple texts if needed
      LanguageCode: 'en', // Language code for English
    };

    const command = new DetectKeyPhrasesCommand(params); // Create a command
    const response = await comprehendClient.send(command); // Send the command to the client

    // Extract key phrases from the response
    return response.KeyPhrases.map((phrase) => phrase.Text);
  } catch (error) {
    console.error('AWS Comprehend Topic Detection Error:', error.message);
    throw error;
  }
};

// Google Cloud Topic Detection
const googleTopicDetection = async (text) => {
  try {
    const language = google.language({
      version: 'v1',
      auth: GOOGLE_CLOUD_API_KEY,
    });
    const response = await language.documents.analyzeEntities({
      requestBody: {
        document: {
          type: 'PLAIN_TEXT',
          content: text,
        },
      },
    });
    return response.data.entities.map((entity) => entity.name);
  } catch (error) {
    console.error('Google Cloud Topic Detection Error:', error.message);
    throw error;
  }
};

module.exports = { extractTopics };
