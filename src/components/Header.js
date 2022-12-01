import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profilePicture from '../images/profileIcon.svg';
import iconePicture from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();

  const [inputSearch, setInputSearch] = useState(false);

  const slug = history.location.pathname;

  const searchButton = () => {
    if (inputSearch === false) {
      setInputSearch(true);
    } else if (inputSearch === true) {
      setInputSearch(false);
    }
  };

  function handleTitle() {
    switch (slug) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      break;
    }
  }

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profilePicture }
          alt="Foto de Perfil"
        />
      </button>
      {
        (slug !== '/profile' && slug !== '/done-recipes' && slug !== '/favorite-recipes')
        && (
          <button
            type="button"
            onClick={ searchButton }
          >
            <img
              data-testid="search-top-btn"
              src={ iconePicture }
              alt="Ícone de Pesquisa"
            />
          </button>)
      }
      <h1 data-testid="page-title">{ handleTitle() }</h1>
      { inputSearch && <SearchBar />}
    </header>
  );
}

export default Header;
