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

  // Handler for the select field change
  const handleFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  // Handler for the search field change
  const handleSearchChange = (event) => {
    // Pass both the field and value up
    onSearch(event.target.value, searchField);
  };

  return (
      <FormControl>
        <InputLabel id="search-field-label">Search By</InputLabel>
        <Select
          labelId="search-field-label"
          value={searchField}
          label="Search By"
          onChange={handleFieldChange}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="address">Address</MenuItem>
          <MenuItem value="postcode">Postcode</MenuItem>
          <MenuItem value="phone">Number</MenuItem>
        </Select>

        <TextField
          type="text"
          onChange={handleSearchChange}
          label="Search contacts..."
          variant="outlined"
        />
      </FormControl>
  );
};

export default SearchBar;
