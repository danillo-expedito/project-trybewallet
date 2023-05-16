import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import total from './total';

// Configure os seus reducers.
const rootReducer = combineReducers({ user, wallet, total });

export default rootReducer;
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
