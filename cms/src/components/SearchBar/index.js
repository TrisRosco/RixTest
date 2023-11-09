import React from "react";
import {
  TextField,
  FormControl,
} from "@mui/material";

const SearchBar = ({ onSearch }) => {

  // Handler for the search field change
  const handleSearchChange = (event) => {
    // Pass value up to parent 
    onSearch(event.target.value);
  };

  return (
    <FormControl fullWidth>

      <TextField
        fullWidth
        margin="dense"
        type="text"
        onChange={handleSearchChange}
        label="Search contacts..."
        variant="outlined"
      />
    </FormControl>
  );
};

export default SearchBar;
