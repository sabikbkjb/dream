const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { getGeminiResponse } = require('./openai.js');

// Get the latest Dream11 prediction link from Cricgram
async function getLatestPredictionLink() {
  const baseUrl = 'https://www.cricgram.com/';
  const { data } = await axios.get(baseUrl);
  const $ = cheerio.load(data);

  const latestLink = $('a[href*="dream11-prediction"]')
    .first()
    .attr('href');

  console.log("latest link:", latestLink);

  return latestLink ? new URL(latestLink, baseUrl).href : null;
}

// Route: Chat with Gemini (OpenAI alternative)
router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const cleanedMessage = message?.trim();

  if (!cleanedMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const reply = await getGeminiResponse(cleanedMessage);
    console.log(reply);
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI error.' });
  }
});

// Scrape Dream11 prediction details from the latest post
async function getPredictionDetails(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Grab the full article text
    const content = $('div.entry-content').text();
    return content.trim();
  } catch (error) {
    console.error('Cheerio scraping error:', error.message);
    return 'Failed to extract content';
  }
}

router.get('/api/dream11/scrape', async (req, res) => {
  try {
    const latestLink = await getLatestPredictionLink();
    if (!latestLink) {
      return res.status(404).json({ error: 'No latest prediction found' });
    }

    const predictionDetails = await getPredictionDetails(latestLink);
    console.log(predictionDetails)
    res.json({ prediction: predictionDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape prediction details' });
  }
});

// Scrape prediction-related images from the latest post
router.get('/api/images', async (req, res) => {
  try {
    const latestLink = await getLatestPredictionLink();
    if (!latestLink) {
      return res.status(404).json({ error: 'No latest prediction found' });
    }

    const { data } = await axios.get(latestLink);
    const $ = cheerio.load(data);

    const imageLinks = [];

    $('img').each((i, el) => {
      const src = $(el).attr('src');
      const dataLazy = $(el).attr('data-lazy-src');
      const decoding = $(el).attr('decoding');
      const height = $(el).attr('height');

      const validUrl = src?.includes('rocketcdn.me/wp-content/uploads') ? src
                      : dataLazy?.includes('rocketcdn.me/wp-content/uploads') ? dataLazy
                      : null;

      if (validUrl && decoding === 'async' && height === '1024') {
        imageLinks.push(validUrl);
      }
    });

    console.log('Image Links:', imageLinks);
    res.json({ images: imageLinks });
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'Failed to scrape images' });
  }
});

module.exports = router;
