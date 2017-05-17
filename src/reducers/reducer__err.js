import { CHECK_FORM_ERR } from '../actions/index';

const INITIAL_STATE = {
  form: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_FORM_ERR:
      return { ...state, form: action.payload }
    default:
      return state;
  }
}
