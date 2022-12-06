import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../CSS/RecipeInProgress.css';

function RecipeInProgress() {
  const history = useHistory();
  const slug = history.location.pathname;

  const [disabled, setDisabled] = useState(true);
  const [counter, setCounter] = useState(0);
  const dataRecipe = JSON.parse(localStorage.getItem('recipe'));
  const { id } = useParams();
  const [ingredientsCheck, setIngredientsCheck] = useState([]);
  const [arrayId, setArrayId] = useState([]);

  const ingredients = dataRecipe.map((el) => Object.entries(el)
    .filter((entry) => entry[0]
      .includes('strIngredient') && entry[1] !== '' && entry[1] !== null))
    .map((arr) => arr.map((el) => el[1]))
    .flat();

  const measures = dataRecipe.map((el) => Object.entries(el)
    .filter((entry) => entry[0]
      .includes('strMeasure') && entry[1] !== ' ' && entry[1] !== null))
    .map((arr) => arr.map((el) => el[1]))
    .flat();

  const objInstructions = {};
  ingredients.forEach((element, index) => {
    objInstructions[element] = measures[index];
  });

  const arrayInstructions = Object.entries(objInstructions);

  function handleChange({ target }) {
    setIngredientsCheck([...ingredientsCheck, target.className]);
    setArrayId([...arrayId, target.className]);

    if (target.checked) {
      target.parentNode.className = 'done';
      setCounter(counter + 1);
      const drinks = {
        [id]: [...ingredientsCheck, target.className],
      };

      const meals = {
        [id]: [...ingredientsCheck, target.className],

      };
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify((history.location.pathname === `/meals/${id}/in-progress`)
          ? { ...JSON.parse(localStorage.getItem('inProgressRecipes')), meals }
          : { ...JSON.parse(localStorage.getItem('inProgressRecipes')), drinks }),
      );
    } else {
      target.parentNode.className = 'undone';
      setCounter(counter - 1);
      const drinks = {
        [id]: ingredientsCheck.filter((ingredient) => ingredient !== target.className),
      };

      const meals = {
        [id]: ingredientsCheck.filter((ingredient) => ingredient !== target.className),

      };
      setIngredientsCheck(ingredientsCheck
        .filter((ingredient) => ingredient !== target.className));
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify((history.location.pathname === `/meals/${id}/in-progress`)
          ? { ...JSON.parse(localStorage.getItem('inProgressRecipes')), meals }
          : { ...JSON.parse(localStorage.getItem('inProgressRecipes')), drinks }),
      );
    }
  }

  // const handleCheck = () => {
  //   console.log('estou aqui');
  //   if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
  //     console.log('estou aqui');
  //     if (history.location.pathname === `/meals/${id}/in-progress`) {
  //       const teste = JSON.parse(localStorage.getItem('inProgressRecipes'))
  //         .meals[id].includes(index);
  //       console.log(teste);
  //     }
  //     const teste1 = JSON.parse(localStorage.getItem('inProgressRecipes'))
  //       .drinks[id].includes(index);
  //     console.log(teste1);
  //   }
  //   console.log('não entrou');
  // };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      if (history.location.pathname === `/meals/${id}/in-progress`) {
        setIngredientsCheck(JSON.parse(localStorage.getItem('inProgressRecipes'))
          .meals[id]);
        setArrayId(JSON.parse(localStorage.getItem('inProgressRecipes'))
          .meals[id]);
        console.log(arrayId);
      } else {
        setIngredientsCheck(JSON.parse(localStorage.getItem('inProgressRecipes'))
          .drinks[id]);
        setArrayId(JSON.parse(localStorage.getItem('inProgressRecipes'))
          .drinks[id]);
      }
    }
  }, []);

  useEffect(() => {
    if (counter === arrayInstructions.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [counter, arrayInstructions]);

  return (
    <>
      {console.log(arrayId)}
      <h1>Em progresso</h1>
      {
        (dataRecipe.length === 0)
          ? <p>carregando...</p> : dataRecipe.map((el, index) => (
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
              <button data-testid="share-btn" type="button">Share</button>
              <button data-testid="favorite-btn" type="button">Favoritar</button>
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
                checked={ arrayId.includes(index.toString()) }
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
        disabled={ disabled }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </>

  );
}

export default RecipeInProgress;
