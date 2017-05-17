import {
  FETCH_SITE
} from '../actions/index';

const INITIAL_STATE = {
  site: null
};


export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SITE:
      return { ...state, site: action.payload.data.site };
    default:
      return state;
  }
}
