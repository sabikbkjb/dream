import React, { useEffect, useState, Suspense } from 'react';
import DisplayData from './DisplayData';
import ChatBox from './Chatbox';
import Image from './Image'; // If you lazy load, change it below
import AdSense from './AdSense';

const Dream = () => {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount

    const fetchDetails = async () => {
      try {
        const res = await fetch(`${window.location.origin}/api/dream11/scrape`);
        const result = await res.json();

        if (!result || typeof result !== 'object') {
          throw new Error('Invalid data received');
        }

        setMatchData(result.prediction || result);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch:', err);
        setError('Failed to fetch match insights.');
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-lg text-gray-700 font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100 text-red-700 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto bg-white rounded-2xl shadow-md">
      {/* Top Ad */}
      <div className="my-6 flex justify-center">
        <AdSense />
      </div>

      <h1
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        style={{
          color: '#4c51bf',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        Dream11 Match Insights
      </h1>

      {/* Main Content Layout */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Left Side (ChatBox) */}
        <div
          className="w-full md:w-2/3 bg-gray-50 p-4 rounded-xl shadow-sm"
          style={{
            backgroundColor: '#f9fafb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <ChatBox matchData={matchData} />
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/3 flex items-center justify-center px-2">
          <div
            className="w-full bg-white p-4 rounded-xl border shadow-sm"
            style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* If you lazy load Image:
            <Suspense fallback={<div>Loading Image...</div>}>
              <Image />
            </Suspense>
            */}
            <Image />
          </div>
        </div>
      </div>

      {/* Mid Ad */}
      <div className="my-6 flex justify-center">
        <AdSense />
      </div>

      {/* Bottom Ad */}
      <div className="my-6 flex justify-center">
        <AdSense />
      </div>
    </div>
  );
};

export default Dream;
