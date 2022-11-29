import React from 'react';
import './App.css';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Switch>
      <Footer />
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
    </Switch>
  );
}

export default App;
