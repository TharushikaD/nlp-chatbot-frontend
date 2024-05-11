import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage) return; // Prevent sending empty messages

    setMessages([...messages, { message: newMessage, isSent: true }]);
    setNewMessage('');

    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };

  return (
    <div className="container">
      <div className="chat-history">
        {messages.map((message) => (
          <div className={`chat-message ${message.isSent ? 'sent bg-primary text-white' : 'received bg-light'}`}>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
