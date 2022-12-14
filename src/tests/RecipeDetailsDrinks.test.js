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
const path = '/drinks/15997';
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
      history.push(path);
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(GGMock),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      expect(title).toHaveTextContent('GG');
    });

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();

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

    const startBtn = screen.getByRole('button', { name: 'Start Recipe' });
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 15997: ['0', '1'] }, meals: {} }));
    act(() => {
      history.push(path);
    });

    const continueBtn = screen.getByRole('button', { name: 'Continue Recipe' });
    userEvent.click(continueBtn);

    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        doneDate: '2022-12-13T15:20:17.965Z',
        tags: [],
      },
    ]));
    act(() => {
      history.push(path);
    });

    expect(startBtn).not.toBeInTheDocument();
    expect(continueBtn).not.toBeInTheDocument();
  });
});
