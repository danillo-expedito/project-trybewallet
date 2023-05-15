import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      currency: 'USD',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(allCurrencies());
  }

  render() {
    const { currencies } = this.props;
    const { currency } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
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
          <select id="method" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select id="tag" data-testid="tag-input">
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
          />
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
