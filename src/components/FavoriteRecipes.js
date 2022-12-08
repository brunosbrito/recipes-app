import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const mealsFilter = () => {
    const aux = favoriteRecipes.filter((el) => el.type === 'meal');
    setFilteredRecipes(aux);
  };

  const drinksFilter = () => {
    const aux = favoriteRecipes.filter((el) => el.type === 'drink');
    setFilteredRecipes(aux);
  };

  const allFilter = () => {
    setFilteredRecipes(favoriteRecipes);
  };

  return (
    <>
      <Header />
      <button type="button" onClick={ mealsFilter }>Meals</button>
      <button type="button" onClick={ drinksFilter }>Drinks</button>
      <button type="button" onClick={ allFilter }>All</button>
      {
        filteredRecipes.map((el, index) => {
          if (el.type === 'meal') {
            return (
              <>
                <Link to={ `meals/${el.id}` }>
                  <img
                    src={ el.image }
                    alt={ index }
                    style={ {
                      maxWidth: '200px',
                      maxHeight: '150px',
                      width: 'auto',
                      height: 'auto',
                    } }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {el.name}
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${el.nationality} - ${el.category}` }
                </p>
              </>
            );
          }
          return (
            <>
              <Link to={ `drinks/${el.id}` }>
                <img
                  src={ el.image }
                  alt={ index }
                  style={ {
                    maxWidth: '200px',
                    maxHeight: '150px',
                    width: 'auto',
                    height: 'auto' } }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {el.name}
                </p>
              </Link>
              <p key={ index } data-testid={ `${index}-horizontal-top-text` }>
                { el.alcoholicOrNot }
              </p>
            </>
          );
        })
      }
    </>
  );
}

export default FavoriteRecipes;
