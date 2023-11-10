import "./App.css";
import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import ContactEdit from "./components/ContactEdit";
import { Container, Paper, Button, Snackbar, Alert } from "@mui/material";
import {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./Models/queries";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, set filtered contacts to all contacts usestate
      setFilteredContacts(contacts);
    } else {
      // Otherwise, filter the contacts
      const filtered = contacts.filter(
        (contact) =>
          (contact.name?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (contact.email?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (contact.phone?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (contact.address?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (contact.postcode?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (contact.city?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  useEffect(() => {
    // necessary in order to display all contacts when search bar is empty
    handleSearch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const handleClose = () => {
    setIsEditOpen(false);
    setIsNewOpen(false);
    setSelectedContact(null);
  };

  const handleSubmit = (contact) => {
    addContact(contact);
    setContacts((prevContacts) => [...prevContacts, contact]); // update contacts usestate with new contact added
    setIsNewOpen(false);
    setSnackbarMessage("Contact added successfully");
    setSnackbarOpen(true);
  };

  const handleUpdate = async (updatedContactDetails) => {
    setIsLoading(true); // Start loading
    if (selectedContact && selectedContact.id) {
      try {
        // Await the async updateContact call
        const updatedContact = await updateContact(
          selectedContact.id,
          updatedContactDetails
        );
        // Update the contacts state with the new details
        setContacts(
          contacts.map((contact) =>
            contact.id === updatedContact.id ? updatedContact : contact
          )
        );
        // Set success message and stop loading
        setSnackbarMessage("Contact updated successfully");
        setSnackbarOpen(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating contact:", error);
        setSnackbarMessage("Error updating contact");
        setSnackbarOpen(true);
        setIsLoading(false); // Stop loading in case of error
      }
    } else {
      console.error("No contact selected for updating.");
      setSnackbarMessage("No contact selected for updating");
      setSnackbarOpen(true);
      setIsLoading(false); // Stop loading if no contact is selected
    }
    setIsEditOpen(false);
    //TODO: This is jank 
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === selectedContact.id ? updatedContactDetails : contact
      )
    );
    setSelectedContact(null);
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setIsEditOpen(true);
  };

  const handleNewClick = () => {
    setIsNewOpen(true);
  };

  return (
    <Container maxWidth="sm" className="App">
      <Paper sx={{ padding: 2, marginTop: 4 }} elevation={3}>
        <ContactForm
          isOpen={isNewOpen}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isLoading={isLoading}
        />

        <SearchBar onSearch={handleSearch} />
        <Button variant="contained" onClick={handleNewClick}>
          Add Contact
        </Button>
        <ContactEdit
          isOpen={isEditOpen}
          onClose={handleClose}
          onSave={handleUpdate}
          initialData={selectedContact} // pass the selected contact to the edit form
          isLoading={isLoading}
        />
        <ContactList
          contacts={filteredContacts}
          onDelete={(id) => {
            deleteContact(id)
              .then(() => {
                setContacts(contacts.filter((contact) => contact.id !== id));
                setSnackbarMessage("Contact deleted successfully");
                setSnackbarOpen(true);
              })
              .catch((error) => {
                console.error("Error deleting contact:", error);
                setSnackbarMessage("Error deleting contact");
                setSnackbarOpen(true);
              });
          }}
          onEdit={handleEditClick}
        />
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
