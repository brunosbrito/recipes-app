import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RequestDrinkId, RequestMealsId } from '../services/RequestRecipesDetails';

export default function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [dataMealsArray, setDataMealsArray] = useState([]);
  const [dataDrinkArray, setDataDrinkArray] = useState([]);

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

  useEffect(() => {
    checkPathname();
    requestMeals();
    requestDrink();
    // arrayIngredients();
  }, []);

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
          && <p>{recipe.strAlcoholic}</p>}

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

      {console.log('Array', arrayIngredients())}

    </>
  );
}
