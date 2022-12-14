import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  RequestInitialDrinks,
  RequestInitialMeals } from '../services/RequestInitialRecipes';
import { RequestDrinkId, RequestMealsId } from '../services/RequestRecipesDetails';
import Recomendations from './Recomendations';
import '../CSS/RecipeDetails.css';
import ShareBtn from './ShareBtn';
import FavBtn from './FavBtn';
import Header from './Header';

export default function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [dataMealsArray, setDataMealsArray] = useState([]);
  const [dataDrinkArray, setDataDrinkArray] = useState([]);
  const { setRecomendations } = useContext(RecipesContext);
  const url = history.location.pathname;

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
      className="start-recipe "
      onClick={ startRecipe }
    >
      Start Recipe
    </button>
  );
  const btnContinue = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe "
      onClick={ startRecipe }
    >
      Continue Recipe
    </button>
  );

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

  const verificProgress = (checkProgress().includes(id.toString()))
    ? btnContinue
    : btnStart;

  const complete = (JSON.parse(localStorage.getItem('doneRecipes')));

  const buttonProgress = () => {
    let button = '';
    if (complete !== null) {
      complete?.forEach((e) => {
        if (e.id === id) {
          button = '';
        } else {
          button = verificProgress;
        }
      });
    } else {
      button = verificProgress;
    }
    return button;
  };

  if (!dataMealsArray?.length > 0 && !dataDrinkArray?.length > 0) {
    return (
      <>
        <Header />
        <div className="load-row">
          <span />
          <span />
          <span />
          <span />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {checkPathname().map((recipe, index) => (
        <div className="recipeDetails" key={ index }>
          <img
            className="img-fluid img"
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
            <ul className="list-group">
              <li
                className="list-group-item list-group-item-action list"
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient.join(', ')}
              </li>
            </ul>
          </div>
        ))
      }

      {checkPathname().map((int, index) => (
        <div key={ index }>
          <div className="instructions">
            <p data-testid="instructions">{int.strInstructions}</p>
          </div>
          <div className="container-fluid">
            <div className="iframe-container ">
              { int.strYoutube && <iframe
                data-testid="video"
                title="video receita"
                src={ int.strYoutube.replace('watch?v=', 'embed/') }
              />}
            </div>
          </div>
        </div>
      ))}
      <div className="buttons container-fluid">
        <FavBtn />
        <ShareBtn />
      </div>
      <Recomendations />
      {buttonProgress()}
    </>
  );
}
