import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profilePicture from '../images/profileIcon.svg';
import iconePicture from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();

  const [inputSearch, setInputSearch] = useState(false);

  const profileButton = () => {
    history.push('/profile');
    // console.log(history);
  };

  const searchButton = () => {
    if (inputSearch === false) {
      setInputSearch(true);
      console.log('tru');
    } else if (inputSearch === true) {
      setInputSearch(false);
    }
  };
  return (
    <header>
      <button
        type="button"
        onClick={ profileButton }
      >
        <img
          data-testid="profile-top-btn"
          src={ profilePicture }
          alt="Foto de Perfil"
        />
      </button>
      <button
        type="button"
        onClick={ searchButton }
      >
        <img
          data-testid="search-top-btn"
          src={ iconePicture }
          alt="Ícone de Pesquisa"
        />
      </button>
      <h1 data-testid="page-title">Aqui vai ser alterado</h1>
      { inputSearch && <SearchBar />}
    </header>
  );
}

export default Header;
