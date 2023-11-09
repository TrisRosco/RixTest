import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const ContactForm = ({ onSubmit, initialData = {} }) => {
  const [contact, setContact] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    postcode: initialData.postcode || "",
  });
  const [errors, setErrors] = useState({}); // tracks errors for each field

  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        return value.length <= 50 ? "" : "Name cannot exceed 50 characters.";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Please enter a valid email.";
      case "phone":
        return /^\+?(\d{1,3})?\s?-?\d+$/.test(value)
          ? ""
          : "Please enter a valid phone number.";
      case "postcode":
        // regex for UK postcodes
        return /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(value.toUpperCase())
          ? ""
          : "Please enter a valid UK postcode.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value); // validate input
    setErrors({ ...errors, [name]: error }); // update errors
    setContact({ ...contact, [name]: value }); // update contact
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    // Validate all fields before submitting
    Object.keys(contact).forEach((key) => {
      const error = validateInput(key, contact[key]);
      if (error) {
        // if error exists, update errors and set isValid to false
        setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
        isValid = false;
      }
    });
    if (isValid) onSubmit(contact); // if no errors, submit contact
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
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
        label="Email"
        name="email"
        value={contact.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
        inputProps={{ maxLength: 255 }}
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        required
        inputProps={{ maxLength: 15 }}
      />
      <TextField
        label="Address"
        name="address"
        value={contact.address}
        onChange={handleChange}
        inputProps={{ maxLength: 50 }}
      />
      <TextField
        label="Postcode"
        name="postcode"
        value={contact.postcode}
        onChange={handleChange}
        error={!!errors.postcode}
        helperText={errors.postcode}
        required
        inputProps={{ maxLength: 7 }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: "16px" }}
      >
        Save Contact
      </Button>
    </form>
  );
};

export default ContactForm;
