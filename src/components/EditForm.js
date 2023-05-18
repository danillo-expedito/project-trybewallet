import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { EDITED_EXPENSE, TOTAL_EXPENSE_EDITED, allCurrencies } from '../redux/actions';
import './Form.css';

class EditForm extends Component {
  constructor() {
    super();

    this.state = {
      currency: 'USD',
      value: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
      prevValue: '',
    };
  }

  componentDidMount() {
    const { dispatch, expenses, idToEdit } = this.props;
    dispatch(allCurrencies());

    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
    const { value, description,
      currency, method, tag, exchangeRates } = expenseToEdit;

    const prevCcyArray = Object.values(exchangeRates);
    const prevCcySelected = prevCcyArray.find((cur) => cur.code === currency);
    const prevValue = prevCcySelected.ask * parseFloat(value);

    this.setState({
      currency,
      value,
      method,
      tag,
      description,
      exchangeRates,
      prevValue,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatch, idToEdit } = this.props;
    const { value, currency, method, tag, description,
      exchangeRates, prevValue } = this.state;

    const id = idToEdit;
    const expensesObj = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    dispatch(EDITED_EXPENSE(idToEdit, expensesObj));

    const ccyArray = Object.values(exchangeRates);
    const ccySelected = ccyArray.find((cur) => cur.code === currency);
    const convertedValue = ccySelected.ask * parseFloat(value);
    dispatch(TOTAL_EXPENSE_EDITED(prevValue, convertedValue));

    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <form className="expense-form">
        <label htmlFor="value" className="value-input">
          Valor:
          <input
            type="number"
            id="value"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency" className="currency-input">
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
        <label htmlFor="method" className="method-select">
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
        <label htmlFor="tag" className="tag-select">
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
        <label htmlFor="description" className="description-input">
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
          className="submit-button"
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

EditForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    find: PropTypes.func,
  }).isRequired,
  idToEdit: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(EditForm);
