import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../CSS/RecipeInProgress.css';
import { RequestDrinkId, RequestMealsId } from '../services/RequestRecipesDetails';
import FavBtn from './FavBtn';
import ShareBtn from './ShareBtn';

function RecipeInProgress() {
  const { setArray } = useContext(RecipesContext);
  const { id } = useParams();
  const history = useHistory();
  const slug = history.location.pathname;
  const [disabled, setDisabled] = useState(true);
  const [arrayRecipe, setArrayRecipe] = useState([]);
  const [ingredientsCheck, setIngredientsCheck] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes'))?.meals[id]
    || JSON.parse(localStorage.getItem('inProgressRecipes'))?.drinks[id] || [],
  );

  useEffect(() => {
    setArray(arrayRecipe);
  });
  useEffect(() => {
    if ((history.location.pathname === `/drinks/${id}/in-progress`)) {
      const requestDrink = async () => {
        const dataDrink = await RequestDrinkId(id);
        return setArrayRecipe(dataDrink);
      };
      requestDrink();
    } else {
      const requestMeals = async () => {
        const dataMeals = await RequestMealsId(id);
        return setArrayRecipe(dataMeals);
      };
      requestMeals();
    }
  }, [id, history]);

  const ingredients = arrayRecipe.map((el) => Object.entries(el)
    .filter((entry) => entry[0]
      .includes('strIngredient') && entry[1] !== '' && entry[1] !== null))
    .map((arr) => arr.map((el) => el[1]))
    .flat();

  const measures = arrayRecipe.map((el) => Object.entries(el)
    .filter((entry) => entry[0]
      .includes('strMeasure') && entry[1] !== ' ' && entry[1] !== null))
    .map((arr) => arr.map((el) => el[1]))
    .flat();

  const objInstructions = {};
  ingredients.forEach((element, index) => {
    objInstructions[element] = measures[index];
  });

  const arrayInstructions = Object.entries(objInstructions);

  function addToProgressLocal(value) {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (history.location.pathname.includes('meals')) {
      const newObj = {
        ...obj,
        meals: {
          ...obj.meals,
          [id]: value,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    } else {
      const newObj = {
        ...obj,
        drinks: {
          ...obj.drinks,
          [id]: value,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
  }

  function handleChange({ target }) {
    if (target.checked) {
      const addArray = [...ingredientsCheck, target.className];
      setIngredientsCheck(addArray);
      addToProgressLocal(addArray);
      console.log(arrayRecipe);
    } else {
      const subArray = ingredientsCheck.filter((e) => e !== target.className);
      setIngredientsCheck(subArray);
      addToProgressLocal(subArray);
    }
  }

  function handleArrayTags(key) {
    if (key.includes(',')) {
      const array = key.split(',');
      return array;
    }
    return [...key];
  }

  const handleclick = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const recipe = {
      id,
      type: ((history.location.pathname === `/meals/${id}/in-progress`))
        ? 'meal' : 'drink',
      nationality: ((history.location.pathname === `/meals/${id}/in-progress`))
        ? arrayRecipe[0].strArea : '',
      category: arrayRecipe[0].strCategory,
      alcoholicOrNot: ((history.location.pathname === `/meals/${id}/in-progress`))
        ? '' : arrayRecipe[0].strAlcoholic,
      name: ((history.location.pathname === `/meals/${id}/in-progress`))
        ? arrayRecipe[0].strMeal : arrayRecipe[0].strDrink,
      image: ((history.location.pathname === `/meals/${id}/in-progress`))
        ? arrayRecipe[0].strMealThumb : arrayRecipe[0].strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: ((history.location.pathname === `/meals/${id}/in-progress`))
        ? handleArrayTags(arrayRecipe[0].strTags) : [],
    };

    const newDone = [
      ...JSON.parse(localStorage.getItem('doneRecipes')),
      recipe,
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(newDone));

    history.push('/done-recipes');
  };

  useEffect(() => {
    if (ingredientsCheck.length === arrayInstructions.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [ingredientsCheck, arrayInstructions]);

  function startLocal() {
    if (localStorage.getItem('inProgressRecipes') === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }
  }

  return (
    <>
      {startLocal()}

      <h1>Em progresso</h1>
      {
        (arrayRecipe.length === 0)
          ? <p>carregando...</p> : arrayRecipe.map((el, index) => (
            <div key={ index }>
              <img
                style={ {
                  maxWidth: '200px', maxHeight: '150px', width: 'auto', height: 'auto' } }
                data-testid="recipe-photo"
                src={ slug.includes('meals') ? el.strMealThumb : el.strDrinkThumb }
                alt={ slug.includes('meals') ? el.strMeal : el.strDrink }
              />
              <p data-testid="recipe-title">
                { slug.includes('meals') ? el.strMeal : el.strDrink }
              </p>
              <ShareBtn />
              <FavBtn />
              <p data-testid="recipe-category">
                { el.strCategory}
              </p>
              <p data-testid="instructions">
                { el.strInstructions }
              </p>
            </div>
          ))
      }
      {
        arrayInstructions.map((ingredient, index) => (
          <div key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient[0] }
              className="styled-label"
            >
              <input
                defaultChecked={ ingredientsCheck.includes(index.toString()) }
                className={ index }
                type="checkbox"
                name={ ingredient[0] }
                id={ ingredient[0] }
                onChange={ handleChange }
              />
              {ingredient.join(', ')}
            </label>
            <br />
          </div>
        ))
      }
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ disabled }
        onClick={ handleclick }
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
