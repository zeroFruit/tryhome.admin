import { FETCH_ORDER_LIST } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  size: 0,
  page: 0
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ORDER_LIST:
      return {
        ...state,
        page: parseInt(action.payload.data.page),
        all: action.payload.data.list,
        size: action.payload.data.size
      };
    default:
      return state;
  }
}
