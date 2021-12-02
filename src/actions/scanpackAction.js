import axios from 'axios';
import { UPDATE_PRODUCT , SEARCH_SCANPACK_ORDER , SEARCH_SCANPACK_ORDER_FAIL } from '../constants';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SearchScanpackOrder(data , call) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    if(call === false){
      dispatch({
                type: SEARCH_SCANPACK_ORDER_FAIL,
                payload: ""
              })
    }else{
      axios({
            method: 'post',
            url: `${url}/scan_pack/scan_barcode.json`,
            headers: {'Authorization': `Bearer ${access_token}`},
            data: data
          })
          .then((res) => {
            dispatch({
                      type: SEARCH_SCANPACK_ORDER,
                      payload: res.data
                    })
          })
          .catch((error) => {
          })
    }
  }
}


export function UpdateProduct(data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'post',
          url: `${url}/products/update_product_list.json?id=${data.id}&var=${data.name}&value=${data.value}`,
          headers: {'Authorization': `Bearer ${access_token}`}
          // data: data
        })
        .then((data) => {
          dispatch({
                    type: UPDATE_PRODUCT,
                    payload: data.data.data
                  })
        })
        .catch((error) => {
        })
  }
}
