import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const ContactForm = ({ onSubmit, initialData = {} }) => {
  // onSubmit is passed in as a prop from App.js
  // Initialize contact as an object with properties for name, email, and phone.
  const [contact, setContact] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
  });

  const handleChange = (e) => {
    // Update the contact state with the new value for the changed field.
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(contact);
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={contact.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={contact.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        required
      />
      <TextField
        label="Address"
        name="address"
        value={contact.address}
        onChange={handleChange}
        required
      />
      <TextField
        label="Postcode"
        name="postcode"
        value={contact.postcode}
        onChange={handleChange}
        required
      />

      <Button variant="contained" color="primary" type="submit">
        Save Contact
      </Button>
    </form>
  );
};

export default ContactForm;
