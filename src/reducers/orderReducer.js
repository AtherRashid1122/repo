import { ORDER_LIST ,
         ORDER_LIST_FAIL,
         ORDER_DETAIL ,
         SEARCH_ORDER ,
         UPDATE_ORDER_QUANTITY ,
         ADD_ORDER_ITEMS ,
         REMOVE_ORDER_ITEMS,
         UPDATE_ORDER_INFO } from '../constants';

const initialState = {};

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case ORDER_LIST:
      return { ...state, list:action.payload };
    case ORDER_LIST_FAIL:
      return { ...state, list: null };
    case ORDER_DETAIL:
      return { ...state, order:action.payload };
    case SEARCH_ORDER:
      return { ...state, searchResult:action.payload };
    case UPDATE_ORDER_QUANTITY:
      return { ...state, updateOrderQuantity:action.payload };
    case ADD_ORDER_ITEMS:
      return { ...state, addOrderItems:action.payload };
    case REMOVE_ORDER_ITEMS: 
      return { ...state, removeOrderItems:action.payload };
    case UPDATE_ORDER_INFO:
      return { ...state, updateOrder:action.payload };
    default:
      return state;
  }
}

export default orderReducer;
