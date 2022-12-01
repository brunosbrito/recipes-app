import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipesCard() {
  // const [newData, setNewData] = useState([]);
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
    <>
      { console.log(data) }
      {twelveRecipes().map((recipes, index) => (
        <Link key={ index } to={ () => handleRedirect(recipes) }>
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <p
              data-testid={ `${index}-card-name` }
            >
              {(history.location.pathname === '/meals')
                ? recipes.strMeal : recipes.strDrink}
            </p>
            <img
              data-testid={ `${index}-card-img` }
              style={ {
                maxWidth: '200px', maxHeight: '150px', width: 'auto', height: 'auto' } }
              src={ (history.location.pathname === '/meals')
                ? recipes.strMealThumb : recipes.strDrinkThumb }
              alt={ (history.location.pathname === '/meals')
                ? recipes.strMeal : recipes.strDrink }
            />
          </div>
        </Link>))}
    </>
  );
}
export default RecipesCard;
