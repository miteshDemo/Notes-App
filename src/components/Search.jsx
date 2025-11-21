import { TextField, Box, Paper } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const Search = ({ handleSearch }) => {
  return (
    <Box mb={4}>
      <Paper 
        elevation={0}
        sx={{
          background: 'transparent',
          position: 'relative'
        }}
      >
        <TextField
          fullWidth
          label="Search notes..."
          variant="outlined"
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon 
                sx={{ 
                  mr: 1, 
                  color: 'text.secondary',
                  fontSize: 20
                }} 
              />
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                '& fieldset': {
                  borderColor: 'primary.main',
                }
              },
              '&.Mui-focused': {
                '& fieldset': {
                  borderWidth: 2,
                }
              }
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.95rem'
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default Search;