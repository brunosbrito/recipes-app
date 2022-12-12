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

describe('Testando o componente RecipeDetails Drinks', () => {
  it('1 - Testa se carrega os elementos da receita "GG" na página', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passInput = screen.getByTestId(passInputStr);
    const buttonInput = screen.getByTestId(loginSbmt);
    userEvent.type(emailInput, emailEx);
    userEvent.type(passInput, '1234567');
    userEvent.click(buttonInput);

    act(() => {
      history.push('/drinks/15997');
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(GGMock),
    });

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      expect(title).toBeInTheDocument();
    });

    const title = screen.getByTestId('recipe-title');
    expect(title).toHaveTextContent('GG');

    for (let index = 0; index < 3; index += 1) {
      const ingredients = screen.getByTestId(`${index}-ingredient-name-and-measure`);
      expect(ingredients).toBeInTheDocument();
    }

    const category = screen.getByTestId('recipe-category');
    expect(category).toHaveTextContent('Optional alcohol');

    await waitFor(() => {
      const firstRecomendationCard = screen.getByTestId('0-recommendation-card');
      expect(firstRecomendationCard).toBeInTheDocument();
    });

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
});
