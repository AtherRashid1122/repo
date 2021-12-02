import axios from 'axios';
import { ORDER_LIST , 
         ORDER_LIST_FAIL,
         ORDER_DETAIL ,
         SEARCH_ORDER ,
         UPDATE_ORDER_QUANTITY ,
         ADD_ORDER_ITEMS ,
         REMOVE_ORDER_ITEMS,
         UPDATE_ORDER_INFO } from '../constants';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function GetOrderList(data , call){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    if(call === false){
      dispatch({
                type: ORDER_LIST_FAIL
              })
    }else{
      axios({
            method: 'get',
            url: `${url}/orders.json?filter=${data.filter}&order=${data.order}&limit=${data.limit}&offset=${data.offset}&app=${data.app}&count=${data.count}`,
            headers: {'Authorization': `Bearer ${access_token}`}
          })
          .then((res) => {
            dispatch({
                      type: ORDER_LIST,
                      payload: res.data
                    })
          })
          .catch((error) => {
          })
    }
  }
}

export function GetOrderDetail(detail) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/orders/${detail.id}.json`,
          headers: {'Authorization': `Bearer ${access_token}`}
          // data: detail.orderDetail
        })
        .then((data) => {
          dispatch({
                    type: ORDER_DETAIL,
                    payload: data.data.order
                  })
        })
        .catch((error) => {
        })
  }
}

export function SearchOrder(data){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/orders/search.json?search=${data.search}&order=${data.order}&limit=${data.limit}&offset=${data.offset}`,
          headers: {'Authorization': `Bearer ${access_token}`}
        })
        .then((res) => {
          dispatch({
                    type: SEARCH_ORDER,
                    payload: res.data.orders
                  })
        })
        .catch((error) => {
        })
  }
}


export function UpdateOrderQuantity(data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
            method: 'post',
            url: `${url}/orders/update_item_in_order.json`,
            headers: {'Authorization': `Bearer ${access_token}`},
            data: data
          })
          .then( async (res) => {
              dispatch({
                    type: UPDATE_ORDER_QUANTITY,
                    payload: res.data,
                    time: new Date()
                  })
            })
          .catch((error) => {
          })
  }
}

export function AddOrderItems(orderID , data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
            method: 'post',
            url: `${url}/orders/${orderID}/add_item_to_order.json`,
            headers: {'Authorization': `Bearer ${access_token}`},
            data: data
          })
          .then( async (res) => {
              dispatch({
                    type: ADD_ORDER_ITEMS,
                    payload: res.data,
                    time: new Date()
                  })
            })
          .catch((error) => {
          })
  }
}

export function RemoveOrderItems(data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
            method: 'post',
            url: `${url}/orders/remove_item_from_order.json`,
            headers: {'Authorization': `Bearer ${access_token}`},
            data: data
          })
          .then( async (res) => {
              dispatch({
                    type: REMOVE_ORDER_ITEMS,
                    payload: res.data,
                    time: new Date()
                  })
            })
          .catch((error) => {
          })
  }
}

export function UpdateOrderInfo(ID, data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
            method: 'put',
            url: `${url}/orders/${ID}.json`,
            headers: {'Authorization': `Bearer ${access_token}`},
            data: data
          })
          .then( async (res) => {
              dispatch({
                    type: UPDATE_ORDER_INFO,
                    payload: res.data,
                    time: new Date()
                  })
            })
          .catch((error) => {
          })
  }
}
