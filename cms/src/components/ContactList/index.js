import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          secondaryAction={
            <Tooltip title="Remove Contact">
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(contact.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        >
          <ListItemText
            primary={contact.name}
            secondary={
              <>
                {"Email: " + contact.email}
                <br />
                {"Phone: " + contact.phone}
                <br />
                {"Address: " + contact.address}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
