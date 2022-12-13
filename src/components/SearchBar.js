import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  RequestIngredientApi,
  RequestNameApi,
  RequestFirstLetterApi } from '../services/RequestDrinkApi';
import {
  RequestFooterFisrtLetterApi,
  RequestFooterIngredientApi,
  RequestFooterNameApi } from '../services/RequestFoodApí';
import '../CSS/SearchBar.css';

function SearchBar() {
  const [optionSearch, setOptionSearch] = useState('');
  const [input, setInput] = useState('');
  const { setData } = useContext(RecipesContext);
  const history = useHistory();

  const handleChangeOptions = ({ target }) => {
    setOptionSearch(target.value);
  };

  const drinks = async () => {
    if (optionSearch === 'Ingredient') {
      const resquetIngredient = await RequestIngredientApi(input);
      setData(resquetIngredient);
    } else if (optionSearch === 'Name') {
      const requestName = await RequestNameApi(input);
      setData(requestName);
    } else {
      const requestFirstLetter = await RequestFirstLetterApi(input);
      setData(requestFirstLetter);
    }
  };

  const foods = async () => {
    if (optionSearch === 'Ingredient') {
      const resquetIngredient = await RequestFooterIngredientApi(input);
      setData(resquetIngredient);
    } else if (optionSearch === 'Name') {
      const requestName = await RequestFooterNameApi(input);
      setData(requestName);
    } else {
      const requestFirstLetter = await RequestFooterFisrtLetterApi(input);
      setData(requestFirstLetter);
    }
  };

  const handleClick = () => {
    if (history.location.pathname === '/meals') {
      return foods();
    }

    return drinks();
  };

  const handleChangeInput = ({ target }) => {
    setInput(target.value);
    if (input.length > 0 && optionSearch === 'First letter') {
      global.alert('Your search must have only 1 (one) character');
    }
  };
  return (
    <div className="search">
      <div className="input-search">
        <input
          className="search-input"
          data-testid="search-input"
          onChange={ handleChangeInput }
          type="text"
          placeholder="Search recipe"
          name="search"
        />
        <button
          className="btn btn-outline-dark"
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleClick }
        >
          Search

        </button>
      </div>

      <div className="wrapper">
        <div className="inputs">
          <label htmlFor="Ingredient">
            <input
              className="radio"
              data-testid="ingredient-search-radio"
              type="radio"
              value="Ingredient"
              id="Ingredient"
              name="search"
              onChange={ handleChangeOptions }
            />
            <span>Ingredient</span>
          </label>
        </div>
        <div className="inputs">
          <label htmlFor="Name">
            <input
              className="radio"
              data-testid="input-radio"
              type="radio"
              value="Name"
              id="Name"
              name="search"
              onChange={ handleChangeOptions }
            />
            <span>Name</span>
          </label>

        </div>
        <div className="inputs">
          <label htmlFor="First-letter">
            <input
              className="radio"
              data-testid="first-letter-search-radio"
              type="radio"
              value="First letter"
              id="First-letter"
              name="search"
              onChange={ handleChangeOptions }
            />
            <span>First letter</span>
          </label>
        </div>
      </div>
    </div>

  );
}

export default SearchBar;
