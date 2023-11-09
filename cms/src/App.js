import "./App.css";
import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import ContactEdit from "./components/ContactEdit";
import { Paper } from "@mui/material";
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

  const handleSearch = (searchTerm, searchField) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, set filtered contacts to all contacts usestate
      setFilteredContacts(contacts);
    } else {
      // Otherwise, filter the contacts
      const filtered = contacts.filter((contact) =>
        contact[searchField].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
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
    <div className="App">
      <Paper elevation={3} className="container">
        <ContactForm onSubmit={handleSubmit} />
      </Paper>
      <SearchBar onSearch={handleSearch} />
      <ContactEdit isOpen={openState} handleClose={() => setOpenState(false)} onClick={() => setOpenState(false)} />
      <ContactList
        contacts={filteredContacts}
        onDelete={(id) => deleteContact(id)}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
