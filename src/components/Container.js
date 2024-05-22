import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import ChatMsgLeft from "./ChatMsgLeft";
import ChatMsgRight from "./ChatMsgRight";
// import Footer from "./Footer";

function Container() {

  const bgImage = "/assets/chat-bg.png";
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');


    console.log('useEffect called:', storedMessages )


    
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
    <Box
      sx={{
        width: 864,
        height: 378,
        backgroundImage: `url(${bgImage})`,
        border: 2,
        borderColor: "#dedfe1",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Header />
      {messages.map((message) => (
          message.isSent ? (
            <ChatMsgRight key={message.id}  user="John" time="12:58" message={message.message} />
          ) : (
            <ChatMsgLeft key={message.id} user="BOT" time="12:45" message={message.message} />
          )
      ))}
      <Box
      sx={{
        alignItems: "center",
        alignSelf: "end",
        bgcolor: "#F4F5F5",
        borderTop: 2,
        borderColor: "#dedfe1",
        color: "#434C4C",
        display: "flex",
        gap: 1,
        height: 62,
        padding: "0.5rem",
        width: "100%",
      }}
    >
      <TextField
        id="margin-none"
        placeholder="Enter your message..."
        variant="outlined"
        size="small"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
        sx={{
          bgcolor: "#dedfe1",
          borderColor: "#BDBDBD",
          borderRadius: 1,
          color: "#d4d9d9",
          width: "100%",
        }}
      />
      <Button variant="contained" color="success" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>

      
    </Box>
  );
}

export default Container;