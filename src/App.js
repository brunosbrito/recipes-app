import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/profile"
          render={ (props) => (<Profile { ...props } />) }
        />
        <Route
          exact
          path="/"
          render={ (props) => (<Login { ...props } />) }
        />
      </Switch>
    </div>
  );
}
//

export default App;
