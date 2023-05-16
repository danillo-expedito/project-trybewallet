import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DELETE_EXPENSE, TOTAL_EXPENSE_MINUS } from '../redux/actions';

class Table extends Component {
  handleSubmit = (id, total) => {
    const { dispatch } = this.props;

    dispatch(DELETE_EXPENSE(id));
    dispatch(TOTAL_EXPENSE_MINUS(total));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ id, value, currency, method, tag,
            description, exchangeRates }) => {
            const exchangeCcy = Object.values(exchangeRates)
              .find((ccy) => ccy.code === currency);
            return (
              <tr key={ Math.random() }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{exchangeCcy.name}</td>
                <td>{parseFloat(exchangeCcy.ask).toFixed(2)}</td>
                <td>{(exchangeCcy.ask * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button>Editar</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleSubmit(id, (exchangeCcy.ask * value)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
