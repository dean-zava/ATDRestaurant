import React, { Component } from 'react';
import AppNavbar from './components/AppNavBar';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './Main';

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