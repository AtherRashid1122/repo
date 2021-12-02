import React from 'react';
import Main from './src/components/main';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import SignIn from './src/components/login/signin';
import { View, Text, TextInput ,Image , Dimensions , TouchableOpacity , Platform , ScrollView } from 'react-native';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
} from '@expo-google-fonts/poppins';

const store = configureStore()

export default function App(){
 let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black
 });

 if(!fontsLoaded) {
   return <Text>Loading!</Text>
 } else {
  return (
    <Provider store = {store}>
      <Main/>
      {/* <SignIn/> */}
    </Provider>
  );
 }
}
