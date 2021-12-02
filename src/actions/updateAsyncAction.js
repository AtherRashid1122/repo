import axios from 'axios';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_ITEM_SUCCESS , GET_ITEM_SUCCESS , GET_ITEM_FAIL } from '../constants';

export function SetItem(key , value) {
  return async(dispatch) => {
    await AsyncStorage.setItem(key , value)
    .then(
        dispatch({
                type: SET_ITEM_SUCCESS,
                payload: true
              })
      )
  }
}

export function GetItem(key) {
  return async(dispatch) => {
    await AsyncStorage.getItem(key)
    .then((res) => {
      if(res !== null){
        dispatch({
                  type: GET_ITEM_SUCCESS,
                  payload: res,
                  time: new Date()
                })
      }else{
        dispatch({
                  type: GET_ITEM_FAIL,
                  payload: false
                })
      }
    })
  }
}
