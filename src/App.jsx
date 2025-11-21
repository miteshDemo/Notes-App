import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  CssBaseline,
  ThemeProvider,
  Fab,
  Snackbar,
  Alert,
  createTheme,
  Button,
  Zoom
} from "@mui/material";
import { LightMode, DarkMode, NoteAdd, Notes, Delete } from "@mui/icons-material";

import NoteList from "./components/NoteList";
import Trash from "./components/Trash";
import Search from "./components/Search";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const [trash, setTrash] = useState(
    JSON.parse(localStorage.getItem("trash")) || []
  );

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showTrash, setShowTrash] = useState(false);

  // ------------------------------
  // 🎉 Notification State
  // ------------------------------
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ open: true, message, type });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // ------------------------------
  // 🎨 Theme
  // ------------------------------
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#0e0f11" : "#f2f6fc",
        paper: darkMode ? "#1a1c1f" : "#ffffff",
      },
      primary: { main: "#5b7bfa" },
      secondary: { main: "#5b7bfa" },
    },
    typography: { fontFamily: "Inter, Roboto, sans-serif" },
    shape: { borderRadius: 16 },
  });

  // ------------------------------
  // 💾 Save Both Notes & Trash
  // ------------------------------
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("trash", JSON.stringify(trash));
  }, [trash]);

  // ------------------------------
  // ➕ Add Note
  // ------------------------------
  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    showNotification("Note Created!", "success");
  };

  // ------------------------------
  // 🗑 Move To Trash
  // ------------------------------
  const moveToTrash = (id) => {
    const noteToTrash = notes.find((n) => n.id === id);
    setTrash([noteToTrash, ...trash]);
    setNotes(notes.filter((n) => n.id !== id));

    showNotification("Moved to Trash", "error");
  };

  // ------------------------------
  // ♻ Restore Note
  // ------------------------------
  const restoreNote = (id) => {
    const restored = trash.find((n) => n.id === id);
    setNotes([restored, ...notes]);
    setTrash(trash.filter((n) => n.id !== id));

    showNotification("Note Restored!", "success");
  };

  // ------------------------------
  // ❌ Permanent Delete
  // ------------------------------
  const deleteForever = (id) => {
    setTrash(trash.filter((n) => n.id !== id));
    showNotification("Deleted Forever", "error");
  };

  // ------------------------------
  // 📌 Pin / Unpin
  // ------------------------------
  const togglePin = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          background: darkMode ? "rgba(30,30,30,0.55)" : "blue",
        }}
      >
        <Toolbar>
          <Notes sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            My Notes
          </Typography>

          {/* Trash Toggle Button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 2 }}
            onClick={() => setShowTrash(!showTrash)}
            startIcon={<Delete />}
          >
            {showTrash ? "Back to Notes" : "Trash"}
          </Button>

          {/* Dark Mode */}
          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        {!showTrash && (
          <>
            <Search handleSearch={setSearchText} />
            <NoteList
              notes={notes.filter((n) =>
                n.text.toLowerCase().includes(searchText.toLowerCase())
              )}
              addNote={addNote}
              deleteNote={moveToTrash}
              togglePin={togglePin}
              searchText={searchText}
            />
          </>
        )}

        {showTrash && (
          <Trash
            trash={trash}
            restoreNote={restoreNote}
            deleteForever={deleteForever}
          />
        )}
      </Container>

      {/* Floating Add Button */}
      {!showTrash && (
        <Zoom in>
          <Fab
            color="primary"
            sx={{
              position: "fixed",
              bottom: 26,
              right: 26,
              zIndex: 999,
            }}
          >
            <NoteAdd />
          </Fab>
        </Zoom>
      )}

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
