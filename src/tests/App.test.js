import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

test('1 - Test de Login', () => {
  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passInput = screen.getByTestId('password-input');
  const buttonInput = screen.getByTestId('login-submit-btn');
  expect(emailInput).toBeInTheDocument();
  expect(passInput).toBeInTheDocument();
  expect(buttonInput).toBeInTheDocument();
  expect(buttonInput).toBeDisabled();
  userEvent.type(emailInput, 'jose@gmail.com');
  userEvent.type(passInput, '1234567');
  expect(buttonInput).toBeEnabled();
});
