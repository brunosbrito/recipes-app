import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';

describe('Testando o componente FavoriteRecipes', () => {
  it('1 - Testa se carrega os elementos da página FavoriteRecipes', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [{
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        name: 'Corba',
        image: 'https://www.themealdb.com//images//media//meals//58oia61564916529.jpg',
        doneDate: '12/12/2022',
        tags: ['Soup'],
      }, {
        id: '15997"',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        doneDate: '12/12/2022',
        tags: [],
      }],
    ));
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passInput = screen.getByTestId(passInputStr);
    const buttonInput = screen.getByTestId(loginSbmt);
    userEvent.type(emailInput, emailEx);
    userEvent.type(passInput, '1234567');
    userEvent.click(buttonInput);

    act(() => {
      history.push('/favorite-recipes');
    });

    await waitFor(() => {
      const photo = screen.getByTestId('0-horizontal-image');
      expect(photo).toBeInTheDocument();
    });

    const title = screen.getByTestId('page-title');
    expect(title).toHaveTextContent('Favorite Recipes');

    const mealsFilterBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealsFilterBtn);

    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinksFilterBtn);

    const allFilterBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allFilterBtn);

    window.document.execCommand = jest.fn(() => true);
    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(firstShareBtn).toBeInTheDocument();
    userEvent.click(firstShareBtn);

    const secondShareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(secondShareBtn).toBeInTheDocument();
    userEvent.click(secondShareBtn);

    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
  });
});
