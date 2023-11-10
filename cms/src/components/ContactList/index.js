import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import the edit icon

const ContactList = ({ contacts, onDelete, onEdit }) => {


  return (
    <List>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          secondaryAction={
            <>
              <Tooltip title="Edit Contact">
                <IconButton
                  aria-label="edit"
                  onClick={() => onEdit(contact)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove Contact">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(contact.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
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
                {"Address: " + contact.address + ", " + contact.city}
                <br />
                {"Postcode: " + contact.postcode}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;

