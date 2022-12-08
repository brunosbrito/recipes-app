import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../CSS/RecipeInProgress.css';
import { RequestDrinkId, RequestMealsId } from '../services/RequestRecipesDetails';
import FavBtn from './FavBtn';
import ShareBtn from './ShareBtn';

function RecipeInProgress() {
  const history = useHistory();
  const slug = history.location.pathname;

  // const [disabled, setDisabled] = useState(true);
  // const [counter, setCounter] = useState(0);
  // const dataRecipe = JSON.parse(localStorage.getItem('recipe'));
  const { recipeInprogress, setArray } = useContext(RecipesContext);
  const { id } = useParams();
  const [arrayRecipe, setArrayRecipe] = useState([]);
  // const [arrayId, setArrayId] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState({
    drinks: {},
    meals: {},
  });

  function recipeArray() {
    if (history.location.pathname === `/meals/${id}/in-progress`) {
      return arrayRecipe;
    }
    return arrayRecipe;
  }
  useEffect(() => {
    setArray(recipeArray());
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
  }, [id]);

  const ingredients = recipeArray().map((el) => Object.entries(el)
    .filter((entry) => entry[0]
      .includes('strIngredient') && entry[1] !== '' && entry[1] !== null))
    .map((arr) => arr.map((el) => el[1]))
    .flat();

  const measures = recipeArray().map((el) => Object.entries(el)
    .filter((entry) => entry[0]
      .includes('strMeasure') && entry[1] !== ' ' && entry[1] !== null))
    .map((arr) => arr.map((el) => el[1]))
    .flat();

  const objInstructions = {};
  ingredients.forEach((element, index) => {
    objInstructions[element] = measures[index];
  });

  const arrayInstructions = Object.entries(objInstructions);
  let ingredientsCheck = [];
  function handleChange({ target }) {
    if (target.checked) {
      target.parentNode.className = 'done';

      // setCounter(counter + 1);
      ingredientsCheck = [...ingredientsCheck, target.className];
      // const ingredientsSalve = JSON.parse(localStorage.getItem('inProgressRecipes'));
      // console.log(ingredientsSalve);
      // // ingredientsSalve.meals[id] = [...ingredientsCheck, target.className];
      // // localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientsSalve));
      // const drinks = {

      //   [id]: [...ingredientsCheck, target.className],
      // };

      // ingredientsSalve.meals = {
      //   [id]: [...ingredientsCheck, target.className],

      // };
      // localStorage.setItem(
      //   'inProgressRecipes',
      //   JSON.stringify((history.location.pathname === `/meals/${id}/in-progress`)
      //     ? { ...JSON.parse(localStorage.getItem('inProgressRecipes')), ingredientsSalve }
      //     : { ...JSON.parse(localStorage.getItem('inProgressRecipes')), drinks }),
      // );
    } else {
      target.parentNode.className = 'undone';
      // setCounter(counter - 1);
      // const drinks = {
      //   [id]: ingredientsCheck.filter((ingredient) => ingredient !== target.className),
      // };

      // const meals = {
      //   [id]: ingredientsCheck.filter((ingredient) => ingredient !== target.className),

      // };
      // setIngredientsCheck(ingredientsCheck
      //   .filter((ingredient) => ingredient !== target.className));
      // localStorage.setItem(
      //   'inProgressRecipes',
      //   JSON.stringify((history.location.pathname === `/meals/${id}/in-progress`)
      //     ? { ...JSON.parse(localStorage.getItem('inProgressRecipes')), meals }
      //     : { ...JSON.parse(localStorage.getItem('inProgressRecipes')), drinks }),
      // );
    }
  }

  const handleclick = () => {
    const recipe = [{
      id,
      type: ((history.location.pathname === `/meals/${id}/in-progress`))
        ? 'meal' : 'drink',
      nationality: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      Image: '',
      doneData: '',
      tags: [],
    }];

    localStorage.setItem('doneRecipes', JSON.stringify(recipe));

    history.push('/done-recipes');
  };

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
  //     if (history.location.pathname === `/meals/${id}/in-progress`) {
  //       setArrayId(JSON.parse(localStorage.getItem('inProgressRecipes'))
  //         .meals[id]);
  //     } else {
  //       setArrayId(JSON.parse(localStorage.getItem('inProgressRecipes'))
  //         .drinks[id]);
  //     }
  //   }
  // }, []);

  console.log(recipeInprogress);

  useEffect(() => () => {
    setCurrentRecipe((slug.includes('meals')
      ? (currentRecipe.meals[id] = ingredientsCheck)
      : (currentRecipe.drinks[id] = ingredientsCheck)));
    const getIngredientsCheck = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { drinks, meals } = currentRecipe;
    if (getIngredientsCheck === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(currentRecipe));
    } else {
      getIngredientsCheck.drinks[id] = drinks[id];
      getIngredientsCheck.meals[id] = meals[id];

      localStorage.setItem('inProgressRecipes', JSON.stringify(getIngredientsCheck));
    }
  }, []);

  // useEffect(() => {
  //   if (counter === arrayInstructions.length) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // }, [counter, arrayInstructions]);

  return (
    <>
      <h1>Em progresso</h1>
      {
        (recipeArray().length === 0)
          ? <p>carregando...</p> : recipeArray().map((el, index) => (
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
            >
              <input
                // checked={ arrayId?.includes(index.toString()) }
                className={ index }
                type="checkbox"
                name={ ingredient[0] }
                id={ ingredient[0] }
                onChange={ handleChange }
                // autoComplete="off"
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
        // disabled={ disabled }
        onClick={ handleclick }
      >
        Finish Recipe
      </button>
    </>

  );
}

export default RecipeInProgress;
