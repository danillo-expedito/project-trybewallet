import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DELETE_EXPENSE, EDIT_EXPENSE, TOTAL_EXPENSE_MINUS } from '../redux/actions';
import './Table.css';

class Table extends Component {
  handleSubmit = (id, total) => {
    const { dispatch } = this.props;

    dispatch(DELETE_EXPENSE(id));
    dispatch(TOTAL_EXPENSE_MINUS(total));
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;

    dispatch(EDIT_EXPENSE(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead className="table-head">
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
        <tbody className="table-body">
          {expenses.sort((a, b) => a.id - b.id).map(({ id, value, currency, method, tag,
            description, exchangeRates }) => {
            const exchangeCcy = Object.values(exchangeRates)
              .find((ccy) => ccy.code === currency);
            return (
              <tr key={ Math.random() } className="tr-table">
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{exchangeCcy.name}</td>
                <td>{parseFloat(exchangeCcy.ask).toFixed(2)}</td>
                <td>{(exchangeCcy.ask * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="edit-button"
                    onClick={ () => this.handleEdit(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="delete-button"
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
    sort: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
