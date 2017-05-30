import {
  GOT_QUERY, ACCESS_TOKEN, ACCESS_TOKEN_ERROR
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case GOT_QUERY:
      return {
        code: action.payload.code,
        state: action.payload.state,
        access_token: null,
        error: null
      }
    case ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload,
        error: null
      }
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        error: "No Token"
      }
  }
  return state;
};
