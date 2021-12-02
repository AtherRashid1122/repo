import React, { Component } from "react";
import {
  View,
  Text,
  // AsyncStorage,
  ActivityIndicator,
  Platform,
  Alert,
  Dimensions,
  BackHandler,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { GetItem, SetItem } from "../../actions/updateAsyncAction";

import {
  GetOrderDetail,
  UpdateOrderQuantity,
  RemoveOrderItems,
  UpdateOrderInfo,
} from "../../actions/orderActions";
import { OrderBackButtonClick } from "../../actions/headerActions";
import ItemsDetail from "./items_detail";
import NotesDetail from "./notes_detail";
import { SubmitLog } from "../../actions/saveLogAction";
import ActivitiesExceptionDetail from "./activities_exception_detail";
import MultiBoxDetail from "./multi_box_detail";
import InformationDetail from "./information_detail";
import globalStyles from "../../style/global";
import styles from "../../style/orderdetail";
import { LinearGradient } from "expo-linear-gradient";
import toggle from "../../../assets/toggle1.png";

let saveData = false;
let productID = 0;
let removeOrder = true;
let updateOrder = true;
let fetchData = true;
let updateOrderSuccess = true;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        filter: "awaiting",
        order: "DESC",
        limit: "1",
        offset: "0",
      },
      dataList: {
        filter: "awaiting",
        order: "DESC",
        limit: "1",
        offset: "0",
        app: "app",
      },
      visible: false,
      itemActive: true,
      notesActive: false,
      informationActive: false,
      activitiesActive: false,
      multiBoxActive: false,
      items: [],
      removeIds: [],
      order: [],
    };
  }

  componentDidMount() {
    // let productID = this.props && this.props.route.params.item && this.props.route.params.item.id
    // this.props.GetItem("storeOrder")
    debugger
    let id =
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.item &&
      this.props.route.params.item.id;
    // console.log('item id: ', this.props.route.params)
    this.setState({ id: id });
    if (id) {
      this.apiCall(id);
      this.multipleTime();
    }
    // this.props.navigation.goBack(null)
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => this.updateBasicInfo() },
    ]);
    return true;
  };

  multipleTime = async () => {
    let getItem = await AsyncStorage.getItem("logsArray");
    let convert = getItem && JSON.parse(getItem);
    this.props.SubmitLog(convert);
  };

  componentDidUpdate() {
    if (this.props.orderDetail !== this.state.order) {
      this.setState({ order: this.props.orderDetail });
    }
    if (removeOrder && this.props.removeOrderItems) {
      this.apiCall(this.state.id);
      removeOrder = false;
    }
    if (
      updateOrder &&
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.from === "UpdateOrder"
    ) {
      let id = this.props.route.params.data;
      this.apiCall(id);
      updateOrder = false;
    }
    if (
      updateOrderSuccess &&
      this.props.updateOrderSuccess &&
      this.props.updateOrderSuccess.scan_pack_data &&
      this.props.updateOrderSuccess.scan_pack_data[0] &&
      this.props.updateOrderSuccess.scan_pack_data[0].scan_hash.data
    ) {
      // this.updateOrderList(this.props.updateOrderSuccess.scan_pack_data[0])
      this.setState({ visible: false });
      this.props.navigation.navigate("ScanPackItem", {
        data: {
          from: "orderDetailPage",
          order:
            this.props.updateOrderSuccess.scan_pack_data[0].scan_hash.data
              .order,
        },
      });
      updateOrderSuccess = false;
    }
    // if(this.state.items !== this.props.items){
    //   this.setState({items: this.props.items})
    // }
  }

  // updateOrderList = async(updateOrder) => {
  //   let localOrderList = await AsyncStorage.getItem("storeOrder")
  //   let searchOrderNumber = updateOrder.id
  //   let orderFound = false
  //   if(localOrderList){
  //     let unString = localOrderList && JSON.parse(localOrderList)
  //     if(unString.orders && unString.orders.length > 0){
  //       unString.orders && unString.orders.map((orders ) => {
  //         if(orders.id === searchOrderNumber){
  //           orders = updateOrder
  //           orderFound = true
  //         }
  //       })
  //     }
  //     if(orderFound === false){
  //       let updatedList = unString.orders && unString.orders.push(updateOrder)
  //     }
  //     let finalList = JSON.stringify(unString)
  //     this.props.SetItem( "storeOrder" , finalList)
  //   }
  // }

  apiCall = (id) => {
    debugger
    // let id = this.props && this.props.route.params.item && this.props.route.params.item.id
    let detail = {
      id: id,
      orderDetail: this.state.data,
    };
    if (id !== null) {
      this.props.GetOrderDetail(detail);
    }
  };

  redirect(item) {
    this.props.navigation.navigate("ProductDetail", {
      data: item,
      token: this.state.token,
      url: this.state.url,
    });
  }

  changeState = (state) => {
    if (state === "itemActive") {
      this.setState({
        itemActive: true,
        notesActive: false,
        informationActive: false,
        activitiesActive: false,
        multiBoxActive: false,
      });
    }
    if (state === "notesActive") {
      this.setState({
        itemActive: false,
        notesActive: true,
        informationActive: false,
        activitiesActive: false,
        multiBoxActive: false,
      });
    }
    if (state === "informationActive") {
      this.setState({
        itemActive: false,
        notesActive: false,
        informationActive: true,
        activitiesActive: false,
        multiBoxActive: false,
      });
    }
    if (state === "activitiesActive") {
      this.setState({
        itemActive: false,
        notesActive: false,
        informationActive: false,
        activitiesActive: true,
        multiBoxActive: false,
      });
    }
    if (state === "multiBoxActive") {
      this.setState({
        itemActive: false,
        notesActive: false,
        informationActive: false,
        activitiesActive: false,
        multiBoxActive: true,
      });
    }
  };

  updateQuantity = async (item) => {
    if (item) {
      let data = {
        orderitem: item.iteminfo.id,
        qty: item.iteminfo.qty && parseInt(item.iteminfo.qty),
      };
      await this.props.UpdateOrderQuantity(data);
    }
  };

  addOrderItem(items) {
    this.props.navigation.navigate("Select Product to add to Order", items);
    updateOrder = true;
  }

  removeOrderItem(ids) {
    let removeIds = this.state.removeIds;
    var check = removeIds.includes(ids.iteminfo.id);
    if (check) {
      const index = removeIds.findIndex(
        (removeIds) => removeIds === ids.iteminfo.id
      );
      removeIds.splice(index, 1);
    } else {
      removeIds.push(ids.iteminfo.id);
    }
    this.setState({ removeIds });
  }

  handleChange(text, item) {
    let qtyValue = item.iteminfo;
    qtyValue["qty"] = text && JSON.parse(text);
    this.setState({ qtyValue });
  }

  removeItems = async () => {
    let removeIds = this.state.removeIds;
    let data = {
      orderitem: removeIds,
    };
    if (this.state.removeIds && this.state.removeIds.length > 0) {
      await this.props.RemoveOrderItems(data);
      removeOrder = true;
    }
  };

  handleBasicInfo(name, value) {
    let tempInfo = this.state.order && this.state.order.basicinfo;
    tempInfo[name] = value;
    this.setState({ tempInfo });
  }

  updateBasicInfo = async () => {
    this.setState({ visible: true });
    let basicInfo = this.state.order && this.state.order.basicinfo;
    if (basicInfo) {
      basicInfo["app"] = "app";
      let id = basicInfo.id;
      let data = basicInfo;
      await this.props.UpdateOrderInfo(id, data);
      updateOrderSuccess = true;
      // this.props.navigation.navigate("ScanPack" , {data: {from: "orderDetailPage" , id: this.state.order}})
    }
  };

  // handleBackButtonClick(){
  //   this.props.navigation.goBack(null);
  //   return true;
  //   this.updateBasicInfo()
  // }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    let order = this.props && this.state.order;
    return (
      <React.Fragment>
        {this.state.visible ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{ position: "relative" }}>
            {/* <View style={{ height: "6%", borderWidth: 1 }}>
              <LinearGradient
                colors={["#2E4452", "#14222F"]}
                style={styles.headerGradient}
              >
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.drawerBtn}
                >
                  <Image
                    style={styles.drawerImg}
                    source={toggle ? toggle : ""}
                  />
                </TouchableOpacity>
                {console.log()}
              </LinearGradient>
            </View> */}
            <View style={{ height: "90%" }}>
              {order && (
                <View>
                  <LinearGradient colors={["#2E4452", "#14222F"]} style={styles.tabContainer}>
                    <TouchableOpacity
                      onPress={this.changeState.bind(this, "itemActive")}
                      style={[
                        globalStyles.flex2,
                        globalStyles.justifyCenter,
                        {
                          backgroundColor: this.state.itemActive
                            ? "white"
                            : "#336599",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabLabel,
                          { color: this.state.itemActive ? "black" : "white" },
                        ]}
                      >
                        Items
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.changeState.bind(this, "notesActive")}
                      style={[
                        globalStyles.flex2,
                        globalStyles.justifyCenter,
                        {
                          backgroundColor: this.state.notesActive
                            ? "white"
                            : "#336599",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabLabel,
                          { color: this.state.notesActive ? "black" : "white" },
                        ]}
                      >
                        Notes
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.changeState.bind(this, "informationActive")}
                      style={[
                        globalStyles.flex2,
                        globalStyles.justifyCenter,
                        {
                          backgroundColor: this.state.informationActive
                            ? "white"
                            : "#336599",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabLabel,
                          {
                            color: this.state.informationActive
                              ? "black"
                              : "white",
                          },
                        ]}
                      >
                        Information
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.changeState.bind(this, "activitiesActive")}
                      style={[
                        globalStyles.flex2,
                        globalStyles.justifyCenter,
                        {
                          backgroundColor: this.state.activitiesActive
                            ? "white"
                            : "#336599",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabLabel,
                          {
                            color: this.state.activitiesActive
                              ? "black"
                              : "white",
                          },
                        ]}
                      >
                        Activities & Exceptions
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.changeState.bind(this, "multiBoxActive")}
                      style={[
                        globalStyles.flex2,
                        globalStyles.justifyCenter,
                        {
                          backgroundColor: this.state.multiBoxActive
                            ? "white"
                            : "#336599",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabLabel,
                          {
                            color: this.state.multiBoxActive
                              ? "black"
                              : "white",
                          },
                        ]}
                      >
                        Multi-Box Info
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  {this.state.itemActive && (
                    <ItemsDetail
                      items={order}
                      token={this.state.token}
                      url={this.state.url}
                      redirect={this.redirect.bind(this)}
                      navigation={this.props.navigation}
                      updateQuantity={(e) => this.updateQuantity(e)}
                      addOrderItem={(e) => this.addOrderItem(e)}
                      handleChange={(e, item) => this.handleChange(e, item)}
                      removeOrderItem={(ids) => this.removeOrderItem(ids)}
                      removeIds={this.state.removeIds}
                      removeItems={() => this.removeItems()}
                      updateBasicInfo={() => this.updateBasicInfo()}
                      back={() => this.props.navigation.goBack()}
                    />
                  )}
                  {this.state.notesActive && (
                    <NotesDetail
                      basicinfo={order.basicinfo}
                      navigation={this.props.navigation}
                      handleChange={(Name, Value) =>
                        this.handleBasicInfo(Name, Value)
                      }
                      updateBasicInfo={() => this.updateBasicInfo()}
                      back={() => this.props.navigation.goBack()}
                    />
                  )}
                  {this.state.informationActive && (
                    <InformationDetail
                      basicinfo={order.basicinfo}
                      navigation={this.props.navigation}
                      handleChange={(Name, Value) =>
                        this.handleBasicInfo(Name, Value)
                      }
                    />
                  )}
                  {this.state.activitiesActive && (
                    <ActivitiesExceptionDetail
                      activities={order.activities}
                      exception={order.exception}
                      navigation={this.props.navigation}
                    />
                  )}
                  {this.state.multiBoxActive && (
                    <MultiBoxDetail navigation={this.props.navigation} />
                  )}
                </View>
              )}
            </View>

            {Platform.OS === "web" ? (
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "transparent",
                  alignSelf: "flex-end",
                  margin: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.updateBasicInfo()}
                  style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#336597",
                    borderRadius: 30,
                    backgroundColor: "#494848",
                    height: 40,
                  }}
                >
                  <Text
                    style={{ color: "white", padding: 10, fontWeight: "bold" }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#336597",
                    borderRadius: 20,
                    backgroundColor: "#336599",
                    height: 40,
                  }}
                  onPress={() => this.updateBasicInfo()}
                >
                  <Text
                    style={{ color: "white", padding: 10, fontWeight: "bold" }}
                  >
                    Save & Close
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  bottom: 10,
                  backgroundColor: "transparent",
                  alignSelf: "flex-end",
                  margin: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.updateBasicInfo()}
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#336597",
                    backgroundColor: "#494848",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      padding: 4,
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#336597",
                    backgroundColor: "#336599",
                    justifyContent: "center",
                  }}
                  onPress={() => this.updateBasicInfo()}
                >
                  <Text
                    style={{
                      color: "white",
                      padding: 4,
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Save & Close
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  debugger
  return {
    orderDetail: state.order.order,
    saveData: state.updateAsync.retriveData,
    removeOrderItems: state.order.removeOrderItems,
    updateOrderSuccess: state.order.updateOrder,
  };
};

const mapDispatchToProps = {
  GetOrderDetail,
  GetItem,
  UpdateOrderQuantity,
  RemoveOrderItems,
  UpdateOrderInfo,
  SubmitLog,
  SetItem,
  OrderBackButtonClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
