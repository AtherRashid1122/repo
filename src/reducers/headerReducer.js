import { ORDER_BACK_BUTTON } from '../constants';

const initialState = {};

const headerReducer = (state = initialState, action) => {
  switch(action.type) {
    case ORDER_BACK_BUTTON:
      return { ...state, orderBackButton: true };
    default:
      return state;
  }
}

export default headerReducer;