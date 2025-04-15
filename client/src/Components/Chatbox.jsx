import React, { useEffect, useState } from 'react';
import './ChatBox.css'; // Import the CSS file

const ChatBox = ({ matchData }) => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage(`${matchData} summarize as highlight point`);
  }, [matchData]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setReply('');

    try {
      const res = await fetch(`${window.location.origin}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      setReply('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      <h2 className="text-3xl font-semibold text-center text-white drop-shadow-md text-shadow-xl">
        JeetoTeamSe 🏏
      </h2>

      <textarea
        className="textarea"
        rows={3}
        placeholder="Ask a cricket-related question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className={`button ${loading ? 'bg-yellow-300' : 'bg-yellow-600 hover:bg-yellow-700'}`}
        onClick={sendMessage}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Click for team knowledge'}
      </button>

      {/* AI's reply section styled like a chat bubble */}
      {reply && (
        <div className="reply-box">
          <div className="arrow"></div>
          <strong className="text-xl font-bold">AI:</strong>
          <p className="mt-2">{reply}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
