import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';
import Header from './Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);
  const [btnCopy, setBtnCopy] = useState(false);

  function copiedLinkMsg() {
    setBtnCopy(true);
  }

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

  const removeLocal = ({ target }) => {
    const recipeId = target.parentNode.parentNode.id;
    const removedRecipe = favoriteRecipes.filter((el) => el.id !== recipeId);
    const removedRecipeFix = filteredRecipes.filter((el) => el.id !== recipeId);
    setFilteredRecipes(removedRecipeFix);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));
  };

  return (
    <>
      <Header />
      <button
        type="button"
        onClick={ mealsFilter }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        onClick={ drinksFilter }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ allFilter }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      {(btnCopy === true) ? <p>Link copied!</p> : null}
      {
        filteredRecipes?.map((el, index) => {
          if (el.type === 'meal') {
            return (
              <div id={ el.id }>
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
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    copiedLinkMsg();
                    copy(`http://localhost:3000/meals/${el.id}`);
                  } }
                  src={ shareIcon }
                >
                  <img src={ shareIcon } alt="compartilhar" />
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeart }
                  onClick={ removeLocal }
                >
                  <img src={ blackHeart } alt="coração" />
                </button>
              </div>
            );
          }
          return (
            <div id={ el.id } key={ index }>
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
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ () => {
                  copiedLinkMsg();
                  copy(`http://localhost:3000/drinks/${el.id}`);
                } }
              >
                <img src={ shareIcon } alt="compartilhar" />
              </button>
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ removeLocal }
                src={ blackHeart }
              >
                <img src={ blackHeart } alt="coração" />
              </button>
            </div>
          );
        })
      }
    </>
  );
}

export default FavoriteRecipes;
