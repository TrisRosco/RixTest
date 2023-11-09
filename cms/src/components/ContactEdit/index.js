import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const ContactEdit = (open, handleClose) => {
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Edit Contact</DialogTitle>
    <textContent> test </textContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Save</Button>
    </DialogActions>
  </Dialog>;
};

export default ContactEdit;
