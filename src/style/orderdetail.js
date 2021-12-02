import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderWidth: 1,
    paddingTop: 5
  },
  tabLabel: {
    padding: 10,
    textAlign: "center",
  },
  itemDetailContainer: {
    width: "100%",
    marginBottom: 115,
  },
  itemBox: {
    margin: 10,
    borderWidth: 1,
  },
  labelBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#336598",
    color: "#fff",
    width: "100%",
    textAlign: "center",
    padding: 10,
  },
  value: {
    flex: 8,
    padding: 10,
  },
  roundedBox: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  bgGray: {
    backgroundColor: "#dbdada",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  inputBox: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ffff",
  },
  activityContainer: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 1,
  },
  activityTab: {
    padding: 10,
    textAlign: "center",
  },
  activityIndex: {
    flex: 2,
    margin: 2,
    textAlign: "center",
  },
  activityDateBox: {
    flex: 19,
    margin: 2,
  },
  activityDate: {
    paddingBottom: 5,
    marginRight: 4,
    marginRight: 4,
  },
  logText: {
    flexWrap: "wrap",
    flex: 1,
    marginRight: 10,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  });
export default styles;
