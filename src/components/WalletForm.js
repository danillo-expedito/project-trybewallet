import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allCurrencies, allExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      currency: 'USD',
      value: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(allCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatch, expenses } = this.props;
    const { value, currency, method, tag, description } = this.state;

    const id = expenses.length;
    const expensesObj = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };

    dispatch(allExpenses(expensesObj));
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((curr) => (
              <option
                key={ Math.random() }
              >
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
