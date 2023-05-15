import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { LOG_IN } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });

    const { email, password } = this.state;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (userEmail) => emailPattern.test(userEmail);
    const minLength = 5;
    if (validateEmail(email) && password.length >= minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleSubmit() {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    history.push('/carteira');
    dispatch(LOG_IN(email));
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <header>TRYBE WALLET</header>

        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
