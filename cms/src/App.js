import "./App.css";
import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import ContactEdit from "./components/ContactEdit";
import { Container, Paper } from "@mui/material";
import { getContacts, addContact, deleteContact } from "./Models/queries";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [openState, setOpenState] = useState(false);

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

  const handleSubmit = (contact) => {
    addContact(contact);
    setContacts((prevContacts) => [...prevContacts, contact]); // update contacts usestate with new contact added
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, set filtered contacts to all contacts usestate
      setFilteredContacts(contacts);
    } else {
      // Otherwise, filter the contacts
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.postcode.toLowerCase().includes(searchTerm.toLowerCase())
        // Add city
        // contact.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const handleClose = () => {
    setOpenState(false);
  };

  const handleSave = () => {
    // PLACEHODER, will sort later
    console.log("Contact saved");
  };

  useEffect(() => {
    // necessary in order to display all contacts when search bar is empty
    handleSearch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const handleEdit = () => {
    setOpenState(true);
  };

  return (
    <Container maxWidth="sm" className="App">
    <Paper sx={{padding: 2, marginTop: 4}} elevation={3}>
      {/* <Paper elevation={3} className="container">
        <ContactForm onSubmit={handleSubmit} />
      </Paper> */}
      <SearchBar onSearch={handleSearch} />
      <ContactEdit
        isOpen={openState}
        onClose={handleClose}
        onSave={handleSave}
      />
      <ContactList
        contacts={filteredContacts}
        onDelete={(id) => deleteContact(id)}
        onEdit={handleEdit}
      />
      </Paper>
    </Container>
  );
}

export default App;
