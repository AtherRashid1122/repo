import { PRODUCT_DETAIL ,
         PRODUCT_DETAIL_FAIL ,
         UPDATE_PRODUCT_ALIAS ,
         GET_ALL_PRODUCT ,
         GET_SEARCH_PRODUCT ,
         UPDATE_PRODUCT_INFO ,
         UPDATE_PRODUCT_INFO_FAIL,
         UPDATE_PRODUCT_LIST,
         UPDATE_PRODUCT_LIST_FAIL } from '../constants';

const initialState = {};

 const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case PRODUCT_DETAIL:
      return { ...state, product:action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { ...state, product: null };
    case GET_ALL_PRODUCT:
      return { ...state, allProduct: action.payload };
    case GET_SEARCH_PRODUCT: 
      return { ...state, searchProduct: action.payload };	
    case UPDATE_PRODUCT_INFO:
      return { ...state, updateProduct: action.payload };
    case UPDATE_PRODUCT_ALIAS:
      return { ...state, updateProductAlias: action.payload };
    case UPDATE_PRODUCT_INFO_FAIL:
      return { ...state, updateProductAlias: action.payload , error : true };
    case UPDATE_PRODUCT_LIST:
      return { ...state, updateProductList: action.payload };
    case UPDATE_PRODUCT_LIST_FAIL:
      return { ...state, updateProductList: action.payload };
    default:
      return state;
  }
}

export default productReducer;
