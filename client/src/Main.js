import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Restaurant from './components/Restaurant';
import MyProfile from './components/MyProfile';

// import Home from '../pages/Home';
// import Signup from '../pages/Signup';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Restaurant}></Route>
      <Route exact path='/MyProfile' component={MyProfile}></Route>
    </Switch>
  );
}

export default Main;