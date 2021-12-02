import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import scanpackReducer from '../reducers/scanpackReducer';
import updateUrlReducer from "../reducers/updateUrlReducer";
import productReducer from "../reducers/productReducer";
import orderReducer  from "../reducers/orderReducer";
import userReducer from "../reducers/userReducer";
import updateAsyncReducer from "../reducers/updateAsyncReducer";
import saveLogReducer from "../reducers/saveLogReducer";
import headerReducer from "../reducers/headerReducer";

const rootReducer = combineReducers(
  {
    scanpack: scanpackReducer,
    updateUrl: updateUrlReducer,
    product: productReducer,
    order: orderReducer,
    user: userReducer,
    updateAsync: updateAsyncReducer,
    saveLog: saveLogReducer,
    header: headerReducer
  }
);

const middleware = applyMiddleware(reduxThunk);
const enhancer = compose(middleware);

const configureStore = () => {
  return createStore(rootReducer, enhancer);
}

export default configureStore;
