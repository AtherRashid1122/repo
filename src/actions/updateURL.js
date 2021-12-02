import axios from 'axios';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UPDATE_URL , GET_URL } from '../constants';

export function UpdateUrl(url) {
  return async (dispatch) => {
        dispatch({
                    type: UPDATE_URL,
                    payload: url
                  })
        await AsyncStorage.setItem("url", url)
  }
}

export function GetUrl() {
  return async(dispatch) => {
        let url = await AsyncStorage.getItem("url")
        dispatch({
                    type: GET_URL,
                    payload: url
                  })
  }
}
