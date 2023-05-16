// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE_WALLET = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case 'SHOW_CURRENCIES':
    return {
      ...state,
      currencies: [...action.payload],
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'EDITED_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.id), action.payload],
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
