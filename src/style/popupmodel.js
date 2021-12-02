import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  alertContainer: {
      flex: 1,
      position: "absolute",
      top: 0,
      zIndex: 9999,
      // backgroundColor: "rgba(14, 14 , 14 , 0.7)",
      // justifyContent: "center",
      alignItems: "center",
      // height: "100%",
      width: "100%"
  },
   alertBox: {
      backgroundColor: "#ccc",
      opacity: 1,
      width: "95%",
      marginTop: 10,
      padding: 10,
      // borderRadius: 30,
      borderWidth: 2,
      borderColor: "#0003"
  },
  alertText: {
      flex: 8,
      color: "#000",
      textAlign: "left",
      fontWeight: "bold",
      fontSize: 16
  },
  alertClose: {
      flex: 2,
      color: "#000",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16
  },

})

export default styles;
