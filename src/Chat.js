import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Box, Divider, IconButton, InputBase, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    <Box p={3}>
      <Stack spacing={3}>
        {messages.map((message) => (
          <Item
            key={message.id}
            className={`chat-message d-flex justify-content-${message.isSent ? 'end' : 'start'}`}
          >
            <span className={`message-bubble ${message.isSent ? 'bg-primary text-white' : 'bg-light'}`}>
              {message.message}
            </span>
          </Item>
        ))}
      </Stack>

      {isLoading && <div className="text-center">Sending message...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'Type your message...' }}
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box >
  );
};

export default Chat;
