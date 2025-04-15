const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const getGeminiResponse = async (message) => {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    const data = await res.json();

    if (data?.candidates?.length > 0) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      console.error('No response from Gemini:', data);
      return 'Sorry, Gemini did not return a valid response.';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Something went wrong with Gemini API.';
  }
};

module.exports = { getGeminiResponse };

