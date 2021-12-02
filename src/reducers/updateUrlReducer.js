import { UPDATE_URL , GET_URL } from '../constants';

const initialState = {};

const updateUrlReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_URL:
      return { ...state, url: action.payload };
    case GET_URL:
      console.log("get url")
console.log(action.payload)
    return { ...state, url: action.payload }
    default:
      return state;
  }
}

export default updateUrlReducer;
