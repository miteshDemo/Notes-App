import { Grid, Typography, Box } from "@mui/material";
import Note from "./Note";
import AddNote from "./AddNote";

const NoteList = ({ notes, addNote, deleteNote, togglePin }) => {
  const pinnedNotes = notes.filter(n => n.pinned);
  const others = notes.filter(n => !n.pinned);

  return (
    <Box mt={3}>
      {/* Add Note Card */}
      <Box mb={4}>
        <AddNote addNote={addNote} />
      </Box>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📌 Pinned Notes
          </Typography>

          <Grid container spacing={3}>
            {pinnedNotes.map(n => (
              <Grid item xs={12} sm={6} md={4} key={n.id}>
                <Note {...n} deleteNote={deleteNote} togglePin={togglePin} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* All Notes */}
      {others.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            📝 All Notes
          </Typography>

          <Grid container spacing={3}>
            {others.map(n => (
              <Grid item xs={12} sm={6} md={4} key={n.id}>
                <Note {...n} deleteNote={deleteNote} togglePin={togglePin} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Empty State */}
      {notes.length === 0 && (
        <Box textAlign="center" mt={8}>
          <Typography variant="h6" color="text.secondary">
            No notes found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start by adding a new note above.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default NoteList;
