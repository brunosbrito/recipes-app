import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import corbaMock from './CorbaMock';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';
const path = '/meals/52977';

describe('Testando o componente RecipeDetails', () => {
  it('1 - Testa se carrega os elementos da receita "Corba" na página', async () => {
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
      json: jest.fn().mockResolvedValue(corbaMock),
    });

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));

    await waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      expect(title).toHaveTextContent('Corba');
    });

    const photo = screen.getByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();

    const category = screen.getByTestId('recipe-category');
    expect(category).toHaveTextContent('Side');

    await waitFor(() => {
      const firstRecomendationCard = screen.getByTestId('0-recommendation-card');
      expect(firstRecomendationCard).toBeInTheDocument();
    });

    for (let index = 0; index < 13; index += 1) {
      const ingredients = screen.getByTestId(`${index}-ingredient-name-and-measure`);
      expect(ingredients).toBeInTheDocument();
    }

    const startBtn = screen.getByRole('button', { name: 'Start Recipe' });
    userEvent.click(startBtn);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');

    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: { 52977: ['0', '1', '2'] } }));
    act(() => {
      history.push(path);
    });

    const continueBtn = screen.getByRole('button', { name: 'Continue Recipe' });
    userEvent.click(continueBtn);

    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        doneDate: '2022-12-13T15:24:26.349Z',
        tags: ['Soup'],
      },
    ]));
    act(() => {
      history.push(path);
    });

    expect(startBtn).not.toBeInTheDocument();
    expect(continueBtn).not.toBeInTheDocument();
  });
});
