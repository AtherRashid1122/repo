import { CLICK_SCAN , UPDATE_PRODUCT , SEARCH_SCANPACK_ORDER , SEARCH_SCANPACK_ORDER_FAIL} from '../constants';

const initialState = {};

 const scanpackReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_PRODUCT:
      return { ...state, updatedProduct: action.payload }
    case SEARCH_SCANPACK_ORDER:
      return { ...state, searchOrder: action.payload , time: new Date() }
    case SEARCH_SCANPACK_ORDER_FAIL:
      return { ...state, searchOrder: null , time: new Date() }
    default:
      return state;
  }
}

export default scanpackReducer;
