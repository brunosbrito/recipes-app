import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailInputStr = 'email-input';
const passInputStr = 'password-input';
const loginSbmt = 'login-submit-btn';
const emailEx = 'jose@gmail.com';

describe('Testando o componente Header', () => {
  test('1 - Testa se ao clicar no botão de perfil, é redirecionando para a página de perfil', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passInput = screen.getByTestId(passInputStr);
    const buttonInput = screen.getByTestId(loginSbmt);
    userEvent.type(emailInput, emailEx);
    userEvent.type(passInput, '1234567');
    userEvent.click(buttonInput);
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/profile');
  });

  test('2 - Testa se ao clicar no botão de pesquisa, aparece ou some o campo de entrada', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passInput = screen.getByTestId(passInputStr);
    const buttonInput = screen.getByTestId(loginSbmt);
    userEvent.type(emailInput, emailEx);
    userEvent.type(passInput, '1234567');
    userEvent.click(buttonInput);

    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.getByTestId('search-input')).not.toBeInTheDocument();
  });

  test('3 - Testa o título na página Meals', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passInput = screen.getByTestId(passInputStr);
    const buttonInput = screen.getByTestId(loginSbmt);
    userEvent.type(emailInput, emailEx);
    userEvent.type(passInput, '1234567');
    userEvent.click(buttonInput);
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
  });
});
