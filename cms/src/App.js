import './App.css';
import React from 'react';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import { Paper } from '@mui/material';

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

    </div>
  );
}

export default App;
