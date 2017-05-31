import {
  LISTSET_SET
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case LISTSET_SET:
      return action.payload;
  }
  return state;
};
