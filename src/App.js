import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Footer />
      </Switch>
    </BrowserRouter>
  );
}
//

export default App;
