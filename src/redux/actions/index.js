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
