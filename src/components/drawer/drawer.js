import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import styles from "../../style/drawer";
import stylesAlert from "../../style/scanpack";
import globalStyles from "../../style/global";
import { connect } from "react-redux";
import * as RootNavigation from "../root_navigation";
import { SetItem, GetItem } from "../../actions/updateAsyncAction";
import { SubmitLog, ScanPackBugReport } from "../../actions/saveLogAction";
import LogoutIcon from "../../../assets/logout_icon.png";
import SupportIcon from "../../../assets/support_icon.png";
import CloseDrawerIcon from "../../../assets/close_drawer.png";
import ExIcon from "../../../assets/G_Ex_icon.png";
import BugIcon from "../../../assets/bug_icon.png";
import ScannerIcon from "../../../assets/scanner_icon.png";
import { fontFamily } from "../../helpers/fontFamily";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

const windowHeight = Dimensions.get("window").height;

let localLogCheck = false;
let updateLogLocal = false;
let reportBug = false;
let reportLogSuccess = false;

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: "",
      localLogPopUp: false,
      reportBugPopUp: false,
      logTime: "",
      feedbackField: "",
      feedbackFieldError: false,
      spinner: false,
      windowWidth: Dimensions.get("window").width,
    };
  }
  updateDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.getUserInfo();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  getUserInfo = async () => {
    let info = await AsyncStorage.getItem("userInfo");
    if (info) {
      let userInfo = info && JSON.parse(info);
      this.setState({ userInfo });
    }
  };

  redirect(page) {
    RootNavigation.reset(page);
    this.props.closeDrawer();
  }

  logout = async () => {
    try {
      // await AsyncStorage.removeItem("access_token")
      await AsyncStorage.clear();
      this.redirect("SignIn");
    } catch (e) {}
  };

  componentDidUpdate() {
    if (
      localLogCheck &&
      this.props &&
      this.props.localLog &&
      this.props.localLog.retriveData &&
      this.props.localLog.retriveData !== this.state.localData
    ) {
      localLogCheck = false;
      let tempLocal = this.props.localLog && this.props.localLog.retriveData;
      if (tempLocal !== " ") {
        let tempConvert = tempLocal !== " " && JSON.parse(tempLocal);
        if (tempConvert && tempConvert.length > 0) {
          this.setState({ localLogPopUp: true });
        }
        this.setState({ localData: tempLocal });
      }
      // else{
      //     this.discardChanges()
      // }
    } else {
      if (
        localLogCheck &&
        this.props &&
        this.props.localLog &&
        this.props.localLog.retriveData === false
      ) {
        localLogCheck = false;
        this.discardChanges();
      }
    }

    if (updateLogLocal && this.props.updateLog.time !== this.state.logTime) {
      if (
        this.props.updateLog &&
        this.props.updateLog.logs &&
        this.props.updateLog.logs.status === "OK" &&
        this.props.updateLog.updateLog &&
        this.props.updateLog.time
      ) {
        updateLogLocal = false;
        this.setState({ logTime: this.props.updateLog.time });
        RootNavigation.reset("ScanPack", "refreshButton");
        this.props.closeDrawer();
      }
    }

    if (this.props && this.props.updateReportLog && reportLogSuccess) {
      reportLogSuccess = false;
      this.setState({
        reportBugPopUp: false,
        feedbackField: "",
        spinner: false,
      });
      RootNavigation.reset("ScanPack", "refreshButton");
      this.props.closeDrawer();
    }
  }

  clearStore = () => {
    localLogCheck = true;
    this.props.GetItem("logsArray");
  };

  dismissPopUp = () => {
    this.setState({ localLogPopUp: false, reportBugPopUp: false });
    RootNavigation.reset("ScanPack");
    this.props.closeDrawer();
  };

  discardChanges = async () => {
    await AsyncStorage.removeItem("logsArray");
    await AsyncStorage.removeItem("storeOrder");
    // await AsyncStorage.multiRemove(["logsArray"] , ["storeOrder"])
    RootNavigation.reset("ScanPack", "refreshButton");
    this.props.closeDrawer();
  };

  saveChanges = async () => {
    updateLogLocal = true;
    localLogCheck = true;
    let getItem = await AsyncStorage.getItem("logsArray");
    let convert = getItem && JSON.parse(getItem);
    this.props.SubmitLog(convert);
  };

  reportBug() {
    this.setState({ reportBugPopUp: true });
  }

  validation = () => {
    let feedback =
      this.state.feedbackField && this.state.feedbackField.trim(" ");
    if (feedback === "") {
      this.setState({ feedbackFieldError: true });
    } else {
      return true;
    }
  };

  submitBugReport = async () => {
    let logging = await AsyncStorage.getItem("Logging");
    let LoggingArray = JSON.parse(logging);
    let bugObject = {
      feedback: this.state.feedbackField,
      logs: LoggingArray,
    };
    if (this.validation() === true) {
      this.setState({ spinner: true });
      this.props.ScanPackBugReport(bugObject);
      reportLogSuccess = true;
    }
  };

  cancelBugReport() {
    this.props.closeDrawer();
  }

  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        {this.state.reportBugPopUp === true ? (
          <SafeAreaView
            style={[stylesAlert.alertContainer, { height: "100%" }]}
          >
            {this.state.spinner ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            ) : (
              <View style={stylesAlert.alertBox}>
                <View style={globalStyles.flexDirectionRow}>
                  <Text style={stylesAlert.alertText}></Text>
                  <TouchableOpacity onPress={() => this.dismissPopUp()}>
                    <Text style={stylesAlert.alertClose}>X</Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Feedback
                </Text>
                <View style={{ marginTop: 20 }}>
                  {this.state.feedbackFieldError && (
                    <Text style={{ color: "#d40b0b", padding: 10 }}>
                      Field is required to submit
                    </Text>
                  )}
                  <TextInput
                    placeholder="Type your feedback message"
                    name="feedbackField"
                    autoFocus={true}
                    onChangeText={(text) => {
                      this.setState({
                        feedbackField: text,
                        feedbackFieldError: false,
                      });
                    }}
                    style={{
                      backgroundColor: "#fff",
                      padding: 10,
                      borderRadius: 20,
                    }}
                    autoCapitalize="none"
                    onSubmitEditing={() => this.submitBugReport()}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 50,
                  }}
                >
                  <TouchableOpacity
                    style={[
                      stylesAlert.alertSubmitBox,
                      { marginRight: 5, marginLeft: 5 },
                    ]}
                    onPress={() => this.submitBugReport()}
                  >
                    <Text style={stylesAlert.alertSubmitBtn}>
                      Submit Report
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      stylesAlert.alertSubmitBox,
                      { marginRight: 5, marginLeft: 5 },
                    ]}
                    onPress={() => this.cancelBugReport()}
                  >
                    <Text style={stylesAlert.alertSubmitBtn}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </SafeAreaView>
        ) : (
          <React.Fragment>
            {this.state.localLogPopUp ? (
              <SafeAreaView
                style={[stylesAlert.alertContainer, { height: windowHeight }]}
              >
                <View style={stylesAlert.alertBox}>
                  <View style={globalStyles.flexDirectionRow}>
                    <Text style={stylesAlert.alertText}></Text>
                    <TouchableOpacity onPress={() => this.dismissPopUp()}>
                      <Text style={stylesAlert.alertClose}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Are you want to save changes ?
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      margin: 50,
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        stylesAlert.alertSubmitBox,
                        { marginRight: 5, marginLeft: 5 },
                      ]}
                      onPress={() => this.saveChanges()}
                    >
                      <Text style={stylesAlert.alertSubmitBtn}>
                        Save Changes
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        stylesAlert.alertSubmitBox,
                        { marginRight: 5, marginLeft: 5 },
                      ]}
                      onPress={() => this.discardChanges()}
                    >
                      <Text style={stylesAlert.alertSubmitBtn}>
                        Discard Changes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            ) : (
              <SafeAreaView
                style={[styles.drawerBackView, globalStyles.positionFixed]}
              >
                <View style={[styles.drawerMainView, { position: "relative" }]}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                    }}
                  >
                    <TouchableOpacity style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: "#778fa5",
                          fontFamily: fontFamily.font600,
                          fontSize: 14,
                        }}
                      >
                        Log Out
                      </Text>
                      <View style={{ width: 30, height: 30 }}>
                        <Image
                          source={LogoutIcon}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{
                          width: 80,
                          height: 80,
                          borderWidth: 2,
                          borderColor: "#778fa5",
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {this.state.userInfo.current_tenant && (
                          <Text
                            style={{
                              color: "#778fa5",
                              fontFamily: fontFamily.font700,
                              fontSize: 70,
                              textTransform: "uppercase",
                            }}
                          >
                            {this.state.userInfo.current_tenant[0]}
                          </Text>
                        )}
                      </View>
                      <Text
                        style={{
                          color: "#778fa5",
                          fontFamily: fontFamily.font400,
                          fontSize: 16,
                        }}
                      >
                        {this.state.userInfo.current_tenant}
                      </Text>
                      <Text
                        style={{
                          color: "#778fa5",
                          fontFamily: fontFamily.font700,
                          fontSize: 16,
                        }}
                      >
                        {this.state.userInfo.username}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => this.dismissPopUp()}
                        style={{ width: 30, height: 30 }}
                      >
                        <Image
                          source={CloseDrawerIcon}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    {/* brand */}
                  </View>
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    locations={[0, 1]}
                    colors={["#577189", "#526c84"]}
                    style={{
                      height: 1,
                      width: "70%",
                      backgroundColor: "#778fa5",
                      marginTop: 50,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.redirect("ScanPack")}
                    style={{
                      marginTop: 50,
                      paddingHorizontal: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: 30, height: 30 }}>
                      <Image
                        source={ScannerIcon}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        color: "#778fa5",
                        fontFamily: fontFamily.font700,
                        fontSize: 16,
                        marginLeft: 5,
                      }}
                    >
                      Scan & Verify
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 50,
                      paddingHorizontal: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      this.redirect("OrderList");
                    }}
                  >
                    <Text style={styles.textStyle}>Order List</Text>
                  </TouchableOpacity>
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    locations={[0, 1]}
                    colors={["#577189", "#526c84"]}
                    style={{
                      height: 1,
                      width: "70%",
                      backgroundColor: "#778fa5",
                      marginTop: 100,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      paddingHorizontal: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: 30, height: 30 }}>
                      <Image
                        source={SupportIcon}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        color: "#778fa5",
                        fontFamily: fontFamily.font700,
                        fontSize: 16,
                        marginLeft: 5,
                      }}
                    >
                      Get Support
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.reportBug.bind(this)}
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ width: 30, height: 30 }}>
                      <Image
                        source={BugIcon}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={{
                        color: "#778fa5",
                        fontFamily: fontFamily.font700,
                        fontSize: 16,
                        marginLeft: 5,
                      }}
                    >
                      Report a bug
                    </Text>
                  </TouchableOpacity>
                  <View style={{ position: "absolute", bottom: 20, left: 10 }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <View style={{ width: 100, height: 100 }}>
                        <Image
                          source={ExIcon}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{ marginBottom: 10, marginLeft: 5 }}>
                        <Text
                          style={{
                            color: "#778fa5",
                            fontFamily: fontFamily.font500,
                            fontSize: 14,
                          }}
                        >
                          GroovePacker EX
                        </Text>
                        <Text
                          style={{
                            color: "#778fa5",
                            fontFamily: fontFamily.font500,
                            fontSize: 14,
                          }}
                        >
                          Expo v {Constants.expoVersion}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    localLog: state.updateAsync,
    updateLog: state.saveLog,
    updateReportLog: state.saveLog.updateReportLog,
  };
};

const mapDispatchToProps = {
  SetItem,
  GetItem,
  SubmitLog,
  ScanPackBugReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
