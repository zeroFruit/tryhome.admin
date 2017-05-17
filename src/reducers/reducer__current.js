import {
  SITE_SELECTED,
  ITEM_SELECTED,
  CREATE_ITEM,
  URL_REDIRECTED,
  CHECK_SITE_EXIST,
  LOADING_SITE_DATA,
  LOADING_ITEM_DATA
} from '../actions/index';

import siteTypeReducer from './reducer__site_type';

const INITIAL_STATE = {
  Site: siteTypeReducer().A_SITE,
  Item: null,
  redirect: false,
  siteExist: false,
  LoadingSiteData: false,
  LoadingItemData: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SITE_SELECTED:
      return { ...state, Site: action.payload };
    case ITEM_SELECTED:
      return { ...state, Item: action.payload };
    case CREATE_ITEM:
      return { ...state, redirect: action.payload.redirect };
    case URL_REDIRECTED:
      return { ...state, redirect: action.payload.redirect };
    case CHECK_SITE_EXIST:
      return { ...state, siteExist: action.payload };
    case LOADING_SITE_DATA:
      return { ...state, LoadingSiteData: action.payload };
    case LOADING_ITEM_DATA:
      return { ...state, LoadingItemData: action.payload };
    default:
      return state;
  }
}
