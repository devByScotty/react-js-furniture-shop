import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchBar;
