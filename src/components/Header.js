import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          { email }
        </p>
        <p
          data-testid="total-field"
        >
          { total.toFixed(2) }
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
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
