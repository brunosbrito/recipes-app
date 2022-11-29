import React from 'react';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

test('Testa se os ícones estão na tela', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/menu');
  });
  const drinksIcon = screen.getByTestId('drinks-bottom-btn');
  expect(drinksIcon).toBeInTheDocument();
  const mealIcon = screen.getByTestId('meals-bottom-btn');
  expect(mealIcon).toBeInTheDocument();
});
test('', () => {

});
test('', () => {

});
