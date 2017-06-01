import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import authReducer from './auth_reducer';
import queryReducer from './query_reducer';
import listSetReducer from './listSet_reducer';
import statusReducer from './status_reducer';

const rootReducer = combineReducers({
  form: reducer,
  auth: authReducer,
  query: queryReducer,
  listSet: listSetReducer,
  status: statusReducer
});

export default rootReducer;
