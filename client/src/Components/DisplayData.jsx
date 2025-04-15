import React, { useState, useEffect } from 'react';
import ChatBox from './Chatbox';

// import React, { useState, useEffect } from 'react';

const DisplayData = ({ matchData }) => {
  const [scrapedData, setScrapedData] = useState('');

  useEffect(() => {
    // Assuming matchData is passed as prop, use it directly or perform scraping based on it
    if (matchData) {
      setScrapedData(matchData);
    } else {
      const data = "<h1>LSG vs CHE</h1><p>Some details about the match...</p>";
      setScrapedData(data);
    }
  }, [matchData]);

  if (!scrapedData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <div dangerouslySetInnerHTML={{ __html: scrapedData }} /> */}
      {/* <ChatBox matchData={/> */}
    </div>
  );
};

export default DisplayData;
