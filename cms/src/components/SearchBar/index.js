import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SearchBar = ({ onSearch }) => {
  // usestate to track the selected field
  const [searchField, setSearchField] = useState("name");


  // Handler for the search field change
  const handleSearchChange = (event) => {
    // Pass both the field and value up
    onSearch(event.target.value, searchField);
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
