import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Logo from '../images/Recipes.png';
import '../CSS/Login.css';

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
    const passCheck = user.password.length >= SIX;

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

    history.push('/meals');
  }

  return (
    <>
      <div className="text-center">
        <img className="img-fluid" src={ Logo } alt="logo" />
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <label className="label" htmlFor="email">
          <input
            placeholder="E-mail"
            className="form-control"
            data-testid="email-input"
            type="email"
            name="email"
            value={ user.email }
            onChange={ (e) => handleChange(e) }
          />

          <span>Example: teste@teste.com</span>
        </label>
        <label className="label" htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Password"
            value={ user.password }
            onChange={ (e) => handleChange(e) }
            className="form-control"
          />
          <span>Use 6 or more characters</span>
        </label>

      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          className="btn btn-success "
          data-testid="login-submit-btn"
          type="button"
          disabled={ disabled }
          onClick={ setLocal }
        >
          Enter
        </button>

      </div>

    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
