import { Grid, Box, Typography, Button } from "@mui/material";

const Trash = ({ trash, restoreNote, deleteForever }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        🗑 Trash Bin ({trash.length})
      </Typography>

      {trash.length === 0 && (
        <Typography>No deleted notes.</Typography>
      )}

      <Grid container spacing={3}>
        {trash.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography>{note.text}</Typography>
              <Typography variant="caption">{note.date}</Typography>

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => restoreNote(note.id)}
                >
                  Restore
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => deleteForever(note.id)}
                >
                  Delete Forever
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Trash;
