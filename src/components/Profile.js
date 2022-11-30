import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Profile() {
  const history = useHistory();
  const profileEmail = localStorage.getItem('user');
  const profileEmailParse = JSON.parse(profileEmail);
  const logoutFunc = () => {
    localStorage.clear();
    history.push('/');
  };
  return (

    <>
      <Header />
      <h2 data-testid="profile-email">{ profileEmailParse?.email }</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logoutFunc }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
