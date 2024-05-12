import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Track API call state
    const [error, setError] = useState(null); // Store any errors

    useEffect(() => {
        const storedMessages = localStorage.getItem('chatHistory');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();


        if (!newMessage) return; // Prevent sending empty messages

        setIsLoading(true); // Indicate loading state
        setError(null); // Clear any previous errors

        try {
            const response = await fetch('http://localhost:8000/chat/' + newMessage);

            if (!response.ok) {
                throw new Error('Failed to send message'); // Throw error for non-200 responses
            }

            console.log('fetch api call');

            const responseData = await response.json();
            console.log('handleSendMessage 1: ', messages.length);
            setMessages([...messages,]);
            console.log('handleSendMessage 2: ', messages.length);
            setMessages([
                ...messages,
                { id: Date.now(), message: newMessage, isSent: true },
                { id: Date.now() + 1, message: responseData.message, isSent: false }
            ]);
            console.log('handleSendMessage 3: ', messages.length);
            console.log('messages: ', messages);
            setNewMessage('');
        } catch (err) {
            setError(err.message); // Set error message for display
        } finally {
            setIsLoading(false); // Reset loading state regardless of success or failure
        }

        localStorage.setItem('chatHistory', JSON.stringify(messages));
    };

    return (
        <div className="container">
            <div className="chat-history">
                {messages.map((message) => (
                    <div key={message.id} className={`chat-message ${message.isSent ? 'sent bg-primary text-white' : 'received bg-info'}`}>
                        {message.message}
                    </div>
                ))}
                {isLoading && <div>Sending message...</div>} {/* Display loading message */}
                {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Display error message */}
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
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'} {/* Disable button while sending */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
