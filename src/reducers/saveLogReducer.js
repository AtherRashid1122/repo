import { SUBMIT_LOG , SCANPACK_BUG_REPORT } from '../constants';

const initialState = {};

 const saveLogReducer = (state = initialState, action) => {
  switch(action.type) {
    case SUBMIT_LOG:
      return { ...state, logs:action.payload , updateLog: true , time: action.time };
    case SCANPACK_BUG_REPORT:
      return { ...state, updateReportLog: action.payload };
    default:
      return state;
  }
}

export default saveLogReducer;
