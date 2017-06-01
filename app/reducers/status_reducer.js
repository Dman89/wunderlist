import {
  SUCCESS, FAILURE
} from '../actions/types';

export default function(state=[], action) {
  switch(action.type) {
    case SUCCESS:
      let r = [].concat(...state, `https://www.wunderlist.com/#/lists/${action.payload}`);
      return r;
    case FAILURE:
      return [].concat(...state, `Failure; Contact Admin...`);
  }
  return state;
};
