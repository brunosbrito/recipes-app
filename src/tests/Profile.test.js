import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';
const profBtn = 'profile-done-btn';

test('1 - Test de Header e elementos', () => {
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);
  act(() => {
    history.push('/profile');
  });
  const emailHeader = screen.getByTestId('profile-email');
  expect(emailHeader).toContainHTML('jose@gmail.com');
  const botaoDone = screen.getByTestId(profBtn);
  const botaoFavorite = screen.getByTestId('profile-favorite-btn');
  const botaoLogout = screen.getByTestId('profile-logout-btn');
  expect(botaoDone).toBeInTheDocument();
  expect(botaoFavorite).toBeInTheDocument();
  expect(botaoLogout).toBeInTheDocument();
});

test('2 - Test redirecionamento: Done Meals', () => {
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);
  act(() => {
    history.push('/profile');
  });
  const botaoDone = screen.getByTestId(profBtn);
  userEvent.click(botaoDone);
  const { pathname } = history.location;
  expect(pathname).toBe('/done-recipes');
});

test('3 - Test redirecionamento: Favorite Meals', () => {
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);
  act(() => {
    history.push('/profile');
  });
  const botaoFavorite = screen.getByTestId('profile-favorite-btn');
  userEvent.click(botaoFavorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorite-recipes');
});

test('4 - Test redirecionamento: Logout', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear');
  Object.setPrototypeOf(window.localStorage.clear, jest.fn());
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);
  act(() => {
    history.push('/profile');
  });
  const botaoLogout = screen.getByTestId('profile-logout-btn');
  userEvent.click(botaoLogout);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  expect(window.localStorage.clear).toHaveBeenCalled();
});
