import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerGradient: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerDrawerView: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleView: {
    width: "80%",
    // alignSelf: "center",
    // justifyContent: "center",
    // alignItems: "center",    
  },
  titleView: {
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
    paddingLeft: '25%',
  },
  headerTextView: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  drawerBtnView: {
    height: 30,
    width: "20%",
    justifyContent: "center",
    // alignItems: "flex-start",
    
  }
});

export default styles;
