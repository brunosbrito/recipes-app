import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipesCard() {
  const [newData, setNewData] = useState([]);
  const { data } = useContext(RecipesContext);
  const twelve = 12;
  const history = useHistory();

  function newArray() {
    const array = data.slice(0, twelve);
    setNewData(array);
  }

  useEffect(() => {
    newArray();
  }, [data]);

  return (
    <>
      {newData.map((recipes, index) => (
        <div
          data-testid={ ` ${index}-recipe-card` }
          key={ index }
        >
          {console.log(index)}
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
        </div>))}
    </>
  );
}
export default RecipesCard;
