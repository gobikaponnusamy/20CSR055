import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import custom CSS for styling

const App = () => {
  const [urls, setUrls] = useState('');
  const [numbers, setNumbers] = useState([]);

  const handleFetchNumbers = async () => {
    try {
      const urlArray = urls.split(',').map((url) => url.trim());
      const responses = await Promise.all(
        urlArray.map((url) => axios.get(url, { timeout: 500 }))
      );

      const mergedNumbers = responses.flatMap((response) => response.data.numbers);
      const uniqueNumbers = [...new Set(mergedNumbers)].sort((a, b) => a - b);

      setNumbers(uniqueNumbers);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1>AFFORDMD</h1>
      <div>
        <input
          type="text"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter URLs separated by commas"
        />
        <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      </div>
      {numbers.length > 0 && (
        <div>
          <h2>Result</h2>
          <ul>
            {numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
