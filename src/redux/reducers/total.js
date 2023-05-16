const INITIAL_STATE_TOTAL = {
  totalExpense: 0,
};

const total = (state = INITIAL_STATE_TOTAL, action) => {
  switch (action.type) {
  case 'TOTAL_EXPENSE':
    return {
      ...state,
      totalExpense: state.totalExpense + action.payload,
    };
  case 'TOTAL_EXPENSE_MINUS':
    return {
      ...state,
      totalExpense: (state.totalExpense - action.payload) > 0
        ? state.totalExpense - action.payload
        : 0.00,
    };
  default:
    return state;
  }
};

export default total;
