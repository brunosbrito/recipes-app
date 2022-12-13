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

test('1 - Testando as categorias na página "meals"', async () => {
  const { history } = renderWithRouter(<App />);
  const emailInput = screen.getByTestId(emailInputStr);
  const passInput = screen.getByTestId(passInputStr);
  const buttonInput = screen.getByTestId(loginSbmt);
  userEvent.type(emailInput, emailEx);
  userEvent.type(passInput, '1234567');
  userEvent.click(buttonInput);

  act(() => {
    history.push('/meals');
  });
  // userEvent.click(screen.getByTestId('drinks-bottom-btn'));
  // userEvent.click(screen.getByTestId('meals-bottom-btn'));

  await waitFor(() => {
    const beefBtn = screen.getByTestId('Beef-category-filter');
    expect(beefBtn).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('Beef-category-filter'));
  const breakfestBtn = screen.getByTestId('Breakfast-category-filter');
  userEvent.click(breakfestBtn);
  const chickenBtn = screen.getByTestId('Chicken-category-filter');
  userEvent.click(chickenBtn);
  const dessertBtn = screen.getByTestId('Dessert-category-filter');
  userEvent.click(dessertBtn);
  const goatBtn = screen.getByTestId('Goat-category-filter');
  userEvent.click(goatBtn);
  userEvent.click(screen.getByTestId('All-category-filter'));
});
