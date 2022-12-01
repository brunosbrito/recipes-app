import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RequestDrinkId, RequestMealsId } from '../services/RequestRecipesDetails';

export default function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [dataMealsArray, setDataMealsArray] = useState([]);
  const [dataDrinkAray, setDataDrinkArray] = useState([]);

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
    return dataDrinkAray;
  }

  // const arrayIngredients = async () => {
  //   console.log(await requestMeals());
  // };

  const ingredientsList = () => {
    const ingri = checkPathname().reduce((total, valor) => {
      valor.includes('strIngredient').forEach((ing) => {
        total.push(ing);
      });
      return total;
    }, []);
    return ingri;
  };

  useEffect(() => {
    checkPathname();
    requestMeals();
    requestDrink();
    // arrayIngredients();
  }, []);

  return (
    <div>
      {/* {console.log(arrayIngredients())} */}
      {dataMealsArray.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            style={ {
              maxWidth: '200px', maxHeight: '150px', width: 'auto', height: 'auto' } }
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          {/* <ul>
            <li>{recipe.strIngredient1}</li>
            <li>{recipe.strIngredient2}</li>
            <li>{recipe.strIngredient3}</li>
            <li>{recipe.strIngredient4}</li>
            <li>{recipe.strIngredient5}</li>
            <li>{recipe.strIngredient6}</li>
            <li>{recipe.strIngredient7}</li>
            <li>{recipe.strIngredient8}</li>
            <li>{recipe.strIngredient9}</li>
            <li>{recipe.strIngredient10}</li>
            <li>{recipe.strIngredient11}</li>
            <li>{recipe.strIngredient12}</li>
            <li>{recipe.strIngredient13}</li>
            <li>{recipe.strIngredient14}</li>
            <li>{recipe.strIngredient15}</li>
            <li>{recipe.strIngredient16}</li>
            <li>{recipe.strIngredient17}</li>
            <li>{recipe.strIngredient18}</li>
            <li>{recipe.strIngredient19}</li>
            <li>{recipe.strIngredient20}</li>
          </ul> */}
          {/* {checkPathname().filter((value) => (
            console.log(value.includes('strIngredient'))
          ))} */}

        </div>
      ))}

    </div>
  );
}
