import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// const inProgressRecipes = {
//   drinks: {},
//   meals: {},
// };

function Login({ history }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(true);

  function handleChange({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  useEffect(() => {
    const SIX = 6;

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    const emailCheck = emailRegex.test(user.email);
    const passCheck = user.password.length > SIX;

    if (emailCheck && passCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user.email, user.password]);

  function setLocal() {
    localStorage.setItem('user', JSON.stringify({
      email: user.email,
    }));
    // localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    history.push('/meals');
  }

  return (
    <>
      <input
        data-testid="email-input"
        type="email"
        name="email"
        value={ user.email }
        onChange={ (e) => handleChange(e) }
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={ user.password }
        onChange={ (e) => handleChange(e) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ disabled }
        onClick={ setLocal }
      >
        Enter
      </button>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
