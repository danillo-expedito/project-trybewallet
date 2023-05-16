export const LOG_IN = (email) => ({
  type: 'LOG_IN',
  email,
});

export const SHOW_CURRENCIES = (currencies) => ({
  type: 'SHOW_CURRENCIES',
  payload: currencies,
});

export const allCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  delete data.USDT;

  const curr = Object.keys(data);
  dispatch(SHOW_CURRENCIES(curr));
};

export const ADD_EXPENSES = (expenses) => ({
  type: 'ADD_EXPENSES',
  payload: expenses,
});

export const TOTAL_EXPENSE = (value) => ({
  type: 'TOTAL_EXPENSE',
  payload: value,
});

export const DELETE_EXPENSE = (id) => ({
  type: 'DELETE_EXPENSE',
  payload: id,
});

export const TOTAL_EXPENSE_MINUS = (value) => ({
  type: 'TOTAL_EXPENSE_MINUS',
  payload: value,
});

export const TOTAL_EXPENSE_EDITED = (prevValue, value) => ({
  type: 'TOTAL_EXPENSE_EDITED',
  prevValue,
  payload: value,
});

export const allExpenses = ({ id, value, description,
  currency, method, tag }) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  delete data.USDT;

  dispatch(ADD_EXPENSES({
    id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates: data,
  }));

  const ccyArray = Object.values(data);
  const ccySelected = ccyArray.find((cur) => cur.code === currency);
  const convertedValue = ccySelected.ask * parseFloat(value);
  dispatch(TOTAL_EXPENSE(convertedValue));
};

export const EDIT_EXPENSE = (id) => ({
  type: 'EDIT_EXPENSE',
  payload: id,
});

export const EDITED_EXPENSE = (id, expense) => ({
  type: 'EDITED_EXPENSE',
  id,
  payload: expense,
});
