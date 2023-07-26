const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(express.json());
app.use(cors()); // Use the cors middleware

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid URLs' });
  }

  const promises = urls.map(async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      return response.data.numbers || [];
    } catch (error) {
      console.error(error.message);
      return [];
    }
  });

  try {
    const responses = await Promise.all(promises);
    const uniqueNumbers = [...new Set(responses.flat())].sort((a, b) => a - b);
    return res.json({ Numbers: uniqueNumbers });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 8008;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
