import { Box, Typography } from "@mui/material";
import React from "react";
import ChatBubble from "@mui/icons-material/ChatBubble";
import SettingsIcon from "@mui/icons-material/Settings";

function Header() {
  return (
    <Box
      sx={{
        alignItems: "center",
        bgcolor: "#F4F5F5",
        borderBottom: 2,
        borderColor: "#dedfe1",
        color: "#434C4C",
        display: "flex",
        height: "2.5rem",
        justifyContent: "space-between",
        padding: "0.5rem",
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 1,
          width: "25%",
        }}
      >
        <ChatBubble fontSize="small" />
        <Typography>SimpleChat</Typography>
      </Box>
      <SettingsIcon fontSize="small" />
    </Box>
  );
}

export default Header;
