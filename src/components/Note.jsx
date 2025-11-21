import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { PushPin, PushPinOutlined, Delete } from "@mui/icons-material";

const Note = ({ id, text, date, pinned, deleteNote, togglePin }) => {
  return (
    <Card
      sx={{
        background: pinned
          ? "linear-gradient(135deg, #fff6a0, #ffe780)"
          : "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
        transition: "0.25s",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-wrap",
            mb: 2,
            fontSize: "0.95rem",
            lineHeight: 1.5,
          }}
        >
          {text}
        </Typography>

        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderTop: "1px solid #ddd", pt: 1 }}
        >

          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={() => togglePin(id)}>
              {pinned ? <PushPin /> : <PushPinOutlined />}
            </IconButton>

            <IconButton
              size="small"
              color="error"
              onClick={() => deleteNote(id)}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Note;
