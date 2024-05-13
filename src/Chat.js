import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Row, Col, Form, Button } from 'react-bootstrap';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage) return; // Prevent sending empty messages

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/chat/' + newMessage);

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const responseData = await response.json();
      // Update state with both sent and received messages
      setMessages([
        ...messages,
        { id: Date.now(), message: newMessage, isSent: true }, // Sent message
        { id: Date.now() + 1, message: responseData.message, isSent: false }, // Received message
      ]);
      setNewMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }

    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };

  return (
    <div className="container">
      <ListGroup className="chat-history">
        {messages.map((message) => (
          <ListGroupItem
            key={message.id}
            className={`chat-message d-flex justify-content-${message.isSent ? 'end' : 'start'}`}
          >
            <span className={`message-bubble ${message.isSent ? 'bg-primary text-white' : 'bg-light'}`}>
              {message.message}
            </span>
          </ListGroupItem>
        ))}
        {isLoading && <div className="text-center">Sending message...</div>}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
      </ListGroup>
      <Form onSubmit={handleSendMessage}>
        <Row>
          <Col xs={10}>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Chat;
