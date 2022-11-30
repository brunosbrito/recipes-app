import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Recipes from './components/Recipes';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Profile from './components/Profile';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/meals/:id" />
        <Route path="/drinks/:id" />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>

    </RecipesProvider>

  );
}

export default App;
