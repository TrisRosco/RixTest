import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from "@mui/material";

const ContactEdit = ({ isOpen, onClose, onSave, initialData = {} }) => {

  // set initial state of contact to the initial data passed in or empty string
  const [contact, setContact] = useState({
    name: initialData ? initialData.name : "",
    email: initialData ? initialData.email : "",
    phone: initialData ? initialData.phone : "",
    address: initialData ? initialData.address : "",
    postcode: initialData ? initialData.postcode : "",
    city: initialData ? initialData.city : "",
  });
  const [errors, setErrors] = useState({}); // tracks errors for each field

  // useEffect to update contact state when initial data changes
  useEffect(() => {
    if (initialData) {
      setContact({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        postcode: initialData.postcode || "",
        city: initialData.city || "",
      });
    }
  }, [initialData]);

  // validate inputs on a case by case basis
  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        // this is never triggered because of maxLength
        return value.length <= 50 ? "" : "Name cannot exceed 50 characters.";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Please enter a valid email.";
      case "phone":
        return /^\+?(\d{1,3})?\s?-?\d+$/.test(value)
          ? ""
          : "Please enter a valid phone number.";
      case "postcode":
        // regex for UK postcodes
        // this is sourced from the wikipedia page for UK postcodes account for special cases
        return /^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/.test(
          value.toUpperCase()
        )
          ? ""
          : "Please enter a valid UK postcode.";
      default:
        return "";
    }
  };

  // format postcode to uppercase and add space before last 3 characters if not already there
  const formatPostcode = (value) => {
    const formatted = value.toUpperCase();
    if (formatted.length > 3 && formatted[formatted.length - 4] !== " ") {
      return formatted.slice(0, -3) + " " + formatted.slice(-3);
    }
    return formatted;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value); // validate input
    setErrors({ ...errors, [name]: error }); // update errors
    setContact({ ...contact, [name]: value }); // update contact
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Updating Contact</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          fullWidth
          label="Name"
          name="name"
          value={contact.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          required
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          type="email"
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Phone Number"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          required
          type="tel"
          inputProps={{ maxLength: 15 }}
        />
        <TextField
          margin="dense"
          fullWidth
          label="City"
          name="city"
          value={contact.city}
          onChange={handleChange}
          required
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Address"
          name="address"
          value={contact.address}
          onChange={handleChange}
          required
          inputProps={{ maxLength: 255 }}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Postcode"
          name="postcode"
          value={contact.postcode}
          onChange={handleChange}
          error={!!errors.postcode}
          helperText={errors.postcode}
          required
          inputProps={{ maxLength: 8 }}
          onBlur={(e) => {
            // Format the postcode
            const formattedPostcode = formatPostcode(e.target.value);
            setContact({ ...contact, postcode: formattedPostcode });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          type="submit"
          style={{ marginTop: "16px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSave(contact)}
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "16px" }}
        >
          Update Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactEdit;
