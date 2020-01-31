import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavBar';
import Restaurant from './components/Restaurant';

function App() {
  return (
    <div className="App">
      <h1> Kaki App for Majeed </h1>
      <AppNavbar />
      <Restaurant />
    </div>
  );
}

export default App;
