import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

function App() {
  return (
    <Switch>
      <Footer />
      <Route
          exact
          path="/profile"
          render={ (props) => (<Profile { ...props } />) }
        />
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
    </Switch>
  );
}

export default App;
