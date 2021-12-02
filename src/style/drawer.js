import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  drawerBackView:{
    flex: 1,
    zIndex: 15,
    backgroundColor: "rgba(226, 42 , 42 , 0)",
    height: "100%",
    width: "100%"
  },
  drawerMainView:{
    backgroundColor: "#000",
    height: "100%",
    width: "65%" ,
    paddingTop: 20,
  },
  closeButtonContainer:{
    flexDirection: "row" ,
    margin: 10
  },
  textStyle:{
    backgroundColor: "white" ,
    color: "black",
    margin: 5 ,
    paddingRight: 8 ,
    paddingLeft: 8 ,
    paddingTop: 10 ,
    paddingBottom: 10 ,
    borderRadius: 15
  },
  refreshButton:{
    marginTop: 5 ,
    marginBottom: 5
  },
  closeButton:{
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 30,
    padding: 2
  }
})
export default styles;
