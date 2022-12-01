import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';

test('Testa se o botão de drinks redireciona para a página certa', () => {
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);

  userEvent.click(screen.getByTestId('drinks-bottom-btn'));
  expect(history.location.pathname).toBe('/drinks');
});

test('Testa se o botão de meals redireciona para a página certa', () => {
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);

  userEvent.click(screen.getByTestId('meals-bottom-btn'));
  expect(history.location.pathname).toBe('/meals');
});
