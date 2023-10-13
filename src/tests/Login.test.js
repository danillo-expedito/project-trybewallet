import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a funcionalidade da página de login', () => {
  it('Se os elementos de input estão presentes na tela', () => {
    renderWithRouterAndRedux(<App />);

    const mainTitle = screen.getByRole('banner');
    const emailInput = screen.getByPlaceholderText(/e-mail de usuário/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(mainTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });
  it('Se o botão é ativado após digitar email e senha válidos', () => {
    renderWithRouterAndRedux(<App />);

    const emailTest = 'teste@teste.com';
    const passwordTest = 'zklmon';

    const emailInput = screen.getByPlaceholderText(/e-mail de usuário/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);

    expect(loginBtn).not.toBeDisabled();
  });
  it('Se o botão redireciona para a página da carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/e-mail de usuário/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'pessoa@email.com');
    userEvent.type(passwordInput, 'testeteste');
    expect(loginBtn).not.toBeDisabled();

    userEvent.click(loginBtn);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
});
