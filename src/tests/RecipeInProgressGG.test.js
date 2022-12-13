import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import GGMock from './GGMock';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';

describe('Testando o componente RecipeInProgress usando o mock GG', () => {
  it('1 - Testa se carrega os elementos da receita "GG" na página', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passInput = screen.getByTestId(passInputStr);
    const buttonInput = screen.getByTestId(loginSbmt);
    userEvent.type(emailInput, emailEx);
    userEvent.type(passInput, '1234567');
    userEvent.click(buttonInput);

    act(() => {
      history.push('/drinks/15997/in-progress');
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(GGMock),
    });

    await waitFor(() => {
      const photo = screen.getByTestId('recipe-photo');
      expect(photo).toBeInTheDocument();
    });

    const title = screen.getByTestId('recipe-title');
    expect(title).toHaveTextContent('GG');

    const category = screen.getByTestId('recipe-category');
    expect(category).toHaveTextContent('Ordinary Drink');

    await waitFor(() => {
      for (let index = 0; index < 3; index += 1) {
        const ingredients = screen.getByTestId(`${index}-ingredient-step`);
        userEvent.click(ingredients);
        expect(ingredients).toBeInTheDocument();
      }
    });

    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
