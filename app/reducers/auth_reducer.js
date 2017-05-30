import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_USER_DATA
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: null,
        authenticated: true,
        user: null
      };
    case AUTH_USER_DATA:
      return {
        ...state,
        error: null,
        authenticated: true,
        user: action.payload
      };
    case UNAUTH_USER:
      return {
        ...state,
        error: null,
        authenticated: false,
        user: null
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        authenticated: false,
        user: null
      }
  }
  return state;
};
