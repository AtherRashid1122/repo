import axios from 'axios';
import { PRODUCT_DETAIL ,
         PRODUCT_DETAIL_FAIL,
         GET_ALL_PRODUCT ,
         GET_SEARCH_PRODUCT ,
         UPDATE_PRODUCT_INFO,
         UPDATE_PRODUCT_ALIAS,
         UPDATE_PRODUCT_INFO_FAIL,
         UPDATE_PRODUCT_LIST,
         UPDATE_PRODUCT_LIST_FAIL } from '../constants';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function GetProductDetail(id) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    if(id !== 0){
      axios({
            method: 'get',
            url: `${url}/products/${id}.json`,
            headers: {'Authorization': `Bearer ${access_token}`}
          })
          .then((data) => {
            dispatch({
                      type: PRODUCT_DETAIL,
                      payload: data.data.product
                    })
          })
          .catch((error) => {
          })
    }else{
      dispatch({
                type: PRODUCT_DETAIL_FAIL,
                payload: null
              })
    }
  }
}

export function GetAllProduct(data){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/products.json?filter=${data.filter}&sort=${data.sort}&order=${data.order}&is_kit=${data.is_kit}&limit=${data.limit}&offset=${data.offset}`,
          headers: {'Authorization': `Bearer ${access_token}`}
        })
        .then((res) => {
          dispatch({
                    type: GET_ALL_PRODUCT,
                    payload: res.data.products
                  })
        })
        .catch((error) => {
        })
  }
}

export function GetSearchProduct(data){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/products/search.json?search=${data.search}&sort=${data.sort}&order=${data.order}&is_kit=${data.is_kit}&limit=${data.limit}&offset=${data.offset}`,
          headers: {'Authorization': `Bearer ${access_token}`}
        })
        .then((res) => {
          dispatch({
                    type: GET_SEARCH_PRODUCT,
                    payload: res.data.products
                  })
        })
        .catch((error) => {
        })
  }
}

export function UpdateProductInfo(ID, data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    if(ID > 0){
      axios({
              method: 'put',
              url: `${url}/products/${ID}.json`,
              headers: {'Authorization': `Bearer ${access_token}`},
              data: data
            })
            .then( async (res) => {
                dispatch({
                      type: UPDATE_PRODUCT_INFO,
                      payload: {
                        data: res.data,
                        time: new Date()
                      }
                    })
              })
            .catch((error) => {
            })
    }else{
      dispatch({
                type: UPDATE_PRODUCT_INFO_FAIL,
                payload: null,
                time: new Date()
              })
    }
  }
}

export function updateProductAlias(ID, data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
            method: 'post',
            url: `${url}/products/${ID}/set_alias.json`,
            headers: {'Authorization': `Bearer ${access_token}`},
            data: data
          })
          .then( async (res) => {
              dispatch({
                    type: UPDATE_PRODUCT_ALIAS,
                    payload: res.data,
                    time: new Date()
                  })
            })
          .catch((error) => {
          })
  }
}


export function updateProductList(data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    if(data !== null){
      axios({
              method: 'post',
              url: `${url}/products/update_product_list.json`,
              headers: {'Authorization': `Bearer ${access_token}`},
              data: data
            })
            .then( async (res) => {
                dispatch({
                      type: UPDATE_PRODUCT_LIST,
                      payload: {
                        data: res.data,
                        time: new Date()
                      }
                    })
              })
            .catch((error) => {
            })
    }else{
      dispatch({
                type: UPDATE_PRODUCT_LIST_FAIL,
                payload: {
                  data: "",
                  time: new Date()
                }
              })
    }
  }
}