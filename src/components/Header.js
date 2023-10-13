import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div className="header">
        <div className="title-container">
          <h2>Trybewallet 🪙</h2>
        </div>
        <div className="user-container">
          <p
            data-testid="email-field"
            className="user-email"
          >
            Email:
            {' '}
            { email }
          </p>
          <div className="total-expense-field">
            <p>
              Despesa Total: R$
              {' '}
            </p>
            <p
              data-testid="total-field"
            >
              { total.toFixed(2) }
            </p>
            <p
              data-testid="header-currency-field"
              className="brl"
            >
              BRL
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.shape({
    toFixed: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.total.totalExpense,
});

export default connect(mapStateToProps)(Header);
