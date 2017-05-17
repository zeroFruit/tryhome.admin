import _omit from 'lodash/omit';

import { FETCH_ITEMS, DELETE_ITEM } from '../actions/index';

const INITIAL_STATE = {
  all: [],
  size: 0,
  page: 0
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
         ...state,
         page: parseInt(action.payload.data.page),
         all: action.payload.data.list,
         size: action.payload.data.size
       };
    case DELETE_ITEM:
      let newItems = state.all.filter((item) => {
        if (item._id.toString() === action.payload.data._id.toString()) {
          return false;
        } else {
          return true;
        }
      });
      return { ...state, all: newItems };
    default:
      return state;
  }
}
