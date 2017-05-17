import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import siteIndex from './reducer__site_type';
import current from './reducer__current';
import items from './reducer__items';
import site from './reducer__site';
import orders from './reducer__orderlist';
import err from './reducer__err';

const rootReducer = combineReducers({
  siteIndex,
  current,
  items,
  site,
  orders,
  err,
  form: formReducer
});

export default rootReducer;
