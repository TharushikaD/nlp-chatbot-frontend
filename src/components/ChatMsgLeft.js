import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function ChatMsgLeft(props) {
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
      <Avatar />

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
            {props.time}
          </Typography>
        </Typography>

        <Typography
          sx={{
            marginTop: 0.5,
          }}
        >
          {props.message}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatMsgLeft;
