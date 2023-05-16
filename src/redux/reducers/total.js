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
  default:
    return state;
  }
};

export default total;
