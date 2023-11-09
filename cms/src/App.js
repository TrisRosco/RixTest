import "./App.css";
import React, { useState, useEffect } from 'react';
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import { Paper } from "@mui/material";
import { getContacts } from "./Models/queries";

function App() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };

    fetchContacts();
  }, []); 


  const handleSubmit = (contact) => {
    console.log(contact);
  };

  return (
    <div className="App">
      <Paper elevation={3} className="container">
        <ContactForm onSubmit={handleSubmit} />
      </Paper>
      <SearchBar onSearch={(value) => console.log(value)} />
      <ContactList
        contacts={contacts}
        onDelete={(id) => console.log(id)}
      />
    </div>
  );
}

export default App;
