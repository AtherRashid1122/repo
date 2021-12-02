import axios from 'axios';
import { SUBMIT_LOG , SCANPACK_BUG_REPORT } from '../constants';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SubmitLog(data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    await AsyncStorage.getItem('logsArray').then((log) => {
      axios({
            method: 'post',
            url: `${url}/scan_pack/scan_pack_v2`,
            headers: {'Authorization': `Bearer ${access_token}`},
            data: { data , app: "app"}
          })
          .then( async (res) => {
              dispatch({
                    type: SUBMIT_LOG,
                    payload: res.data,
                    time: new Date()
                  })
              if(res.status === 200){
                await AsyncStorage.removeItem("logsArray")
              }
            })
          .catch((error) => {
          })
    })
  }
}

export function ScanPackBugReport(data) {
  return async(dispatch) => {
    const access_token = await AsyncStorage.getItem("access_token")
    const url = await AsyncStorage.getItem("url")
    axios({
          method: 'post',
          url: `${url}/scan_pack/scan_pack_bug_report.json`,
          headers: {'Authorization': `Bearer ${access_token}`},
          data: data
        })
        .then( async(res) => {
          dispatch({
                    type: SCANPACK_BUG_REPORT,
                    payload: {
                      data: res.data,
                      time: new Date()  
                    }
                  })
          if(res.status === 200){
            await AsyncStorage.removeItem("Logging")
          }
        })
        .catch((error) => {
        })
  }
}