// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE_USER = { email: '' };

const user = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
