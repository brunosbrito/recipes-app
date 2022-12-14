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
      <div
        className="container btn"
      >
        <button
          style={ { marginRight: '10px' } }
          className="btn btn-outline-dark"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          style={ { marginRight: '10px' } }
          className="btn btn-outline-dark"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="btn btn-outline-dark"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ logoutFunc }
        >
          Logout
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
