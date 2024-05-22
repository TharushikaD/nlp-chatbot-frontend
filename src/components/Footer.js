import { Box, Button, TextField } from "@mui/material";
import React from "react";

function Footer() {

  return (
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
        sx={{
          bgcolor: "#dedfe1",
          borderColor: "#BDBDBD",
          borderRadius: 1,
          color: "#d4d9d9",
          width: "100%",
        }}
      />
      <Button
        variant="contained"
        color="success"
      >
        Send
      </Button>
    </Box>
  );
}

export default Footer;
