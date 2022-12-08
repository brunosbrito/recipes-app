import React, { useContext, useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const data = JSON.parse(localStorage.getItem('doneRecipes'));
  const { btnCopy, setBtnCopy } = useContext(RecipesContext);
  const [search, setSearch] = useState([]);

  const handleFilter = () => {
    const mealFilter = search.filter((el) => el.type === 'meal');
    const drinkFilter = search.filter((el) => el.type === 'drink');

    if (mealFilter) {
      setSearch(mealFilter);
    } else if (drinkFilter) {
      setSearch(drinkFilter);
    }
  };

  useEffect(() => {
    setSearch(data);
  }, []);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All

      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilter }
      >
        Meals

      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilter }
      >
        Drinks

      </button>

      {console.log('DoneRecipes', (data))}
      {search !== null && search.map((el, index) => (
        <div key={ index }>
          <Link to={ `http://localhost:3000/${`${el.type}s`}/${el.id}` }>
            <img
              src={ el.image }
              key={ index }
              alt={ el.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {el.type === 'meal'
              ? `${el.nationality} - ${el.category}` : el.alcoholicOrNot}
          </p>
          <a href={ `http://localhost:3000/${`${el.type}s`}/${el.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {el.name}
            </p>
          </a>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {el.doneDate}
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => {
              copy(`http://localhost:3000/${`${el.type}s`}/${el.id}`);
              setBtnCopy(true);
            } }
          >
            <img src={ shareIcon } alt="Compartilhar" />

          </button>
          {(btnCopy === true) && <p>Link copied!</p>}
          {el.type === 'meal' && el.tags.map((value) => (
            <p
              data-testid={ `${index}-${value}-horizontal-tag` }
              key={ index }
            >
              {value}
            </p>))}
          {/* {console.log('Search', search)} */}
        </div>
      ))}
    </>

  );
}

export default DoneRecipes;
