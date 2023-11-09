import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(contact.id)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText
            primary={contact.name}
            secondary={
              "Email: " +
              contact.email +
              " Phone: " +
              contact.phone +
              " Address: " +
              contact.address
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
