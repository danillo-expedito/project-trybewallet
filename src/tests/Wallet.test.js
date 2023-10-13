import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Teste da presença dos elementos que compõem o Componente Header', () => {
  it('Se há a presença de um heading no componente', () => {
    renderWithRouterAndRedux(<Wallet />);

    const title = screen.getByRole('heading', { name: /trybewallet/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
  it('Se há um elemento com o email do usuário', () => {
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

    const emailUser = screen.getByText(/email: pessoa@email\.com/i);
    expect(emailUser).toBeInTheDocument();
  });
  it('Se os elementos da despesa total estão presentes', () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalExpense = screen.getByText(/despesa total: r\$/i);
    const value = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(totalExpense).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency.innerHTML).toBe('BRL');
  });
});
