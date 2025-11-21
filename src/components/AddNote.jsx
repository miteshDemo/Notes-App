import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Add, Notes } from "@mui/icons-material";

const AddNote = ({ addNote }) => {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (text.trim().length > 0) {
      addNote(text);
      setText("");
    }
  };

  return (
    <Card
      sx={{
        p: 1,
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.25)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: 5,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Notes sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" fontWeight={600}>
            Create Note
          </Typography>
        </Box>

        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Write something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          startIcon={<Add />}
          disabled={!text.trim()}
          sx={{
            textTransform: "none",
            borderRadius: 3,
            py: 1,
            fontWeight: 600,
          }}
        >
          Add Note
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddNote;
