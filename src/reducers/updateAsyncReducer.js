import { SET_ITEM_SUCCESS , GET_ITEM_SUCCESS , GET_ITEM_FAIL } from '../constants';

const initialState = {};

const updateAsyncReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_ITEM_SUCCESS:
      return { ...state, storeData: action.payload , set_item: true };
    case GET_ITEM_SUCCESS:
      return { ...state, retriveData: action.payload , get_item: true , time: action.time };
    case GET_ITEM_FAIL:
      return { ...state, retriveData: action.payload , get_item: false };
    default:
      return state;
  }
}

export default updateAsyncReducer;
