import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import authReducer from './auth_reducer';
import queryReducer from './query_reducer';

const rootReducer = combineReducers({
  form: reducer,
  auth: authReducer,
  query: queryReducer
});

export default rootReducer;
