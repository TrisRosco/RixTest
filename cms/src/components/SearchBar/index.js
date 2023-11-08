import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      label="Search contacts..."
      variant="outlined"
      fullWidth
      margin="normal"
    />
  );
};

export default SearchBar;