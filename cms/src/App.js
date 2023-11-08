import './App.css';
import React from 'react';
import ContactForm from './components/ContactForm';

function App() {

  const handleSubmit = (contact) => {
    console.log(contact);
  };


  return (
    <div className="App">
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
