import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  RequestInitialDrinks,
  RequestInitialMeals } from '../services/RequestInitialRecipes';
import Footer from './Footer';
import Header from './Header';
import RecipesCard from './RecipesCard';

function Recipes() {
  const history = useHistory();
  const slug = history.location.pathname;
  const { initialRecipes, setInitialRecipes } = useContext(RecipesContext);

  useEffect(() => {
    if (slug === '/meals') {
      RequestInitialMeals()
        .then((result) => setInitialRecipes(result));
    }
    if (slug === '/drinks') {
      RequestInitialDrinks()
        .then((result) => setInitialRecipes(result));
    }
  }, [setInitialRecipes, slug]);

  return (
    <>
      <Header />
      {!initialRecipes.length > 0
        ? <h1>Carregando...</h1>
        : <RecipesCard /> }
      <Footer />
    </>

  );
}

export default Recipes;
