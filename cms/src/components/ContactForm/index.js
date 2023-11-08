import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const ContactForm = ({ onSubmit, initialData = {} }) => {
  const [contact, setContact] = useState("");

  const handleChange = (e) => {
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

      <Button variant="contained" color="primary" type="submit">
        Save Contact
      </Button>
    </form>
  );
};

export default ContactForm;
