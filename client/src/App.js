import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavBar';
import Restaurant from './components/Restaurant';
import ItemModal from './components/RestaurantModel';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <h1> Kaki App for Majeed </h1>
      <AppNavbar />
      <Container>
        <ItemModal />
        <Restaurant />
      </Container>
    </div>
    </Provider>
  );
}

export default App;