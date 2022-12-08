import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import {
  RequestInitialDrinks,
  RequestInitialMeals } from '../services/RequestInitialRecipes';
import { RequestDrinkId, RequestMealsId } from '../services/RequestRecipesDetails';
import Recomendations from './Recomendations';
import '../CSS/RecipeDetails.css';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [dataMealsArray, setDataMealsArray] = useState([]);
  const [dataDrinkArray, setDataDrinkArray] = useState([]);
  const [btnCopy, setBtnCopy] = useState(false);
  const [heart, setHeart] = useState(false);
  const { setRecomendations } = useContext(RecipesContext);
  const url = history.location.pathname;

  const saveFavorites = (recipe) => {
    const obj = {
      id: recipe.idMeal || recipe.idDrink,
      type: url.includes('meals') ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };
    const favoritesLocal = (JSON.parse(localStorage.getItem('favoriteRecipes')));
    console.log(favoritesLocal);
    const newfavoritesLocal = favoritesLocal === null
      ? [obj] : [...favoritesLocal, obj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoritesLocal));
  };

  const requestDrink = async () => {
    const dataDrink = await RequestDrinkId(id);
    return setDataDrinkArray(dataDrink);
  };

  const requestMeals = async () => {
    const dataMeals = await RequestMealsId(id);
    return setDataMealsArray(dataMeals);
  };

  function checkPathname() {
    if (history.location.pathname === `/meals/${id}`) {
      return dataMealsArray;
    }
    return dataDrinkArray;
  }

  const arrayIngredients = () => {
    const ingredients = checkPathname().map((el) => Object.entries(el)
      .filter((entry) => entry[0]
        .includes('strIngredient') && entry[1] !== '' && entry[1] !== null))
      .map((arr) => arr.map((el) => el[1]))
      .flat();

    const measures = checkPathname().map((el) => Object.entries(el)
      .filter((entry) => entry[0]
        .includes('strMeasure') && entry[1] !== ' ' && entry[1] !== null))
      .map((arr) => arr.map((el) => el[1]))
      .flat();

    const objInstructions = {};
    ingredients.forEach((element, index) => {
      objInstructions[element] = measures[index];
    });

    const arrayInstructions = Object.entries(objInstructions);

    return arrayInstructions;
  };

  function getRecomendations() {
    if (history.location.pathname === `/meals/${id}`) {
      RequestInitialDrinks()
        .then((result) => setRecomendations(result));
    } else {
      RequestInitialMeals()
        .then((result) => setRecomendations(result));
    }
  }

  console.log(checkPathname());

  const startRecipe = () => {
    history.push(`${url}/in-progress`);
  };

  useEffect(() => {
    getRecomendations();
  }, [id]);

  useEffect(() => {
    checkPathname();
    requestMeals();
    requestDrink();
  }, []);

  const btnStart = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe"
      onClick={ startRecipe }
    >
      Start Recipe
    </button>
  );
  const btnContinue = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe"
      onClick={ startRecipe }
    >
      Continue Recipe
    </button>
  );

  const complete = (JSON.parse(localStorage.getItem('doneRecipes')));
  const buttonProgress = (complete !== null)
    ? ((complete[0].id !== id) && btnStart)
    : btnStart;

  const checkProgress = () => {
    const progressRecipes = (JSON.parse(localStorage.getItem('inProgressRecipes')));
    if (url.includes('meals')) {
      let mealsId = [];
      if (progressRecipes !== null) {
        const { meals } = progressRecipes;
        mealsId = Object.keys(meals);
        return mealsId;
      }
      return mealsId;
    }
    if (url.includes('drinks')) {
      let drinksId = [];
      if (progressRecipes !== null) {
        const { drinks } = progressRecipes;
        drinksId = Object.keys(drinks);
        return drinksId;
      }
      return drinksId;
    }
  };
  const progressRecipes = (JSON.parse(localStorage.getItem('inProgressRecipes')));

  const verificProgress = (checkProgress().includes(id.toString()))
    ? ((progressRecipes !== 0) && btnContinue)
    : btnStart;

  const handleClickFavorite = () => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(fav[0].id);

    fav.forEach((e) => {
      e.id.includes(id);
      setHeart(true);
    });
  };

  return (
    <>
      {checkPathname().map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ (history.location.pathname === `/meals/${id}`)
              ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ (history.location.pathname === `/meals/${id}`)
              ? recipe.strMeal : recipe.strDrink }
            style={ {
              maxWidth: '200px', maxHeight: '150px', width: 'auto', height: 'auto' } }
          />
          <h1 data-testid="recipe-title">
            {(history.location.pathname === `/meals/${id}`)
              ? recipe.strMeal : recipe.strDrink}

          </h1>
          {(history.location.pathname === `/meals/${id}`)
          && <p data-testid="recipe-category">{ recipe.strCategory }</p>}
          {(history.location.pathname === `/drinks/${id}`)
          && <p data-testid="recipe-category">{recipe.strAlcoholic}</p>}

        </div>
      ))}
      {
        arrayIngredients().map((ingredient, index) => (
          <div key={ index }>
            <ul>
              <li data-testid={ `${index}-ingredient-name-and-measure` }>
                {ingredient.join(', ')}
              </li>
            </ul>
          </div>
        ))
      }

      {checkPathname().map((int, index) => (
        <div key={ index }>
          <p data-testid="instructions">{int.strInstructions}</p>
          <iframe data-testid="video" title="video receita" src={ int.strYoutube } />
        </div>
      ))}

      <div>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => {
            copy(`http://localhost:3000${url}`);
            setBtnCopy(true);
          } }
        >
          compartilhar

        </button>
        <button
          data-testid="favorite-btn"
          type="submit"
          onClick={ () => {
            saveFavorites(checkPathname()[0]);
            handleClickFavorite();
          } }

        >
          <img src={ heart ? blackHeart : whiteHeart } alt="coração" />
        </button>
      </div>

      {(btnCopy === true) && <p>Link copied!</p>}

      <Recomendations />
      {(complete === null) ? verificProgress : buttonProgress}

    </>
  );
}