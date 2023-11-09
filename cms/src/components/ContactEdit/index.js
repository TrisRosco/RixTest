import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from "@mui/material";

const ContactEdit = (isOpen) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          name="email"
        />
        <TextField
          margin="dense"
          label="Phone"
          type="tel"
          fullWidth
          variant="outlined"
          name="phone"
        />
        <TextField
          margin="dense"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          name="address"
        />
        <TextField
          margin="dense"
          label="Postcode"
          type="text"
          fullWidth
          variant="outlined"
          name="postcode"
        />
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactEdit;
