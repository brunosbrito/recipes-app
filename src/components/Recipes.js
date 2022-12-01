import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  RequestDrinksCategories,
  RequestMealsCategories } from '../services/RequestCategories';
import {
  RequestInitialDrinks,
  RequestInitialMeals } from '../services/RequestInitialRecipes';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import RecipesCard from './RecipesCard';

function Recipes() {
  const history = useHistory();
  const slug = history.location.pathname;
  const {
    initialRecipes,
    setInitialRecipes,
    categories,
    setCategories } = useContext(RecipesContext);

  useEffect(() => {
    if (slug === '/meals') {
      RequestInitialMeals()
        .then((result) => setInitialRecipes(result));
      RequestMealsCategories()
        .then((result) => setCategories(result));
    }
    if (slug === '/drinks') {
      RequestInitialDrinks()
        .then((result) => setInitialRecipes(result));
      RequestDrinksCategories()
        .then((result) => setCategories(result));
    }
  }, [setInitialRecipes, setCategories, slug]);

  return (
    <>
      <button type="button" onClick={ () => history.push('/teste') }>teste</button>
      <Header />
      {!categories.length > 0
        ? <h2>Carregando...</h2>
        : <Categories /> }
      {!initialRecipes.length > 0
        ? <h1>Carregando...</h1>
        : <RecipesCard /> }
      <Footer />
    </>

  );
}

export default Recipes;
