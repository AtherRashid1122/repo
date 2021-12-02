import axios from 'axios';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_SUCCESS , 
         LOGIN_FAIL ,
         GENERAL_SETTINGS ,
         SCANPACK_SETTINGS ,
         USER_INFO_SUCCESS ,
         GET_BOTH_SETTINGS ,
         USER_INFO_SUCCESS_FAIL
       } from '../constants';

export function Login(data){
  return async(dispatch) => {
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'post',
          url: `${url}/oauth/token`,
          headers: {"Access-Control-Allow-Origin": "*"},
          data: data
        })
        .then(async (res) => {
          await AsyncStorage.setItem("access_token" , res.data.access_token).then(() => {Logging()})
          dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.status,
                    time: new Date()
                  })

        })
        .catch((error) => {
          dispatch({
                    type: LOGIN_FAIL,
                    payload: error
                  })
        })
  }
}

const Logging = async() =>{
  let arr = JSON.stringify([]) 
  await AsyncStorage.setItem("Logging" , arr)
} 

export function UserInfo(call){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/home/userinfo.json`,
          headers: {'Authorization': `Bearer ${access_token}`}
        })
        .then( async(res) => {
          let data = JSON.stringify(res.data)
          await AsyncStorage.setItem("userInfo", data)
          call === false
          ?
          dispatch({
                    type: USER_INFO_SUCCESS_FAIL,
                    payload: res.data
                  })
          :
          dispatch({
                    type: USER_INFO_SUCCESS,
                    payload: res.data
                  })
        })
  }
}

export function GetBothSettings(){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/settings/get_setting.json`,
          headers: {'Authorization': `Bearer ${access_token}`}
        })
        .then((res) => {
          dispatch({
                    type: GET_BOTH_SETTINGS,
                    payload: {data: res.data , time: new Date()}
                  })
        })
        .catch((error) => {
        })
  }
}

export function GetGeneralSetting(){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/settings/get_settings.json`,
          headers: {'Authorization': `Bearer ${access_token}`}
        })
        .then((res) => {
          dispatch({
                    type: GENERAL_SETTINGS,
                    payload: {data: res.data , time: new Date()}
                  })
        })
        .catch((error) => {
        })
  }
}

export function GetScanPackSetting(){
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'get',
          url: `${url}/settings/get_scan_pack_settings.json`,
          headers: {'Authorization': `Bearer ${access_token}`}
        })
        .then((res) => {
          dispatch({
                    type: SCANPACK_SETTINGS,
                    payload: {data: res.data , time: new Date()}
                  })
        })
        .catch((error) => {
        })
  }
}

