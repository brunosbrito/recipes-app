import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';

test('1 - Test de Login', () => {
  renderWithRouter(<App />);
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  expect(emailInput).toBeInTheDocument();
  expect(passInput).toBeInTheDocument();
  expect(buttonInput).toBeInTheDocument();
  expect(buttonInput).toBeDisabled();
  userEvent.type(emailInput, 'jose@gmail.com');
  userEvent.type(passInput, '1234567');
  expect(buttonInput).toBeEnabled();
  userEvent.click(buttonInput);
  expect(window.localStorage.setItem).toHaveBeenCalled();
});

test('2 - Testando as categorias na página "drinks"', async () => {
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);

  act(() => {
    history.push('/drinks');
  });

  await waitFor(() => {
    const ordinaryDrinkBtn = screen.getByTestId('Ordinary Drink-category-filter');
    expect(ordinaryDrinkBtn).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('Ordinary Drink-category-filter'));
  const cocktailtBtn = screen.getByTestId('Cocktail-category-filter');
  userEvent.click(cocktailtBtn);
  const shakeBtn = screen.getByTestId('Shake-category-filter');
  userEvent.click(shakeBtn);
  const otherBtn = screen.getByTestId('Other / Unknown-category-filter');
  userEvent.click(otherBtn);
  const cocoaBtn = screen.getByTestId('Cocoa-category-filter');
  userEvent.click(cocoaBtn);
  userEvent.click(screen.getByTestId('All-category-filter'));
});
