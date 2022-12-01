import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  RequestByDrinkCategory,
  RequestByMealCategory } from '../services/RequestCategories';

function Categories() {
  const {
    categories, setData, setCategoryFilter, categoryFilter } = useContext(RecipesContext);
  const history = useHistory();
  const slug = history.location.pathname;

  function fiveCategories() {
    const FIVE = 5;
    const newArray = categories.slice(0, FIVE);
    return newArray;
  }

  function resetCategoryFilters() {
    setData([]);
    setCategoryFilter([]);
  }

  function fetchByCategory(category) {
    setCategoryFilter(() => [category]);
    if (categoryFilter[0] === category) return resetCategoryFilters();

    if (slug === '/meals') {
      RequestByMealCategory(category)
        .then((result) => setData(result));
    }
    if (slug === '/drinks') {
      RequestByDrinkCategory(category)
        .then((result) => setData(result));
    }
  }

  return (
    <>
      {fiveCategories().map((category, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => fetchByCategory(category.strCategory) }
          >
            {category.strCategory}
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ resetCategoryFilters }
      >
        All
      </button>
    </>
  );
}

export default Categories;
