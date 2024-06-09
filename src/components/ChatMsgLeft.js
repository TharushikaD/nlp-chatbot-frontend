import { Avatar, Box, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';


function ChatMsgLeft(props) {

  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000); // Update every second

    // Cleanup function to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);



  return (
    <Box
      sx={{
        alignItems: "end",
        display: "flex",
        gap: 1,
        padding: 1,
        width: "50%",
      }}
    >
      <Avatar alt="Tharushika Dilmini" src="assets/online-support-icon.png" />
      <Box
        sx={{
          borderRadius: "10px 10px 10px 0",
          bgcolor: "#dedfe1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 1.5,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            alignItems: "center",
            display: "flex",
            fontWeight: 600,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {props.user}
          <Typography component={"span"} fontSize={"small"}>
            {currentTime}
          </Typography>
        </Typography>

        <Typography
          sx={{
            marginTop: 0.5,
          }}
        >
          {props.message}
        </Typography>
        {props.urls && props.urls.map((url) => (
          <Link href={url} underline="none" target="_blank" rel="noopener noreferrer">{url}</Link>
        ))}

      </Box>
    </Box>
  );
}

export default ChatMsgLeft;
