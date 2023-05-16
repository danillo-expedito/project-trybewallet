import React, { Component } from 'react';

class Table extends Component {
  render() {
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
        <tbody />
      </table>
    );
  }
}

export default Table;
