import './App.css';
import React from 'react';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';

function App() {

  const handleSubmit = (contact) => {
    console.log(contact);
  };


  return (
    <div className="App">
      <ContactForm onSubmit={handleSubmit} />
      <SearchBar onSearch={(value) => console.log(value)} />
    </div>
  );
}

export default App;
