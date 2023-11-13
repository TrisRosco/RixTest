import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import ContactEdit from "./components/ContactEdit";
import {
  Container,
  Paper,
  Button,
  Snackbar,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
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

  // Fetch contacts on mount and set contacts usestate
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
      }
    };
    fetchContacts();
  }, []);

  // Handler for the search bar
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

  // Necessary in order to display all contacts when search bar is empty
  useEffect(() => {
    handleSearch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const handleNewClick = () => {
    setIsNewOpen(true);
  };

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
    setIsEditOpen(true);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setIsNewOpen(false);
    setSelectedContact(null);
  };

  // Function to add a new contact
  const handleSubmit = (contact) => {
    addContact(contact);
    setContacts((prevContacts) => [...prevContacts, contact]); // update contacts usestate with new contact added
    setIsNewOpen(false);
    setSnackbarMessage("Contact added successfully");
    setSnackbarOpen(true);
  };

  // Function to update an existing contact
  const handleUpdate = async (updatedContactDetails) => {
    setIsLoading(true); // Start loading

    if (!selectedContact || !selectedContact.id) {
      setSnackbarMessage("No contact selected for updating");
      setIsLoading(false); // Stop loading if no contact is selected
      return; // Early return to avoid further execution
    }

    try {
      // Await the async updateContact call
      const updatedContact = await updateContact(
        selectedContact.id,
        updatedContactDetails
      );

      if (!updatedContact || !updatedContact.id) {
        throw new Error("The updated contact is null or missing an id.");
      }
      // Update the contacts state with the new details
      setContacts(
        contacts.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      );
      setSnackbarMessage("Contact updated successfully");
    } catch (error) {
      setSnackbarMessage("Error updating contact");
    } finally {
      setIsLoading(false); // Stop loading whether success or error
      setSnackbarOpen(true);
      setIsEditOpen(false);
    }
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
        <Stack direction="row" spacing={2}>
          <SearchBar onSearch={handleSearch} />
          <Button
            variant="contained"
            onClick={handleNewClick}
            // justify and align center
            size="small"
            sx={{
              minWidth: "130px",
              maxHeight: "40px",
              transform: "translateY(15px)",
            }}
          >
            Add Contact
          </Button>
        </Stack>
        <Divider sx={{ marginTop: 1 }} />
        <ContactEdit
          isOpen={isEditOpen}
          onClose={handleClose}
          onSave={handleUpdate}
          initialData={selectedContact} // pass the selected contact to the edit form
          isLoading={isLoading} // Loading state for the planned loading indicator
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
                setSnackbarMessage("Error deleting contact");
                setSnackbarOpen(true);
              });
          }}
          onEdit={handleEditClick}
        />
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
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
