import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../../style/popupmodel';
import globalStyles from '../../style/global';
import closeButton from "../../../assets/closeicon.png";
import { LinearGradient } from 'expo-linear-gradient';

export default function PopUpModel(props) {
  return (
    <View style={styles.alertContainer}>
      <LinearGradient
        locations={[0,1]}
        colors={["#9e0c0c","#cc4343"]}
        style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#b7b7b7", padding: 5, borderRadius: 10, width: "80%", marginLeft: "auto", marginRight: "auto", padding: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 10, shadowRadius: 10 }}>
        <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 16, color: "#fff" }}>
          {props.message}
        </Text>
        <TouchableOpacity onPress={props.closeAlert}>
          <Image source={closeButton ? closeButton : ""}
            style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

