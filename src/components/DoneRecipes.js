import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from './Header';

function DoneRecipes() {
  const data = JSON.parse(localStorage.getItem('doneRecipes'));
  const [btnCopy, setBtnCopy] = useState();
  const [search, setSearch] = useState([]);

  const handleFilterMeal = () => {
    const mealFilter = data.filter((el) => (el.type === 'meal'));
    setSearch(mealFilter);
  };

  const handleFilterDrink = () => {
    const drinkFilter = data.filter((el) => (el.type === 'drink'));
    setSearch(drinkFilter);
  };

  const handleFilterAll = () => {
    setSearch(data);
  };

  useEffect(() => {
    setSearch(data);
  }, []);

  if (data === null || data.length === 0) {
    return (
      <>
        <Header />
        <h4 style={ { textAlign: 'center' } }>You do not have any done recipes yet!</h4>
      </>
    );
  }

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterAll }
      >
        All

      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilterMeal }
      >
        Meals

      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterDrink }
      >
        Drinks

      </button>

      {search !== null && search.map((el, index) => (
        <div key={ index }>
          <Link to={ `/${`${el.type}s`}/${el.id}` }>
            <img
              style={ {
                maxWidth: '200px',
                maxHeight: '150px',
                width: 'auto',
                height: 'auto',
              } }
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
        </div>
      ))}
    </>

  );
}

export default DoneRecipes;
