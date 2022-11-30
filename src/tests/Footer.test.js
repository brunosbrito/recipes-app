import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

test('Testa se os ícones estão na tela e se os botões redirecionam para a página certa', () => {
  renderWithRouter(<App />);
  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  const mealIcon = screen.getByTestId('meals-bottom-btn');

  expect(drinksIcon).toBeInTheDocument();
  expect(mealIcon).toBeInTheDocument();
});

test('Testa se o botão de drinks redireciona para a página certa', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  const drinksIcon = screen.getByTestId('drinks-bottom-btn');

  userEvent.click(drinksIcon);
  expect(pathname).toBe('/drinks');
});

test('Testa se o botão de drinks redireciona para a página certa', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  const mealIcon = screen.getByTestId('meals-bottom-btn');

  userEvent.click(mealIcon);
  expect(pathname).toBe('/meals');
});
