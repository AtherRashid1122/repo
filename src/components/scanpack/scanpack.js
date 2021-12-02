import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput, ActivityIndicator, TouchableOpacity, Platform, ImageBackground, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import { GetOrderList, SearchOrder } from "../../actions/orderActions";
import { SearchScanpackOrder } from "../../actions/scanpackAction";
import { SetItem, GetItem } from "../../actions/updateAsyncAction";
import { GetGeneralSetting, GetScanPackSetting, UserInfo } from "../../actions/userAction";
import globalStyles from '../../style/global';
import styles from '../../style/scanpack';
import PopUpModel from "./pop_up_model";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from 'expo-linear-gradient';
import { fontFamily } from '../../helpers/fontFamily';


const height = Dimensions.get('window').height

let orderListSuccess = false;
let searchOrderSuccess = false;
let validateUser = false
let messageShow = false

class ScanPack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        "input": "",
        "state": "scanpack.rfo",
        "id": null,
        "box_id": null,
        "store_order_id": null,
        "app": "app"
      },
      popUpModelShow: false,
      dataList: {
        "filter": "",
        "order": "DESC",
        "limit": "1",
        "offset": "0",
        "app": "app",
        "count": 0
      },
      orderDetail: null,
      rfoTitle: "Scan the Packing Slip of an Order you'd like to Pack.",
      time: new Date(),
      loading: false,
      loaderTitle: "",
      userInfo: "",
      scan_pack_settings: null
    };
    this.inputFocus = React.createRef();
    this.searchOrder = this.searchOrder.bind(this);
  }

  componentDidMount() {
    this.props.UserInfo()
    this.setState({ loading: true, loaderTitle: "Loading..." })
    this.getOrder()
    validateUser = true
  }

  //According to the platform call the function
  getOrder = () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      this.checkConnection("apiCall")
    } else {
      this.apiCall()
    }
  }

  alertBox = (message, skip, messageTypeSuccess) => {
    if (messageTypeSuccess === true) {
      this.setState({ popUpModelShow: true, message: message, messageTypeSuccess: true })
    } else {
      this.setState({ popUpModelShow: true, message: message })
    }
    setTimeout(function () {
      this.setState({ popUpModelShow: false, message: "", messageTypeSuccess: false });
    }.bind(this), 4000);
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }
  }

  //Check the connection for the ios and android
  checkConnection = async (type, input) => {
    const connectionInfo = await NetInfo.fetch();
    if (connectionInfo.isConnected) {
      type === "callShipmentOrder" ? this.callShipmentOrder(input) : this.apiCall()
    } else {
      this.setState({ rfoTitle: "Please check your internet connection" })
    }
  }

  //Call the api to fetch the data from backend
  apiCall = () => {
    this.props.GetOrderList(this.state.dataList);
    orderListSuccess = true
  }


  componentDidUpdate() {

    //OrderList + scanpacksetting + general setting
    if (orderListSuccess === true && this.props && this.props.ordersList && this.props.ordersList !== this.state.list) {
      orderListSuccess = false
      let list = this.props.ordersList
      let orderShow = list.orders.length === 0 ? true : false
      this.setState({
        scan_pack_settings: list.scan_pack_settings,
        general_settings: list.general_settings,
        rfoTitle: list.orders.length > 0 ? list && list.orders[0] && list.orders[0].ordernum : "No orders were found in the awaiting orders list.",
        //rfoTitle: list.orders.length > 0 ? list && list.orders[0] && list.orders[0].ordernum : "Please scan an order to continue." ,
        orderDetail: list && list.orders && list.orders[0],
        loading: false,
        list: this.props.ordersList,
        unClick: orderShow
      })
    }



    if (messageShow === false && this.props && this.props.route && this.props.route.params && this.props.route.params.showScannedMessage) {
      this.alertBox(`The order has already been scanned.`, true, true)
      this.setState({ loading: true, loaderTitle: "Loading..." })
      this.getOrder()
      messageShow = true
    }

    //Search Order Data
    if (searchOrderSuccess === true && this.props &&
      this.props.searchOrder && this.props.searchOrder.time > this.state.apiCallTime &&
      this.props.searchOrder !== this.state.oldOne) {
      let searchResult = this.props.searchOrder && this.props.searchOrder.searchOrder
      let order = searchResult && searchResult.data.order && searchResult.data.order[0]
      if (searchResult) {
        if (searchResult.matched) {
          if (searchResult.data) {
            this.orderDetails(order)
            searchOrderSuccess = false
          } else {
            if (searchResult.data.status === "scanned") {
              let message = `Order ${searchResult.data.order_num} has already been scanned.`
              this.statusFunction(message)
              this.setState({ unClick: true })
            }
          }
        } else {
          this.statusFunction(searchResult.error_messages)
          this.setState({ unClick: true })
          searchOrderSuccess = false
        }
        this.setFocus()
        let data = this.state.data
        data["input"] = ""
        this.setState({ oldOne: this.props.searchOrder, data, loading: false })
      }
    }

    if (validateUser && this.props && this.props.userInfo && this.props.userInfo !== this.state.userInfo) {
      if (this.props.userInfo.is_active === false) {
        validateUser = false
        this.props.UserInfo(false)
        this.redirect()
      }
    }

  }

  closeAlert = () => {
    this.setState({ popUpModelShow: false })
  }

  redirect = async () => {
    // await AsyncStorage.removeItem("access_token")
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn", { status: "Inactive", time: new Date() })
    this.setState({ userInfo: this.props.userInfo })
  }

  //After the apis call update the status (scanned , order  not present)
  statusFunction = (message) => {
    let data = this.state.data
    data["input"] = ""
    this.setState({ rfoTitle: message, data })
  }

  //To set the focus
  // setFocus = () => {
  //   this.inputFocus.current.focus();
  // }

  //Redirect to the scanpackItem page with order details 
  orderDetails = (order) => {
    if (order && order.scan_hash && order.scan_hash.data) {
      this.props.navigation.navigate("ScanPackItem", { data: order.scan_hash.data })
      messageShow = false
    }
  }

  //Check the connection for mobile device before call the api
  searchOrder = (input) => {
    this.setState({ loading: true, loaderTitle: "Loading..." })
    if (input !== "") {
      if (Platform.OS === "ios" || Platform.OS === "android") {
        this.checkConnection("callShipmentOrder", input)
      } else {
        this.callShipmentOrder(input)
      }
    }
  }

  //Api to call the search order
  callShipmentOrder = (input) => {
    let shipmentOrder = this.state.data
    shipmentOrder["input"] = input
    if (input !== "") {
      shipmentOrder.input = input
      this.props.SearchScanpackOrder(shipmentOrder)
      searchOrderSuccess = true
      let apiCallTime = new Date()
      this.setState({ apiCallTime })
    }
  }

  //Handle the search field input
  handleChange = (name, value) => {
    let order = this.state.data;
    if (name === "searchOrder") {
      order["input"] = value
    }
    this.setState({ order })
  }

  componentWillUnmount() {
    this.props.GetOrderList(this.state.dataList, false)
  }

  render() {
    return (
      <SafeAreaView style={globalStyles.flex1}>
        <View style={globalStyles.flexDirectionRow}>
        </View>
          <ImageBackground source={require('././../../../assets/background.png')} style={{ flex: 1 }}>
          <ImageBackground style={{ height: 345, marginTop: 20 }} source={require('././../../../assets/scaning.png')} resizeMode={'contain'}>
            <View style={{ height: height / 2, justifyContent: 'center', alignContent: 'center', alignItems: 'center', margin: 200 }}>
              <Text style={{ fontSize: 50, color: '#728ba1',fontFamily: fontFamily.font400, marginTop: 30 }}>
                Scan
              </Text>
              <View style={{ marginTop: 25 }}>
                <TextInput style={{ backgroundColor: 'black', borderWidth: 2, borderColor: '#7a92a8', height: 35, width: 280, borderRadius: 5, color: 'white', }}></TextInput>
              </View>
              <Text style={{ color: '#728ba1', fontSize: 20, marginTop: 20, fontFamily: fontFamily.font400 }}>
                Scan a Packing slip to display an order.
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ borderWidth: 1, backgroundColor: '#869eb3', marginTop: 30, width: 300, height: 40, borderRadius: 5, justifyContent: 'center', alignContent: 'center' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                      <Text style={{ marginLeft: 30, color: 'white', fontFamily: fontFamily.font400 }}>
                        Quick Scan
                      </Text>
                      <Text style={{ marginLeft: 30, color: 'white',fontFamily: fontFamily.font400 }}>
                        111997723455-854578 </Text>
                    </View>
                    {/* <AntDesign color="white" style={{marginRight:10,justifyContent:'center',alignItems:'center',alignSelf:'center',alignContent:'center'}} name="forward" size={24} /> */}
                    <Image source={require('././../../../assets/arroe.png')} style={{ marginRight: 10, height: 20, width: 20, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', }} ></Image>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, marginLeft: 5 }}>
                  <Image source={require('././../../../assets/notificationicon.png')} style={{ marginRight: 10, height: 15, width: 15, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', }} ></Image>
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#5a6a77', marginTop: 60, fontFamily: fontFamily.font400,marginBottom:7 }}>
                Import is in Progress. ETA 5 min
              </Text>
                <TouchableOpacity style={{ height: 30, backgroundColor: '#869eb3', borderWidth: 1, width: 150, marginTop: 15, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', alignItems: 'center', borderRadius: 5,marginTop:-1 }}>
                  <Text style={{ color: 'white', fontFamily: fontFamily.font400}}>
                    Refresh
                  </Text>


                </TouchableOpacity>
            
            </View>

          </ImageBackground>



        </ImageBackground>

      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ordersList: state.order.list,
    searchOrder: state.scanpack,
    userInfo: state.user.userInfo
  }
};

const mapDispatchToProps = {
  GetOrderList,
  SearchScanpackOrder,
  UserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanPack)
