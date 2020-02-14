import React, { Component } from 'react';
import AppNavbar from './components/AppNavBar';
import Restaurant from './components/Restaurant';
import ItemModal from './components/RestaurantModel';
import { Container } from 'reactstrap';
import {BrowserRouter as Router} from "react-router-dom"
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyProfile from './components/MyProfile';
import Main from './Main'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
        <AppNavbar />
        <Main />
        </div>
      </Provider>
    );
  }
}

export default App;