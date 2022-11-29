import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  RequestIngredientApi,
  RequestNameApi,
  RquestFirstLetterApi } from '../services/RequestDrinkApi';
import {
  RequestFooterFisrtLetterApi,
  RequestFooterIngredientApi,
  RequestFooterNameApi } from '../services/RequestFoodApí';

function SearchBar() {
  const [optionSearch, setOptionSearch] = useState('');
  const [input, setInput] = useState('');
  const history = useHistory();
  const firstLetter = 'First letter';

  const handleChangeOptions = ({ target }) => {
    setOptionSearch(target.value);
  };

  const drinks = async () => {
    if (optionSearch === 'Ingredient') {
      const resquetIngredient = await RequestIngredientApi(input);
      console.log(resquetIngredient);
    } else if (optionSearch === 'Name') {
      const requestName = await RequestNameApi(input);
      console.log(requestName);
    } else if (optionSearch === firstLetter) {
      const requestFirstLetter = await RquestFirstLetterApi(input);
      console.log(requestFirstLetter);
    } else {
      console.log(error);
    }
  };

  const foods = async () => {
    if (optionSearch === 'Ingredient') {
      const resquetIngredient = await RequestFooterIngredientApi(input);
      console.log(resquetIngredient);
    } else if (optionSearch === 'Name') {
      const requestName = await RequestFooterNameApi(input);
      console.log(requestName);
    } else if (optionSearch === firstLetter) {
      const requestFirstLetter = await RequestFooterFisrtLetterApi(input);
      console.log(requestFirstLetter);
    } else {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (history('/meeals')) {
      return foods();
    }
    return drinks();
  };

  const handleChangeInput = ({ target }) => {
    setInput(target.value);
    if (input.length > 1 && optionSearch === 'First letter') {
      return global.alert('our search must have only 1 (one) character');
    }
  };
  return (
    <>
      <input
        data-testid="search-top-btn"
        onChange={ handleChangeInput }
        type="text"
        placeholder="Receita"
        name="search"
      />
      <label htmlFor="Ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="Ingredient"
          id="Ingredient"
          name="search"
          onChange={ handleChangeOptions }
        />
      </label>
      <label htmlFor="Name">
        Name
        <input
          testid="name-search-radio"
          type="radio"
          value="name"
          id="Name"
          name="search"
          onChange={ handleChangeOptions }
        />
      </label>
      <label htmlFor="First-letter">
        First letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="First letter"
          id="First-letter"
          name="search"
          onChange={ handleChangeOptions }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Search

      </button>
    </>

  );
}

export default SearchBar;
