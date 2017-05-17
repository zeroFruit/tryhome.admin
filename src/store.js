import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxPromise)(createStore);

export default createStoreWithMiddleware(reducers);
