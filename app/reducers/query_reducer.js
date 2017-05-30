import {
  GOT_QUERY
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case GOT_QUERY:
      return {
        payload: action.payload
      }
  }
  return state;
};
