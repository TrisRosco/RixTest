import React from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const ContactEdit = (isOpen, handleClose) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactEdit;
