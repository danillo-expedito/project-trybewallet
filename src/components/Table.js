import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Descrição</th>
            <th>Câmbio utilizado</th>
            <th>Moeda de conversão</th>
            <th>Valor convertido</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ value, currency, method, tag,
            description, exchangeRates }) => {
            const exchangeCcy = Object.values(exchangeRates)
              .find((ccy) => ccy.code === currency);
            return (
              <tr key={ Math.random() }>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{exchangeCcy.name}</td>
                <td>{method}</td>
                <td>{tag}</td>
                <td>{description}</td>
                <td>{parseFloat(exchangeCcy.ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{(exchangeCcy.ask * value).toFixed(2)}</td>
                <td>Editar/Excluir</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
