import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import ChatMsgLeft from "./ChatMsgLeft";
import ChatMsgRight from "./ChatMsgRight";
// import Footer from "./Footer";

function Container() {

  const bgImage = "/assets/chat-bg.jpg";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesRef = useRef(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 100);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage) return; // Prevent sending empty messages

    setIsLoading(true);
    setError(null);

    setMessages([
      ...messages,
      { id: Date.now(), message: newMessage, isSent: true }
    ]);
    setNewMessage('');


    try {
      const response = await fetch('http://localhost:8000/chat/' + newMessage);

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const responseData = await response.json();

      setMessages([
        ...messages,
        { id: Date.now(), message: newMessage, isSent: true },
        { id: Date.now() + 1, message: responseData.response_text, urls: responseData.response_links, isSent: false }
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }

    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };

  const submitByEnter = (e, callback) => {
    if (e.key === 'Enter') {
      callback(e);
    }
  }

  return (
    <Box
      sx={{
        width: 864,
        height: "90vh",
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

      <Box
        sx={{
          height: "calc(90vh - 120px)",
          overflowY: "auto",
          scrollBehavior: "smooth",
          width: "inherit",
        }}
        ref={messagesRef}
      >
        {messages.map((message) => (
          message.isSent ? (
            <ChatMsgRight key={message.id} user="You" time="12:58" message={message.message} />
          ) : (
            <ChatMsgLeft key={message.id} user="Assistant" time="12:45" message={message.message} urls={message.urls} />
          )
        ))}
      </Box>


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
          onKeyDown={(e) => { submitByEnter(e, handleSendMessage) }}
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
