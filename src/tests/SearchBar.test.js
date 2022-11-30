import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const btnSearchId = 'exec-search-btn';
const glassId = 'search-top-btn';
const ingredientId = 'ingredient-search-radio';
const firstLetterId = 'first-letter-search-radio';
const nameId = 'name-search-radio';
const search = 'search-input';

describe('Realiza teste do componente SearchBar', () => {
  it('Verifica se o botão search esta na tela', () => {
    renderWithRouter(<App />);
    const email = 'teste@teste.com';
    const password = '1234567';
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const buttonInput = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, email);
    userEvent.type(passInput, password);
    userEvent.click(buttonInput);

    expect(buttonInput).toBeEnabled();

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    expect(screen.getByTestId(search)).toBeInTheDocument();
  });

  it('clicar no input radios Ingredientes (Meals)', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    const searchInput = screen.getByTestId(search);
    userEvent.type(searchInput, 'chicken');

    const ingredient = screen.getByTestId(ingredientId);
    userEvent.click(ingredient);

    const btnSearch = screen.getByTestId(btnSearchId);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('clicar no input radios First letter (Meals)', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    const searchInput = screen.getByTestId(search);
    userEvent.type(searchInput, 'a');

    const firstLetter = screen.getByTestId(firstLetterId);
    userEvent.click(firstLetter);

    const btnSearch = screen.getByTestId(btnSearchId);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('clicar no input radios Name (Meals)', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/meals'); });

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    const searchInput = screen.getByTestId(search);
    userEvent.type(searchInput, 'Arribata');

    const name = screen.getByTestId(nameId);
    userEvent.click(name);

    const btnSearch = screen.getByTestId(btnSearchId);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('clicar no input radios Name (Drink)', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    const searchInput = screen.getByTestId(search);
    userEvent.type(searchInput, 'a1');

    const name = screen.getByTestId(nameId);
    userEvent.click(name);

    const btnSearch = screen.getByTestId(btnSearchId);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('clicar no input radios Ingredientes (Drink)', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    const searchInput = screen.getByTestId(search);
    userEvent.type(searchInput, 'gin');

    const ingredient = screen.getByTestId(ingredientId);
    userEvent.click(ingredient);

    const btnSearch = screen.getByTestId(btnSearchId);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('clicar no input radios First letter (Drink)', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    const searchInput = screen.getByTestId(search);
    userEvent.type(searchInput, 'a');

    const firstLetterD = screen.getByTestId(firstLetterId);
    userEvent.click(firstLetterD);

    const btnSearch = screen.getByTestId(btnSearchId);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await waitFor(
      async () => expect(
        await screen.getByTestId('0-card-name'),
      ).toBeInTheDocument(),
      { timeout: 3000 },
    );
    await new Promise((r) => { setTimeout(r, 2000); });
  });
  it('Testa o Alert', () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/drinks'); });

    const buttonGlass = screen.getByTestId(glassId);
    userEvent.click(buttonGlass);

    const firstLetterD = screen.getByTestId(firstLetterId);
    userEvent.click(firstLetterD);

    const searchInput = screen.getByTestId(search);
    userEvent.type(searchInput, 'aa');
  });
  // it('verifica pathname Drinks', () => {
  //   const { history } = renderWithRouter(<App />);

  //   act(() => { history.push('/drinks'); });

  //   expect(history.location.pathname).toBe('/drinks');
  // });
});
