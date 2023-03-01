import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Recipes from './components/Recipes';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Profile from './components/Profile';
import RecipesProvider from './context/RecipesProvider';
import RecipeInProgress from './components/RecipeInProgress';
import RecipeDetails from './components/RecipeDetails';
import './CSS/Loading.css';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
