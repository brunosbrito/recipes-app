import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../CSS/RecipesCard.css';

function RecipesCard() {
  const { initialRecipes, data, setData, categoryFilter } = useContext(RecipesContext);
  const twelve = 12;
  const history = useHistory();
  const slug = history.location.pathname;

  function twelveRecipes() {
    const newArray = initialRecipes.slice(0, twelve);
    if (data?.length > 0) return data.slice(0, twelve);
    return newArray;
  }

  useEffect(() => {
    if (data?.length === 1 && categoryFilter.length === 0) {
      history.push((history.location.pathname === '/meals')
        ? `/meals/${data[0].idMeal}`
        : `/drinks/${data[0].idDrink}`);
    }
    if (data === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setData([]);
    }
  }, [data, history, setData, categoryFilter]);

  function handleRedirect(recipe) {
    if (slug === '/meals') return `/meals/${recipe.idMeal}`;
    if (slug === '/drinks') return `/drinks/${recipe.idDrink}`;
  }

  return (
    <div className="card text-center">
      {twelveRecipes().map((recipes, index) => (
        <Link className="link" key={ index } to={ () => handleRedirect(recipes) }>
          <div
            className="g-col-6"
            data-testid={ `${index}-recipe-card` }
          >
            <div className="item">
              <img
                data-testid={ `${index}-card-img` }
                className="img g-col-6"
                src={ (history.location.pathname === '/meals')
                  ? recipes.strMealThumb : recipes.strDrinkThumb }
                alt={ (history.location.pathname === '/meals')
                  ? recipes.strMeal : recipes.strDrink }
              />
              <div className="name">
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {(history.location.pathname === '/meals')
                    ? recipes.strMeal : recipes.strDrink}
                </p>

              </div>

            </div>

          </div>
        </Link>))}
    </div>
  );
}
export default RecipesCard;
