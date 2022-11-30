import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <Route path="/meals" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route path="/profile" render={ () => <Profile /> } />
    </Switch>
  );
}

export default App;
