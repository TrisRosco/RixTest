import "./App.css";
import React from "react";
import ContactForm from "./components/ContactForm";
import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";
import { Paper } from "@mui/material";

function App() {
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
        contacts={[
          {
            id: 1,
            name: "Test Name1",
            email: "Email@email.com",
          },
          {
            id: 2,
            name: "Test Name2",
            email: "Email@email.com",
          },
        ]}
        onDelete={(id) => console.log(id)}
      />
    </div>
  );
}

export default App;
