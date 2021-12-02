import { LOGIN_SUCCESS ,
         LOGIN_FAIL ,
         GENERAL_SETTINGS ,
         SCANPACK_SETTINGS ,
         USER_INFO_SUCCESS , 
         GET_BOTH_SETTINGS,
         USER_INFO_SUCCESS_FAIL
       } from '../constants';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return { ...state, status: action.payload , login: true  , error: "" , time: new Date()};
    case LOGIN_FAIL:
      return { ...state, status: "" , login: false  , error: action.payload , time: new Date()};
    case GET_BOTH_SETTINGS:
      return { ...state, bothSettings: action.payload };
    case GENERAL_SETTINGS:
      return { ...state, settings: action.payload };
    case SCANPACK_SETTINGS:
      return { ...state, scanpackSettings: action.payload}
    case USER_INFO_SUCCESS:
      return { ...state, userInfo: action.payload };
    case USER_INFO_SUCCESS_FAIL:
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

export default userReducer;
