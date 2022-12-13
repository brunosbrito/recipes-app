/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import profilePicture from '../images/profileIcon.svg';
import iconePicture from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../CSS/Header.css';
import RecipesIcon from '../images/RecipesIcon.png';
import GoBack from '../images/GoBack.png';

function Header() {
  const history = useHistory();
  const { id } = useParams();

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
    if (slug === '/meals') return 'Meals';
    if (slug === '/drinks') return 'Drinks';
    if (slug === '/profile') return 'Profile';
    if (slug === '/done-recipes') return 'Done Recipes';
    if (slug === '/favorite-recipes') return 'Favorite Recipes';
  }

  return (
    <header>
      <div className="navbar navbar-expand-lg">
        <div className="header container-fluid">
          <button
            className="icon"
            type="button"
            onClick={ () => history.goBack() }
          >

            <img
              className="goback"
              src={ GoBack }
              alt="Go Back"
            />

          </button>
          <img
            className="recipe-icon"
            src={ RecipesIcon }
            alt="Recipes Icon"
          />
          {/* <div> */}
          <button
            className="icon "
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
            (slug !== '/profile' && slug !== '/done-recipes'
              && slug !== '/favorite-recipes' && slug !== `/meals/${id}`)
               && (
                 <button
                   className="icon"
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
          {/* </div> */}
        </div>

      </div>

      <h1 className="text-center" data-testid="page-title">{ handleTitle() }</h1>
      { inputSearch && <SearchBar />}
    </header>
  );
}

export default Header;
