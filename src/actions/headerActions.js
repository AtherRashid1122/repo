import { ORDER_BACK_BUTTON } from '../constants';

export function OrderBackButtonClick(){
  return (dispatch) => {
    dispatch({
                type: ORDER_BACK_BUTTON,
                payload: true
            })
  }
}
