//import library
import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { Audio } from 'expo-av';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper/src';
import NetInfo from "@react-native-community/netinfo";

//import sound from component
import completeSound from "../../../assets/sounds/_order_complete.mp3";
import scanSuccessSound from "../../../assets/sounds/scan_success_pop.mp3";
import scanFailSound from "../../../assets/sounds/scan_fail_shorter.mp3";
import notReady from "../../../assets/sounds/not_ready.mp3";

//import image from assets
import closeButton from "../../../assets/closeicon.png";

//import apis 
import { SearchScanpackOrder } from "../../actions/scanpackAction";
import { GetOrderList, SearchOrder } from "../../actions/orderActions";
import { updateProductList, updateProductAlias } from "../../actions/productAction";
import { GetBothSettings } from "../../actions/userAction";
import { GetOrderDetail } from '../../actions/orderActions';
import { SetItem, GetItem } from "../../actions/updateAsyncAction";
import { SubmitLog } from "../../actions/saveLogAction";

//import components to view
import styles from '../../style/scanpack';
import UnscannedItems from "./unscanned_items";
import ScannedItems from "./scanned_items";
import NextItems from "./next_items";
import Notes from "./internal_notes";
import Alert from "./alert";
import AddBarcode from "./addBarcode";
import PopUpModel from "./pop_up_model";
import ShipmentRecord from "./shipmentsRecord";
import TypeScanAlert from "./type_scan_alert";
import ResponseView from "./response_view";
import LogView from "./log";
import SerialRecord from "./serial_record";
import ClickScanConfirmationPopUp from "./click_scan_confirmation_pop_up";
import ProductConfirmationCheck from "./productConfirmationCheck";
import ConfirmTrackingNumber from "./confirmTrackingNumber";
import OrderConfirmationPopUp from "./orderConfirmationPopUp";
import globalStyles from '../../style/global';
import SwipeGesture from '../../helpers/swipe-gesture'
import Hotkeys from 'react-hot-keys';
import ProductAlias from "../Alias/productAlias";
import { LinearGradient } from 'expo-linear-gradient';
import { fontFamily } from '../../helpers/fontFamily';

let searchOrderCheck = false;
let updateProductInfoSuccess = false;
let ScanPackSettingsAccess = false;
let GeneralSettingAccess = false;
let orderSaveSuccess = false;
let updateLogSuccess = true;
let callOrderSuccess = true;
let formOrderDetailPage = true;
let updateSerialLog = {};
let enableSerial = false;
let myInput = "";
let ordersListSuccess = true;
let blockScan = false;
let confirmProductConfirmation = false;
let updateFromOrderDetailPage = true;
let searchOrderSuccess = false
let updateFromProductSuccess = false
let updateProductApi = false
let updateAliasSuccess = false
// let scanSuccessAction = false
// let scanFailAction = false
// let orderCompleteAction = false
// let responseShowAction = false

class ScanPackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipmentOrder: {
        "input": "",
        "state": "scanpack.rfo",
        "id": null,
        "box_id": null,
        "store_order_id": null,
        "app": "app"
      },
      data: {
        "input": "",
        "state": "scanpack.rfo",
        "id": null,
        "box_id": null,
        "store_order_id": null
      },
      orderList: {
        "filter": "awaiting",
        "order": "DESC",
        "limit": "1",
        "offset": "0",
        "app": "app",
        "count": 0
      },
      orderDetail: {
        "filter": "awaiting",
        "order": "DESC",
        "limit": "1",
        "offset": "0",
        "type": "app"
      },
      type: "",
      log: [],
      localLogs: [],
      firstScreen: true,
      secondScreen: false,
      thirdScreen: false,
      logScreen: false,
      bar_code: "",
      alert: false,
      notes_fromPacker: "",
      typeScanAlert: false,
      typeScanCount: "",
      notes_toPacker_enable: true,
      showshipments: true,
      errorMessage: "Please check the internet connection",
      errorMessageShow: false,
      matchOrderShow: true,
      typeScanState: "",
      message: "",
      unscannedItemShow: false,
      nextItemShow: true,
      scannedItemShow: false,
      typeScanDeductCountState: "",
      issueFlag: false,
      noteFlag: false,
      trackingOrderInput: "",
      trackingNumberView: false,
      postScanningFieldLabel: "",
      postScanningMessageDetail: "",
      timeSecond: false,
      postScan: false,
      serialRecordPopUpShow: false,
      serialRecordInput: "",
      serialRecordTwo: "",
      clickScanConfirmInput: "",
      serialRecordOne: "",
      notes_toPackerFlag: true,
      notes_internalFlag: true,
      customer_commentsFlag: true,
      scanSuccessAction: false,
      scanFailAction: false,
      orderCompleteAction: false,
      responseShowAction: false,
      errorMessageClickScanConfirmation: false,
      loadOrderSpinner: false,
      loader: false,
      unscannedItemPerPage: 1,
      scannedItemPerPage: 1,
      productConfirmationCheck: false,
      productConfirmationCheckInput: "",
      errorMessageProductConfirmationCheck: false,
      blockScan: false,
      orderConfirmPopUp: false,
      OrderConfirmationCheckInput: "",
      errorMessageOrderConfirmationCheck: false,
      popUpModelShow: false,
      messageTypeSuccess: false,
      reRenderFocus: false,
      clickScanConfirmation: false,
      focusBarcode: false,
      scannedList: true,
      unscannedList: false,
      logList: false,
      addBarcodeWindow: false,
      alias: false,
      Product: [],
      windowWidth: Dimensions.get('window').width
    };
    this.barcode = React.createRef();
    this.serialRecord = React.createRef();
    this.multipleTime = this.multipleTime.bind(this);
    this.responseAction = this.responseAction.bind(this);
    this.redirectFun = this.redirectFun.bind(this);
    this.InputField = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
    this.setState({ loader: true })
    this.getUserInfo();
    this.apiCall()
  }

  /*RETRIVE THE USER INFO FROM LOCAL*/
  getUserInfo = async () => {
    let info = await AsyncStorage.getItem("userInfo")
    let userInfo = info && JSON.parse(info)
    this.setState({ userInfo })
  }
  /*RETRIVE THE USER INFO FROM LOCAL*/

  apiCall = () => {
    let fetchListData = this.state.shipmentOrder
    fetchListData.input = this.props.route.params.incrementID
    let data = this.props.route.params.data
    this.setState({ order: data })
    // this.props.SearchScanpackOrder(fetchListData);
    this.props.GetBothSettings();
    ordersListSuccess = false
  }

  addBarcode = (item) => {
    if (item.barcodes && item.barcodes.length === 0) {
      this.setState({ addBarcodeWindow: true, addBarcodeItem: item })
    }
  }

  addBarcodeSubmit = () => {
    let newHash = {
      value: this.state.addBarcodeText,
      var: "barcode",
      id: this.state.addBarcodeItem.product_id,
    }
    this.props.updateProductList(newHash)
    this.setState({ updateProductApiCall: new Date() })
    updateProductApi = true
  }


  componentDidUpdate() {
    let searchOrder = this.props.searchOrder;
    let searchData = searchOrder && searchOrder.data
    let asyncData = this.props && this.props.bothSettings
    let updateLog = this.props && this.props.updateLog
    let order = { "order": this.props && this.props.route.params && this.props.route.params.data }
    let setFocus = this.state.orderConfirmPopUp === false && this.state.addBarcodeWindow === false && this.state.responseShowAction === false && this.state.typeScanAlert === false && this.state.popUpModelShow === false && this.state.reRenderFocus === false && this.state.serialRecordPopUpShow === false && this.state.clickScanConfirmation === false && this.state.productConfirmationCheck === false

    if ((setFocus === true) || (setFocus === true && this.state.focusBarcode)) {
      try {
        this.InputField.current.focus()
      } catch (error) {
      }
    }

    if (this.props &&
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.data &&
      this.props.route.params.data.from === "productDetailPage" &&
      this.props.route.params.data !== this.state.productDetail
    ) {
      let data = {
        "input": this.props.route.params.data.increment_id,
        "state": "scanpack.rfo",
        "id": null,
        "box_id": null,
        "store_order_id": null,
        "app": "app"
      }
      updateFromProductSuccess = true
      this.props.SearchScanpackOrder(data)
      this.setState({ productDetail: this.props.route.params.data, loader: true, apiCallTime: new Date() })
    }

    //Search Order Data
    if (updateFromProductSuccess && this.props &&
      this.props.searchOrder &&
      this.props.searchOrder) {
      let searchResult = this.props.searchOrder && this.props.searchOrder.searchOrder
      let order = searchResult && searchResult.data.order && searchResult.data.order[0]
      if (searchResult) {
        if (searchResult.matched) {
          if (searchResult.data.status === "awaiting" && this.props.route.params.data.increment_id === this.props.searchOrder.searchOrder.data.order_num) {
            // this.orderDetails(order)
            this.setState({ oldOne: this.props.searchOrder, loader: false, order: this.props.searchOrder.searchOrder.data.order[0].scan_hash.data })
            updateFromProductSuccess = false
          }
          if (searchResult.data.status === "onhold" && this.props.route.params.data.increment_id === this.props.searchOrder.searchOrder.data.order_num) {
            // this.orderDetails(order)
            this.setState({ oldOne: this.props.searchOrder, loader: false, order: this.props.searchOrder.searchOrder.data.order[0].scan_hash.data })
            updateFromProductSuccess = false
          }
        }
      }
    }

    /*update order when user click save&close on order detail page start*/
    if (this.props &&
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.data &&
      this.props.route.params.data.from === "orderDetailPage" &&
      this.props.route.params.data !== this.state.detailData
    ) {
      this.setState({
        order: this.props.route.params.data,
        detailData: this.props.route.params.data,
        notes_toPackerFlag: true,
        notes_internalFlag: true,
        customer_commentsFlag: true
      })
      updateFromOrderDetailPage = false
    }
    /*update order when user click save&close on order detail page end*/

    /*Update the general settings & scanpack settings start*/
    if (this.props && this.props.bothSettings && this.props.bothSettings !== this.state.bothSettings) {
      this.setState({
        scanpackSettings: this.props.bothSettings.data.data.scanpack_setting,
        generalSettings: this.props.bothSettings.data.data.general_setting,
        scan_pack_settings: this.props.bothSettings.data.data.scanpack_setting,
        general_settings: this.props.bothSettings.data.data.general_setting,
        bothSettings: this.props.bothSettings,
        loader: false
      })
      if (this.props.bothSettings.data.data.general_setting.conf_req_on_notes_to_packer === "always") {
        this.setState({ orderConfirmPopUp: true })
      }
      if (this.props.bothSettings.data.data.general_setting.conf_req_on_notes_to_packer === "optional") {
        if (order.order.order.note_confirmation) {
          this.setState({ orderConfirmPopUp: true })
        }
      }
    }
    /*Update the general settings & scanpack settings end*/

    if (updateProductInfoSuccess === true && this.props && this.props.updateProduct && this.props.updateProduct.data) {
      updateProductInfoSuccess = false
      this.setState({ alias: false })
      if (this.props.route.params.data.order) {
        let data = {
          "input": this.props.route.params.data.order.increment_id,
          "state": "scanpack.rfo",
          "id": null,
          "box_id": null,
          "store_order_id": null,
          "app": "app"
        }
        this.props.SearchScanpackOrder(data)
        updateFromProductSuccess = true
      }
    }

    if (asyncData !== "") {
      let convert = asyncData
      let scData = convert && convert.data && convert.data.data && convert.data.data.scanpack_setting
      let gsData = convert && convert.data && convert.data.data && convert.data.data.general_setting
      if (ScanPackSettingsAccess === false && scData) {
        ScanPackSettingsAccess = true
        if (scData && scData.post_scanning_option !== "None") {
          let type = scData.post_scanning_option
          if (type === "Record") {
            this.setState({ notes_toPackerFlag: false, notes_internalFlag: false, customer_commentsFlag: false, postScanningFieldLabel: `Scan Tracking Number for Order ${order.order.order.increment_id}`, postScanningMessageDetail: "Please create the shipping label, adhere it to the package, and scan the tracking number to continue." })
          }
          if (type === "Verify") {
            let postScanMessage = ""
            if (order.order.order.tracking_num !== null && order.order.order.tracking_num !== "") {
              postScanMessage = "Please scan the shipping label."
            } else {
              postScanMessage = "Your Scan & Pack settings call for shipping label verification but no tracking information was imported with this order. Please scan your confirmation code or press enter to continue."
            }
            this.setState({ notes_toPackerFlag: false, notes_internalFlag: false, customer_commentsFlag: false, postScanningFieldLabel: `Scan Shipping Label for Order ${order.order.order.increment_id}`, postScanningMessageDetail: postScanMessage })
          }
        }
        this.setState({ scan_pack_settings: scData })
        this.props.GetItem("GeneralSetting");
      }
      if (GeneralSettingAccess === false && gsData !== undefined) {
        GeneralSettingAccess = true
        this.setState({ general_settings: gsData })
      }
    }

    if (this.props.updateLog.time !== this.state.logTime) {
      if (this.props.updateLog && this.props.updateLog.logs && this.props.updateLog.logs.status === "OK" && this.props.updateLog.updateLog && this.props.updateLog.time) {
        this.setState({ logTime: this.props.updateLog.time })
      }
    }

    if (this.props.route.params.restart === true) {
      this.props.route.params.restartButton
    }

    if (updateProductApi === true && this.props && this.props.updateProduct && this.props.updateProduct.data !== "" && this.props.updateProduct.time >= this.state.updateProductApiCall) {
      updateProductApi = false
      let productID = this.state.addBarcodeItem && this.state.addBarcodeItem.product_id
      let order = this.state.order
      if (this.props.updateProduct.data.show_alias_popup) {
        this.setState({ alias: true, addBarcodeWindow: false, Product: this.props.updateProduct.data, updateProduct: this.props.updateProduct.data })
      } else {
        order.order.unscanned_items &&
          order.order.unscanned_items.length > 0 &&
          order.order.unscanned_items.map((item, index) => {
            if (item.child_items.length > 0) {
              item.child_items.map((child, index) => {
                if (child.product_id === productID) {
                  child.barcodes = [{
                    barcode: this.state.addBarcodeText,
                    created_at: "",
                    id: 0,
                    packing_count: "1",
                    product_id: productID,
                    updated_at: new Date()
                  }]
                }
              })
            } else {
              if (item.product_id === productID) {
                item.barcodes = [{
                  barcode: this.state.addBarcodeText,
                  created_at: "",
                  id: 0,
                  packing_count: "1",
                  product_id: productID,
                  updated_at: new Date()
                }]
              }
            }
          })
        let unItem = order.order.unscanned_items.length > 0 && order.order.unscanned_items[0]
        let item = unItem.child_items.length > 0 ? unItem.child_items[0] : unItem
        this.clickScan(item)
        this.setState({ addBarcodeWindow: false, addBarcodeText: "", addBarcodeItem: "", order, updateProductApiCall: "" })
      }
    }

    if (updateAliasSuccess && this.props && this.props.updateAlias) {
      if (this.props.updateAlias.status) {
        let fetchListData = this.state.shipmentOrder
        fetchListData.input = this.state.order.order.increment_id
        this.props.SearchScanpackOrder(fetchListData);
        this.setState({ updateProductApiCall: new Date() })
        updateAliasSuccess = false
        updateProductInfoSuccess = true
        updateFromProductSuccess = true
      } else {

      }
    }

  }

  nav = async (order, completeOrder) => {
    completeOrder && this.multipleTime()
  }

  //After the apis call update the status (scanned , order  not present)
  statusFunction = (message) => {
    let data = this.state.data
    data["input"] = ""
    this.setState({ rfoTitle: message, data })
  }

  redirectFun() {
    if (this.state.order && this.state.order.order && this.state.order.order.unscanned_items && this.state.order.order.unscanned_items.length === 0) {
      this.props.SearchScanpackOrder("", false)
      this.props.navigation.navigate("ScanPack", { update: true, time: new Date() })
    }
  }

  /*RESPONSE SOUND AND IMAGE START*/
  responseAction = (response, from) => {
    let { play_success_sound, show_success_image, success_image_time, play_fail_sound, show_fail_image, fail_image_time, play_order_complete_sound, show_order_complete_image, order_complete_image_time } = this.state.scan_pack_settings;
    let popup_show_time = 0.3; // default time
    if (response === "not_ready") {
      popup_show_time = fail_image_time;
      show_fail_image ? this.setState({ scanFailAction: true, responseShowAction: true }) : null
      play_fail_sound ? this.playSound(notReady) : null
      this.setState({ bar_code: "" })
    }
    if (response === "scan_fail") {
      popup_show_time = fail_image_time;
      show_fail_image ? this.setState({ scanFailAction: true, responseShowAction: true }) : null
      play_fail_sound ? this.playSound(scanFailSound) : null
      this.setState({ bar_code: "" })
    }
    if (response === "scan_success") {
      popup_show_time = success_image_time;
      show_success_image ? this.setState({ scanSuccessAction: true, responseShowAction: true }) : null
      play_success_sound ? this.playSound(scanSuccessSound) : null
      this.setState({ bar_code: "", forSerialRecord: "" })
    }
    if (response === "order_complete") {
      if (this.state.scan_pack_settings.post_scanning_option === "None") {
        response = "complete_order"
      } else {
        let scanType = this.state.scan_pack_settings.post_scanning_option
        this.postScanFunction(scanType)
      }
    }
    if (response === "complete_order") {
      popup_show_time = order_complete_image_time;
      show_order_complete_image ? this.setState({ orderCompleteAction: true, responseShowAction: true }) : null
      play_order_complete_sound ? this.playSound(completeSound) : null
      this.nav(this.state.order, true)
      this.setState({ bar_code: "" })
    }
    if (response === "restart_action_complete") {
      this.nav(this.state.order)
      this.setState({ bar_code: "" })
    }
    let showTime = popup_show_time * 300
    setTimeout(() => { this.setState({ scanFailAction: false, scanSuccessAction: false, orderCompleteAction: false, responseShowAction: false }) }, showTime);
    this.updateAction.bind(this);
    try {
      if (from === "serialRecord") {
        this.serialRecord.current.focus()
      } else {
        // this.barcode.current.focus()
      }
    } catch (error) {
    }
  }
  /*RESPONSE SOUND AND IMAGE END*/

  playSound = async (response) => {
    const sound = new Audio.Sound();
    await sound.unloadAsync();

    await sound.loadAsync(response);
    await sound.playAsync();
    this.currentFocus();
    // this.sleep(300);
  }

  currentFocus = () => {
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }  
  }

  sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /* SUBMIT TRACKING START */
  trackingSubmit(trackingNumber) {
    let setting = this.state.scan_pack_settings
    let trackingLength = trackingNumber.length
    let temp_order = {}
    let num = ""
    let order = this.state.order
    let order_num = order.order.id
    let localLogs = this.state.localLogs
    let strict_cc = this.state.general_settings.strict_cc
    if (setting.post_scanning_option !== "None") {
      if (this.state.timeSecond === true) {
        let type = setting.post_scanning_option_second
        if (type === "Record") {
          if (setting.tracking_number_validation_enabled) {
            let prefix = setting.tracking_number_validation_prefixes.split(",")
            let validate = ""
            let scan = false
            let scanAccess = false
            prefix.map((prefix, index) => {
              let prefixLength = prefix.length
              validate = trackingNumber.slice(0, prefixLength)
              if (scanAccess === false) {
                if (validate === prefix) {
                  temp_order["id"] = order_num
                  temp_order["input"] = trackingNumber
                  temp_order["state"] = 'scanpack.rfp.default'
                  temp_order["event"] = "record"
                  temp_order["updated_at"] = order.order.updated_at
                  temp_order["increment_id"] = order.order.increment_id
                  // localLogs.push(temp_order)
                  localLogs.splice(0, 0, temp_order)
                  scan = true
                  scanAccess = true
                } else {
                  scan = false
                }
              }
            })
            if (scan === true) {
              // localLogs.push(temp_order)
              localLogs.splice(0, 0, temp_order)
              this.updateLog(temp_order, "recordTracking")
              // this.updateLog(temp_order , "tracking")
              // this.responseAction("complete_order")
            } else {
              this.responseAction("scan_fail")
              this.alertBox(`The tracking number barcode you scanned does not match any of the saved prefixes. Please check your tracking validation settings or contact an admin.`, true)
            }
          } else {
            temp_order["id"] = order_num
            temp_order["input"] = trackingNumber
            temp_order["state"] = 'scanpack.rfp.default'
            temp_order["event"] = "record"
            temp_order["updated_at"] = order.order.updated_at
            temp_order["increment_id"] = order.order.increment_id
            // localLogs.push(temp_order)
            localLogs.splice(0, 0, temp_order)
            // this.updateLog(temp_order , "tracking")
            this.updateLog(temp_order, "recordTracking")
            // this.responseAction("complete_order")
          }
        }
        if (type === "Verify") {
          let trackNumber = order.order.tracking_num
          if (setting.post_scanning_option === "Record" && setting.post_scanning_option_second === "Verify") {
            trackNumber = 123
          }
          if (trackNumber !== null) {
            let scan = false
            if (this.state.scanSecondTime === true) {
              if (trackingNumber === this.state.userInfo.confirmation_code || (strict_cc === false && trackingNumber === "")) {
                scan = true
              }
            }
            if (trackingNumber === trackNumber || scan === true) {
              temp_order["id"] = order_num
              temp_order["input"] = trackingNumber
              temp_order["state"] = this.state.trackingStateSecond === "scanpack.rfp.no_match" ? "scanpack.rfp.no_match" : "scanpack.rfp.verifying"
              temp_order["state"] =
                temp_order["event"] = "verify"
              temp_order["updated_at"] = order.order.updated_at
              temp_order["increment_id"] = order.order.increment_id
              // localLogs.push(temp_order)
              localLogs.splice(0, 0, temp_order)
              // this.updateLog(temp_order , "tracking")
              this.updateLog(temp_order, "recordTracking")
              // this.responseAction("complete_order")
              this.setState({ trackingStateSecond: "" })
            } else {
              this.responseAction("scan_fail")
              this.setState(
                {
                  trackingStateSecond: "scanpack.rfp.no_match",
                  scanSecondTime: true,
                  postScanningMessageDetail: "The tracking number on the shipping label you just scanned does not match the tracking number imported with that order. Please verify that you have the correct shipping label and try your scan again. If you are aware of the issue and would like to proceed with the next order please scan your confirmation code to continue."
                }
              )
            }
          } else {
            let message = ""
            if (order.order.tracking_num !== null && order.order.tracking_num !== "") {
              message = "The tracking number on the shipping label you just scanned does not match the tracking number imported with that order. Please verify that you have the correct shipping label and try your scan again. If you are aware of the issue and would like to proceed with the next order please scan your confirmation code to continue."
            } else {
              message = "Your Scan & Pack settings call for shipping label verification but no tracking information was imported with this order. Please scan your confirmation code or press enter to continue."
            }
            if (this.state.postScanSecond) {
              if (trackingNumber === this.state.userInfo.confirmation_code || (strict_cc === false && trackingNumber === "")) {
                temp_order["id"] = order_num
                temp_order["input"] = trackingNumber
                temp_order["state"] = 'scanpack.rfp.no_tracking_info'
                temp_order["event"] = "verify"
                temp_order["updated_at"] = order.order.updated_at
                temp_order["increment_id"] = order.order.increment_id
                // localLogs.push(temp_order)
                localLogs.splice(0, 0, temp_order)
                // this.updateLog(temp_order , "tracking")
                this.updateLog(temp_order, "recordTracking")
                // this.responseAction("complete_order")
                this.setState({ postScanSecond: false })
              } else {
                this.responseAction("scan_fail")
              }
            }
            this.setState({ postScanSecond: true, postScanningMessageDetail: message })
          }
        }
      } else {
        let type = setting.post_scanning_option
        if (type === "Record") {
          if (setting.tracking_number_validation_enabled) {
            let prefix = setting.tracking_number_validation_prefixes.split(",")
            let validate = ""
            let scan = false
            let scanAccess = false
            prefix.map((prefix, index) => {
              let prefixLength = prefix.length
              validate = trackingNumber.slice(0, prefixLength)
              if (scanAccess === false) {
                if (validate === prefix) {
                  temp_order["id"] = order_num
                  temp_order["input"] = trackingNumber
                  temp_order["state"] = 'scanpack.rfp.default'
                  temp_order["event"] = "record"
                  temp_order["updated_at"] = order.order.updated_at
                  temp_order["increment_id"] = order.order.increment_id
                  scan = true
                  scanAccess = true
                } else {
                  scan = false
                }
              }
            })
            if (scan === true) {
              localLogs.splice(0, 0, temp_order)
              // localLogs.push(temp_order)
              // this.updateLog(temp_order , "tracking")
              this.updateLog(temp_order, "recordTracking")
              if (setting.post_scanning_option_second !== "None" && setting.post_scanning_option_second !== setting.post_scanning_option) {
                this.postScanFunction(setting.post_scanning_option_second, true)
                this.setState({ trackingOrderInput: "" })
                this.updateLog(temp_order, "tracking")
              } else {
                // this.responseAction("complete_order")
                this.updateLog(temp_order, "recordTracking")
              }
            } else {
              this.responseAction("scan_fail")
              this.alertBox(`The tracking number barcode you scanned does not match any of the saved prefixes. Please check your tracking validation settings or contact an admin.`, true)
            }
          } else {
            temp_order["id"] = order_num
            temp_order["input"] = trackingNumber
            temp_order["state"] = 'scanpack.rfp.default'
            temp_order["event"] = "record"
            temp_order["updated_at"] = order.order.updated_at
            temp_order["increment_id"] = order.order.increment_id
            if (setting.post_scanning_option_second !== "None" && setting.post_scanning_option_second !== setting.post_scanning_option) {
              this.postScanFunction(setting.post_scanning_option_second, true)
              this.setState({ trackingOrderInput: "" })
              this.updateLog(temp_order, "tracking")
            } else {
              // localLogs.push(temp_order)
              localLogs.splice(0, 0, temp_order)
              this.updateLog(temp_order, "recordTracking")
              // this.responseAction("complete_order")
            }
          }
        }
        if (type === "Verify") {
          let trackNumber = order.order.tracking_num
          if (order.order.tracking_num !== null) {
            let scan = false
            if (this.state.scanSecondTime === true) {
              if (trackingNumber === this.state.userInfo.confirmation_code || (strict_cc === false && trackingNumber === "")) {
                scan = true
              }
            }
            if ((trackingNumber.length > order.order.tracking_num.length) || (trackingNumber.length === order.order.tracking_num.length)) {
              let tempNum = trackingLength - order.order.tracking_num.length
              num = trackingNumber.slice(tempNum)
            }
            if (num === order.order.tracking_num || scan === true) {
              temp_order["id"] = order_num
              temp_order["input"] = trackingNumber
              temp_order["state"] = this.state.trackingState === "scanpack.rfp.no_match" ? "scanpack.rfp.no_match" : "scanpack.rfp.verifying"
              temp_order["event"] = "verify"
              temp_order["updated_at"] = order.order.updated_at
              temp_order["increment_id"] = order.order.increment_id
              if (setting.post_scanning_option_second !== "None" && setting.post_scanning_option_second !== setting.post_scanning_option) {
                this.postScanFunction(setting.post_scanning_option_second, true)
                this.updateLog(temp_order, "tracking")
              } else {
                // localLogs.push(temp_order)
                localLogs.splice(0, 0, temp_order)
                this.updateLog(temp_order, "recordTracking")
                // this.responseAction("complete_order")
              }
            } else {
              this.responseAction("scan_fail")
              this.setState({ trackingState: "scanpack.rfp.no_match", scanSecondTime: true, postScanningMessageDetail: "The tracking number on the shipping label you just scanned does not match the tracking number imported with that order. Please verify that you have the correct shipping label and try your scan again. If you are aware of the issue and would like to proceed with the next order please scan your confirmation code to continue." })
            }
          } else {
            let message = ""
            if (order.order.tracking_num !== null && order.order.tracking_num !== "") {
              message = "The tracking number on the shipping label you just scanned does not match the tracking number imported with that order. Please verify that you have the correct shipping label and try your scan again. If you are aware of the issue and would like to proceed with the next order please scan your confirmation code to continue."
            } else {
              message = "Your Scan & Pack settings call for shipping label verification but no tracking information was imported with this order. Please scan your confirmation code or press enter to continue."
            }
            if (this.state.postScan) {
              if (trackingNumber === this.state.userInfo.confirmation_code || (strict_cc === false && trackingNumber === "")) {
                temp_order["id"] = order_num
                temp_order["input"] = trackingNumber
                temp_order["state"] = 'scanpack.rfp.no_tracking_info'
                temp_order["event"] = "verify"
                temp_order["updated_at"] = order.order.updated_at
                temp_order["increment_id"] = order.order.increment_id
                if (setting.post_scanning_option_second !== "None" && setting.post_scanning_option_second !== setting.post_scanning_option) {
                  this.postScanFunction(setting.post_scanning_option_second, true)
                  this.setState({ postScan: false })
                  this.updateLog(temp_order, "tracking")
                } else {
                  // localLogs.push(temp_order)
                  localLogs.splice(0, 0, temp_order)
                  this.updateLog(temp_order, "recordTracking")
                  // this.responseAction("complete_order")
                  this.setState({ postScan: false })
                }
              } else {
                this.responseAction("scan_fail")
                this.setState({ postScanningMessageDetail: message })
              }
            }
            this.setState({ postScan: true, postScanningMessageDetail: message })
          }
        }
      }
    }
    this.setState({ trackingOrderInput: "" })
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }
  }
  /* SUBMIT TRACKING END */

  postScanFunction = (type, timeSecond) => {
    let scanPack = this.state.scan_pack_settings
    let Order = this.state.order && this.state.order.order
    if (timeSecond) {
      if (type === "Record") {
        this.setState(
          {
            trackingNumberView: true,
            timeSecond: true,
            postScanningFieldLabel: `Scan Tracking Number for Order ${Order.increment_id}`,
            postScanningMessageDetail: "Please create the shipping label, adhere it to the package, and scan the tracking number to continue."
          }
        )
      }
      if (type === "Verify") {
        Order.tracking_num !== null
          ?
          this.setState(
            {
              trackingNumberView: true,
              timeSecond: true,
              postScanningFieldLabel: `Scan Shipping Label for Order ${Order.increment_id}`,
              postScanningMessageDetail: "Please scan the shipping label."
            }
          )
          :
          this.setState(
            {
              trackingNumberView: true,
              timeSecond: true,
              postScanningFieldLabel: `Scan Shipping Label for Order ${Order.increment_id}`,
              postScanSecond: true,
              postScanningMessageDetail: "Your Scan & Pack settings call for shipping label verification but no tracking information was imported with this order. Please scan your confirmation code or press enter to continue."
            }
          )
      }
    } else {
      if (type === "Record") {
        this.setState(
          {
            trackingNumberView: true,
            postScanningFieldLabel: `Scan Tracking Number for Order ${Order.increment_id}`,
            postScanningMessageDetail: "Please create the shipping label, adhere it to the package, and scan the tracking number to continue."
          }
        )
      }
      if (type === "Verify") {
        Order.tracking_num !== null
          ?
          this.setState(
            {
              trackingNumberView: true,
              postScanningFieldLabel: `Scan Shipping Label for Order ${Order.increment_id}`,
              postScanningMessageDetail: "Please scan the shipping label."
            }
          )
          :
          this.setState(
            {
              trackingNumberView: true,
              postScanningFieldLabel: `Scan Shipping Label for Order ${Order.increment_id}`,
              postScan: true,
              postScanningMessageDetail: "Your Scan & Pack settings call for shipping label verification but no tracking information was imported with this order. Please scan your confirmation code or press enter to continue."
            }
          )

      }
    }
  }

  updateAction = async (time) => {
    const soundObject = new Audio.Sound();
    await soundObject.unloadAsync();
    this.setState({ bar_code: "" })
  }

  /*Send log at the back end method start*/
  multipleTime = async () => {
    let getItem = await AsyncStorage.getItem("logsArray")
    let convert = getItem && JSON.parse(getItem)
    this.props.SubmitLog(convert)
    setTimeout(() => this.redirectFun(), 1000);
  }
  /*Send log at the back end method end*/

  /* FOR SUBMIT THE NOTE AND ISSUE ACTION BARCODE START */
  submitAlert = () => {
    let order_num = this.state.order.order.id
    let order = this.state.order
    let notes_fromPacker = this.state.notes_fromPacker
    order.order.notes_fromPacker = notes_fromPacker
    let localLogs = this.state.localLogs
    let temp_order = {}
    let event = ""
    temp_order["message"] = notes_fromPacker;
    temp_order["input"] = "";
    temp_order["id"] = order_num;
    temp_order["order_item_id"] = "";
    temp_order["time"] = new Date();
    temp_order["state"] = "";
    temp_order["event"] = "note"
    temp_order["SKU"] = ""
    temp_order["name"] = this.state.userInfo && this.state.userInfo.name ? this.state.userInfo.name : ""
    temp_order["updated_at"] = order.order.updated_at
    temp_order["increment_id"] = order.order.increment_id
    if (this.state.issueFlag) {
      this.updateLog(temp_order, "issue")
    }
    if (this.state.noteFlag) {
      this.updateLog(temp_order, "note")
    }
    // localLogs.push(temp_order)
    this.setState({ issueFlag: false, noteFlag: false, alert: false, notes_fromPacker: "", order })
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }
  }
  /* FOR SUBMIT THE NOTE AND ISSUE ACTION BARCODE END*/

  /* BULK SCAN START */
  scanAllItem = () => {
    let order = this.state.order
    let count = parseInt(this.state.typeScanCount)
    let bar_code = this.state.scan_pack_settings.type_scan_code
    let unscanned_items = order.order.unscanned_items
    let items = unscanned_items && unscanned_items[0]
    let scanned_items = order.order.scanned_items
    let log = this.state.log
    let order_num = order.order.id
    let next_state = order.next_state
    let general_settings = this.state.general_settings
    let temp_order = {}
    let itemFound = false
    let localLogs = this.state.localLogs
    let SKU = ""
    let orderComplete = false
    if (general_settings.conf_code_product_instruction === "always") {
      this.setState({ productConfirmationCheck: true, blockItemType: "bulk_scan" })
      blockScan = true
    } else if (general_settings.conf_code_product_instruction === "optional") {
      if (items.child_items && items.child_items.length >= 1) {
        if (items.child_items[0].confirmation === true) {
          this.setState({ productConfirmationCheck: true, blockItemToScan: items.child_items[0], blockItemType: "bulk_scan" })
          blockScan = true
        } else if (items.confirmation === true) {
          this.setState({ productConfirmationCheck: true, blockItemToScan: items, blockItemType: "bulk_scan" })
          blockScan = true
        }
      }
    }
    if (blockScan === false || confirmProductConfirmation === true) {
      if (items.product_type === "individual" && items.child_items && items.child_items.length > 0) {
        let serialScanAccess = false
        if (enableSerial || items.child_items[0].record_serial === false && items.child_items[0].second_record_serial === false) {
          serialScanAccess = true
        } else {
          if ((items.child_items[0].record_serial) || (items.child_items[0].second_record_serial)) {
            let eventType = "scan_all_item"
            this.setState({ serialRecordPopUpShow: true, type: eventType })
          }
        }
        if (serialScanAccess) {
          items.child_items && items.child_items.length > 0 && items.child_items.map((childItem, index) => {
            if (index === 0) {
              if (scanned_items.length > 0) {
                scanned_items.map((scan) => {
                  if (childItem.product_id === scan.product_id && itemFound === false) {
                    scan.scanned_qty = childItem.scanned_qty + childItem.qty_remaining
                    childItem.qty_remaining = 0
                    items.child_items.splice(index, 1)
                    itemFound = true
                    SKU = childItem.sku
                    items.child_items.length === 0 && unscanned_items.splice(index, 1)
                  } else {
                    if (childItem.scanned_qty === 0 && itemFound === false) {
                      childItem.scanned_qty = childItem.scanned_qty + childItem.qty_remaining
                      childItem.qty_remaining = 0
                      // scanned_items.push(childItem)
                      scanned_items.splice(0, 0, childItem)
                      items.child_items.splice(index, 1)
                      itemFound = true
                      SKU = childItem.sku
                      items.child_items.length === 0 && unscanned_items.splice(index, 1)
                    }
                  }
                })
              } else {
                if (itemFound === false) {
                  childItem.scanned_qty = childItem.scanned_qty + childItem.qty_remaining
                  childItem.qty_remaining = 0
                  // scanned_items.push(childItem)
                  scanned_items.splice(0, 0, childItem)
                  items.child_items.splice(index, 1)
                  itemFound = true
                  SKU = childItem.sku
                  items.child_items.length === 0 && unscanned_items.splice(index, 1)
                }
              }
              if (unscanned_items.length === 0) {
                orderComplete = true
              }
            }
            return childItem
          })
        }
      } else {
        if (items && items.qty_remaining > 0) {
          let serialScanAccess = false
          if (enableSerial || items.record_serial === false && items.second_record_serial === false) {
            serialScanAccess = true
          } else {
            if ((items.record_serial) || (items.second_record_serial)) {
              let eventType = "submit_type_scan"
              this.setState({ serialRecordPopUpShow: true, type: eventType })
            }
          }
          if (serialScanAccess) {
            unscanned_items.map((unscan, index) => {
              if (index === 0) {
                if (scanned_items.length > 0) {
                  scanned_items.map((scan) => {
                    if (unscan.order_item_id === scan.order_item_id && itemFound === false) {
                      scan.scanned_qty = unscan.scanned_qty + unscan.qty_remaining
                      scan.qty_remaining = 0
                      unscanned_items.splice(index, 1)
                      itemFound = true
                      SKU = unscan.sku
                    } else {
                      if (unscan.scanned_qty === 0 && itemFound === false) {
                        unscan.scanned_qty = unscan.scanned_qty + unscan.qty_remaining
                        unscan.qty_remaining = 0
                        // scanned_items.push(unscan)
                        scanned_items.splice(0, 0, unscan)
                        unscanned_items.splice(index, 1)
                        itemFound = true
                        SKU = unscan.sku
                      }
                    }
                  })
                } else {
                  unscan.scanned_qty = unscan.scanned_qty + unscan.qty_remaining
                  unscan.qty_remaining = 0
                  // scanned_items.push(unscan)
                  scanned_items.splice(0, 0, unscan)
                  unscanned_items.splice(index, 1)
                  SKU = unscan.sku
                }
                if (unscanned_items.length === 0) {
                  orderComplete = true
                }
              }
              return unscan
            })
          }
        }
      }
      if (this.state.type == "scan_all_item") {
      } else {
        temp_order["input"] = bar_code;
        temp_order["id"] = order_num;
        temp_order["order_item_id"] = items && items.order_item_id;
        temp_order["time"] = new Date();
        temp_order["state"] = next_state;
        temp_order["event"] = "bulk_scan"
        temp_order["SKU"] = SKU ? SKU : ""
        temp_order["name"] = this.state.userInfo && this.state.userInfo.name ? this.state.userInfo.name : ""
        temp_order["updated_at"] = order.order.updated_at
        temp_order["increment_id"] = order.order.increment_id
        this.updateLog(temp_order, "skip_curser")
        // localLogs.push(temp_order)
        localLogs.splice(0, 0, temp_order)
      }
      this.setState({ typeScanAlert: false, typeScanCount: "" })
      enableSerial = false
      if (orderComplete === true) {
        this.updateLog(temp_order, "order_complete")
      } else {
        this.responseAction("scan_success")
      }
      confirmProductConfirmation = false
    }
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }
  }
  /* BULK SCAN END */

  /* TYPE SCAN START*/
  submitTypeScan = () => {
    let order = this.state.order
    let count = parseInt(this.state.typeScanCount)
    let bar_code = this.state.scan_pack_settings.type_scan_code
    let unscanned_items = order.order.unscanned_items
    let items = unscanned_items && unscanned_items[0]
    let scanned_items = order.order.scanned_items
    // let log =  this.state.log
    let order_num = order.order.id
    let next_state = order.next_state
    let temp_order = {}
    let remain_qty = unscanned_items.length > 0 ? unscanned_items[0].qty_remaining : null
    let scanAccess = false
    let scanpush = false
    let match = false
    let skip = false
    let localLogs = this.state.localLogs
    let orderInputType = items.product_type === "individual" && items.child_items.length > 0 ? items.child_items[0].barcodes[0].barcode : items.barcodes[0].barcode
    let SKU = ""
    if (this.state.type === "submit_type_scan") {
      count = 1
    } else {
      count = this.state.typeScanState !== this.state.typeScanDeductCountState ? count - 1 : count
    }
    if (items.product_type === "individual" && items.child_items.length > 0) {
      if (items.child_items[0].qty_remaining >= count) {
        let serialScanAccess = false
        if (enableSerial || items.child_items[0].record_serial === false && items.child_items[0].second_record_serial === false) {
          serialScanAccess = true
        } else {
          if ((items.child_items[0].record_serial) || (items.child_items[0].second_record_serial)) {
            let eventType = "submit_type_scan"
            this.setState({ serialRecordPopUpShow: true, type: eventType })
          }
        }
        if (serialScanAccess) {
          items.child_items && items.child_items.map((child, index) => {
            if (index === 0) {
              if (scanned_items.length > 0) {
                scanned_items.map((scan) => {
                  let count_item = count
                  if (child.product_id === scan.product_id) {
                    child.qty_remaining = child.qty_remaining - count_item
                    child.scanned_qty = child.scanned_qty + count_item
                    scan.qty_remaining = child.qty_remaining
                    scan.scanned_qty = child.scanned_qty
                    child.qty_remaining === 0 && items.child_items.splice(index, 1)
                    SKU = child.sku
                  } else {
                    if (child.qty_remaining === count && child.scanned_qty === 0) {
                      child.qty_remaining = child.qty_remaining - count_item
                      child.scanned_qty = child.scanned_qty + count_item
                      scan.qty_remaining = child.qty_remaining
                      scan.scanned_qty = child.scanned_qty
                      // scanned_items.push(child)
                      scanned_items.splice(0, 0, child)
                      child.qty_remaining === 0 && items.child_items.splice(index, 1)
                      items.child_items.length === 0 && unscanned_items.splice(index, 1)
                      SKU = child.sku
                    } else {
                      if (child.qty_remaining >= count && child.scanned_qty === 0) {
                        child.qty_remaining = child.qty_remaining - count_item
                        child.scanned_qty = child.scanned_qty + count_item
                        scan.qty_remaining = child.qty_remaining
                        scan.scanned_qty = child.scanned_qty
                        // scanned_items.push(child)
                        scanned_items.splice(0, 0, child)
                        child.qty_remaining === 0 && items.child_items.splice(index, 1)
                        SKU = child.sku
                      }
                    }
                  }
                })
                if (child.qty_remaining === 0) {
                  items.child_items.length === 0 && unscanned_items.splice(index, 1)
                }
              } else {
                if (child.qty_remaining === count) {
                  let count_item = count
                  child.qty_remaining = child.qty_remaining - count_item
                  child.scanned_qty = child.scanned_qty + count_item
                  // scanned_items.push(child)
                  scanned_items.splice(0, 0, child)
                  child.qty_remaining === 0 && items.child_items.splice(index, 1)
                  items.child_items.length === 0 && unscanned_items.splice(index, 1)
                  SKU = child.sku
                } else {
                  if (child.qty_remaining >= count && child.scanned_qty === 0) {
                    let count_item = count
                    child.qty_remaining = child.qty_remaining - count_item
                    child.scanned_qty = child.scanned_qty + count_item
                    child.qty_remaining === 0 && items.child_items.splice(index, 1)
                    // scanned_items.push(child)
                    scanned_items.splice(0, 0, child)
                    SKU = child.sku
                  }
                }
              }
            }
          })
          if (unscanned_items.length > 0) {
            this.responseAction("scan_success")
          } else {
            this.responseAction("order_complete")
          }
        }
      } else {
        this.alertBox(`The quantity entered exceeds the remaining ${items.child_items[0].qty_remaining} pieces in the order. Please try again`, true)
        skip = true
      }
    } else {
      if (items.qty_remaining >= count) {
        let serialScanAccess = false
        if (enableSerial || items.record_serial === false && items.second_record_serial === false) {
          serialScanAccess = true
        } else {
          if ((items.record_serial) || (items.second_record_serial)) {
            let eventType = "submit_type_scan"
            this.setState({ serialRecordPopUpShow: true, type: eventType })
          }
        }
        if (serialScanAccess) {
          unscanned_items.map((unscan, index) => {
            if (index === 0) {
              if (scanned_items.length > 0) {
                scanned_items.map((scan) => {
                  let count_item = count
                  if (unscan.order_item_id === scan.order_item_id) {
                    unscan.qty_remaining = unscan.qty_remaining - count_item
                    unscan.scanned_qty = unscan.scanned_qty + count_item
                    scan.qty_remaining = unscan.qty_remaining
                    scan.scanned_qty = unscan.scanned_qty
                    SKU = unscan.sku
                  } else {
                    if (unscan.qty_remaining === count && unscan.scanned_qty === 0) {
                      unscan.qty_remaining = unscan.qty_remaining - count_item
                      unscan.scanned_qty = unscan.scanned_qty + count_item
                      scan.qty_remaining = unscan.qty_remaining
                      scan.scanned_qty = unscan.scanned_qty
                      // scanned_items.push(unscan)
                      scanned_items.splice(0, 0, unscan)
                      unscanned_items.splice(index, 1)
                      SKU = unscan.sku
                    } else {
                      if (unscan.qty_remaining >= count && unscan.scanned_qty === 0) {
                        unscan.qty_remaining = unscan.qty_remaining - count_item
                        unscan.scanned_qty = unscan.scanned_qty + count_item
                        scan.qty_remaining = unscan.qty_remaining
                        scan.scanned_qty = unscan.scanned_qty
                        // scanned_items.push(unscan)
                        scanned_items.splice(0, 0, unscan)
                        SKU = unscan.sku
                      }
                    }
                  }
                })
                if (unscan.qty_remaining === 0) {
                  unscanned_items.splice(index, 1)
                }
              } else {
                if (unscan.qty_remaining === count) {
                  let count_item = count
                  unscan.qty_remaining = unscan.qty_remaining - count_item
                  unscan.scanned_qty = unscan.scanned_qty + count_item
                  // scanned_items.push(unscan)
                  scanned_items.splice(0, 0, unscan)
                  unscanned_items.splice(index, 1)
                  SKU = unscan.sku
                } else {
                  if (unscan.qty_remaining >= count && unscan.scanned_qty === 0) {
                    let count_item = count
                    unscan.qty_remaining = unscan.qty_remaining - count_item
                    unscan.scanned_qty = unscan.scanned_qty + count_item
                    // scanned_items.push(unscan)
                    scanned_items.splice(0, 0, unscan)
                    SKU = unscan.sku
                  }
                }
              }
              if (unscanned_items.length > 0) {
                this.responseAction("scan_success")
              } else {
                this.responseAction("order_complete")
              }
            }
          })
        }
      } else {
        this.alertBox(`The quantity entered exceeds the remaining ${items.qty_remaining} pieces in the order. Please try again`, true)
        skip = true
      }
    }
    if (this.state.type === "submit_type_scan") {

    } else {
      temp_order["input"] = orderInputType
      temp_order["id"] = order_num
      temp_order["order_item_id"] = items && items.order_item_id
      temp_order["time"] = new Date()
      temp_order["box_id"] = null
      temp_order["state"] = 'scanpack.rfp.default'
      temp_order["count"] = count;
      temp_order["event"] = "type_scan"
      temp_order["SKU"] = SKU ? SKU : ""
      temp_order["name"] = this.state.userInfo && this.state.userInfo.name ? this.state.userInfo.name : ""
      temp_order["updated_at"] = order.order.updated_at
      temp_order["increment_id"] = order.order.increment_id
      // if(this.state.typeScanState !== unscanned_items[0] && unscanned_items[0].sku){
      //   this.setState({typeScanState: ""})
      // }
      if (skip === false) {
        this.updateLog(temp_order)
        // localLogs.push(temp_order)
        localLogs.splice(0, 0, temp_order)
      }
    }
    if (count <= remain_qty) {
      this.setState({ typeScanAlert: false, typeScanCount: "" })
    }
    enableSerial = false
    this.setState({ typeScanCount: "", typeScanDeductCountState: this.state.typeScanState, typeScanAlert: false })
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }
  }
  /* TYPE SCAN END */

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

  closeAlert = () => {
    this.setState({
      alert: false,
      notes_fromPacker: "",
      typeScanAlert: false,
      typeScanCount: 0,
      popUpModelShow: false,
      addBarcodeWindow: false,
      message: "",
      serialRecordPopUpShow: false,
      serialRecordInput: "",
      serialRecordTwo: "",
      serialRecordOne: "",
      clickScanConfirmation: false,
      confirmationCheckItem: null,
      clickScanConfirmInput: "",
      productConfirmationCheck: false,
      errorMessageProductConfirmationCheck: false,
      errorMessageClickScanConfirmation: false,
      orderConfirmPopUp: false
    })
    this.currentFocus()
    enableSerial = false
  }

  noBarcodeScan = (item) => {
  }

  /*Product Confirmation Submit Start*/
  ProductConfirmationCheckFun = () => {
    let userCode = this.state.userInfo.confirmation_code
    let userInput = this.state.productConfirmationCheckInput
    if (userInput !== "") {
      if (userCode === userInput) {
        // 12345678900
        if (this.state.blockItemType === "item_present") {
          confirmProductConfirmation = true
          this.clickScan(this.state.blockItemToScan)
        }
        if (this.state.blockItemType === "barcode") {
          confirmProductConfirmation = true
          this.scanBarcode()
        }
        if (this.state.blockItemType === "bulk_scan") {
          confirmProductConfirmation = true
          this.scanAllItem()
        }
        this.setState({ productConfirmationCheckInput: "", productConfirmationCheck: false })
      } else {
        this.setState({ productConfirmationCheckInput: "" })
        this.responseAction("scan_fail")
      }
    } else {
      if (this.state.generalSettings.strict_cc === true) {
        this.responseAction("not_ready")
      } else {
        if (this.state.blockItemType === "item_present") {
          confirmProductConfirmation = true
          this.clickScan(this.state.blockItemToScan)
        }
        if (this.state.blockItemType === "barcode") {
          confirmProductConfirmation = true
          this.scanBarcode()
        }
        if (this.state.blockItemType === "bulk_scan") {
          confirmProductConfirmation = true
          this.scanAllItem()
        }
        this.setState({ productConfirmationCheckInput: "", productConfirmationCheck: false })
      }
    }
  }
  /*Product Confirmation Submit End*/

  /*Product Confirmation Input Field On Change Start*/
  handleProductConfirmationCheckInput = (e) => {
    this.setState({ productConfirmationCheckInput: e, errorMessageProductConfirmationCheck: false })
  }
  /*Product Confirmation Input Field On Change End*/

  /*Order Confirmation Submit Start*/
  OrderConfirmationCheckFun = () => {
    let userCode = this.state.userInfo.confirmation_code
    let userInput = this.state.OrderConfirmationCheckInput
    if (userInput !== "") {
      if (userCode === userInput) {
        this.setState({ orderConfirmPopUp: false })
      } else {
        this.setState({ OrderConfirmationCheckInput: "" })
        this.responseAction("scan_fail")
      }
    } else {
      if (this.state.generalSettings.strict_cc === true) {
        this.responseAction("not_ready")
      } else {
        this.setState({ orderConfirmPopUp: false })
        this.currentFocus()
      }
    }
  }
  /*Order Confirmation Submit End*/

  /*Order Confirmation Input Field On Change Start*/
  handleOrderConfirmationCheckInput = (e) => {
    this.setState({ OrderConfirmationCheckInput: e, errorMessageOrderConfirmationCheck: false })
  }
  /*Order Confirmation Input Field On Change End*/


  /* RESTART ACTION BARCODE METHOD START*/
  // restart = () => {
  //   let order = this.state.order
  //   if(order){
  //     let temp = []
  //     let unscanned_items = order.order.unscanned_items
  //     let scanned_items = order.order.scanned_items
  //     order.order.scanned_items.map((scan , index) => {
  //         if(scan.qty_remaining !== 0){
  //           scan.qty_remaining = scan.scanned_qty
  //           scan.scanned_qty = 0
  //           unscanned_items.unshift(scan)
  //         }
  //     })
  //     order.order.scanned_items = []
  //   }
  // }
  /* RESTART ACTION BARCODE METHOD END*/

  restartButton = () => {
    let order = this.state.order
    let scanned_items = order.order.scanned_items
    let unscanned_items = order.order.unscanned_items
    let scan_pack_settings = this.state.scan_pack_settings
    let order_num = order.order.id
    let Log_count = ""
    let SKU = ""
    let product_name = ""
    let localLogs = this.state.localLogs
    let remain_qty = unscanned_items.length > 0 ? unscanned_items[0].qty_remaining : null
    let temp_order = {}
    let ActionBarcode = true
    temp_order["input"] = scan_pack_settings.restart_code;
    temp_order["id"] = order_num;
    temp_order["order_item_id"] = unscanned_items.length > 0 ? unscanned_items[0].order_item_id : (scanned_items.length > 0 ? scanned_items[0].order_item_id : "")
    temp_order["time"] = new Date()
    temp_order["rem_qty"] = remain_qty
    temp_order["SKU"] = SKU ? SKU : unscanned_items[0].sku
    temp_order["Log_count"] = Log_count
    temp_order["product_name"] = product_name
    temp_order["name"] = this.state.userInfo && this.state.userInfo.name ? this.state.userInfo.name : ""
    temp_order["state"] = 'scanpack.rfp.default'
    temp_order["event"] = "regular"
    temp_order["updated_at"] = order.order.updated_at
    temp_order["increment_id"] = order.order.increment_id
    this.updateLog(temp_order, "RESTART")
    if (this.state.serialRecordInput === "") {
      // localLogs.push(temp_order)
      localLogs.splice(0, 0, temp_order)
    }
    this.props.navigation.navigate("ScanPack")
  }

  addNote = () => {
    if (this.state.order) {
      let order = this.state.order
      let notes_fromPacker = order.order.notes_fromPacker
      this.setState({ alert: true, notes_fromPacker: notes_fromPacker === null ? "" : notes_fromPacker, noteFlag: true })
    }
  }

  saveChanges = async () => {
    let getItem = await AsyncStorage.getItem("logsArray")
    let count = getItem !== null && JSON.parse(getItem)
    if (count && count.length > 0) {
      this.alertBox(`Save Changes Successful`, true)
      this.multipleTime()
    }
  }

  /*SCAN BARCODE METHOD START*/
  scanBarcode = (clickBarcode, type) => {
    if (this.state.order) {
      let order = this.state.order
      let scan_pack_settings = this.state.scan_pack_settings
      let localScannedItems = this.state.scanned_items
      let scanned_items = order.order.scanned_items
      let notes_fromPacker = order.order.notes_fromPacker
      let unscanned_items = order.order.unscanned_items
      let bar_code = this.state.bar_code
      let event_code = this.state.bar_code
      let ActionBarcode = false
      let remain_qty = unscanned_items.length > 0 ? unscanned_items[0].qty_remaining : null
      if (type === "item_present") {
        bar_code = clickBarcode
        event_code = clickBarcode
        let tempArr = [{
          barcode: "noBarcode",
          id: 0,
          is_multipack_barcode: true,
          packing_count: "1"
        }]
        order.order.unscanned_items.map((noCode, index) => {
          if (noCode.barcodes && noCode.barcodes.length === 0) {
            noCode.barcodes = tempArr
          }
        })
      } else {
        bar_code = this.state.bar_code === "" ? this.state.forSerialRecord : this.state.bar_code
      }
      let findKit3 = false
      let log = this.state.log
      let order_num = order.order.id
      let next_state = order.next_state
      let general_settings = this.state.general_settings
      let master_switch = general_settings && general_settings.master_switch
      let temp_order = {}
      let stop_add_log = false;
      let lowercase = false;
      let skipError = false;
      let event_scanned = false;
      let SKU = "";
      let Log_count = "";
      let localLogs = this.state.localLogs
      let product_name = ""
      let rejectLocalLog = true
      let Action_Type = ""
      let order_complete_flag = false
      let qty_remain = 0
      let scanAccess = scan_pack_settings.scanning_sequence === "items_sequence" ? 0 : ""
      if (bar_code !== "") {
        if (scan_pack_settings.escape_string_enabled && type !== "item_present") {
          let removeSpaceBarCode = bar_code
          if (scan_pack_settings.first_escape_string_enabled) {
            let check = scan_pack_settings.escape_string
            if (removeSpaceBarCode && removeSpaceBarCode.includes(check) && scan_pack_settings.first_escape_string_enabled !== "") {
              let tempIndex = removeSpaceBarCode.indexOf(check)
              bar_code = removeSpaceBarCode.slice(0, tempIndex)
            }
          }
          if (scan_pack_settings.second_escape_string_enabled) {
            let check = scan_pack_settings.second_escape_string
            if (removeSpaceBarCode && removeSpaceBarCode.includes(check) && scan_pack_settings.second_escape_string !== "") {
              let tempIndex = removeSpaceBarCode.indexOf(check)
              bar_code = removeSpaceBarCode.slice(0, tempIndex)
            }
          }
        }
        if (scan_pack_settings.note_from_packer_code_enabled) {
          if (scan_pack_settings.note_from_packer_code === bar_code) {
            stop_add_log = true
            skipError = true
            this.setState({ alert: true, notes_fromPacker: notes_fromPacker === null ? "" : notes_fromPacker, noteFlag: true, bar_code: "" })
          }
        }
        if (scan_pack_settings && scan_pack_settings.restart_code_enabled && scan_pack_settings.restart_code === bar_code) {
          skipError = true
          Action_Type = "RESTART"
          ActionBarcode = true
          // this.responseAction("restart_action_complete")
        }
        if (scan_pack_settings.type_scan_code_enabled) {
          if (scan_pack_settings.type_scan_code === bar_code) {
            if (this.state.typeScanState !== "") {
              if (unscanned_items[0].product_type === "individual" && unscanned_items[0].child_items.length > 0) {
                if (this.state.typeScanState === unscanned_items[0].child_items[0].sku) {
                  if ((unscanned_items[0].child_items[0].record_serial) || (unscanned_items[0].child_items[0].second_record_serial)) {
                    this.setState({ typeScanAlert: true, type: "submit_type_scan" })
                  } else {
                    this.setState({ typeScanAlert: true })
                  }
                } else {
                  this.alertBox("Please scan the item once before triggering a type-in count.")
                }
              } else {
                if (this.state.typeScanState === unscanned_items[0].sku) {
                  if ((unscanned_items[0].record_serial) || (unscanned_items[0].second_record_serial)) {
                    this.setState({ typeScanAlert: true, type: "submit_type_scan" })
                  } else {
                    this.setState({ typeScanAlert: true })
                  }
                } else {
                  this.alertBox("Please scan the item once before triggering a type-in count.")
                }
              }
            } else {
              this.alertBox("Please scan the item once before triggering a type-in count.")
            }
            skipError = true
            stop_add_log = true
          }
        }
        if (scan_pack_settings.scanned) {
          if (scan_pack_settings.scanned_barcode === bar_code) {
            skipError = true
            event_scanned = true
            let Order = this.state.order && this.state.order.order
            Order["unscanned_items"] = []
            this.setState({ Order })
            this.responseAction("order_complete")
            ActionBarcode = true
            // stop_add_log = true
          }
        }
        if (scan_pack_settings.service_issue_code_enabled) {
          if (scan_pack_settings.service_issue_code === bar_code) {
            this.setState({ alert: true, notes_fromPacker: notes_fromPacker === null ? "" : notes_fromPacker, issueFlag: true })
            skipError = true
          }
        }
        if (scan_pack_settings.click_scan) {
          if (scan_pack_settings.click_scan_barcode === bar_code) {
            let item = unscanned_items && unscanned_items[0]
            this.clickScan(item, "actionbarcode")
            skipError = true
            ActionBarcode = true
          }
        }
        if (unscanned_items[0].product_type === "individual") {
          if (unscanned_items[0].child_items && unscanned_items[0].child_items.length > 0) {
            if (scan_pack_settings.remove_barcode && scan_pack_settings.remove_barcode === bar_code) {
              unscanned_items[0].child_items.shift()
              unscanned_items[0].child_items.length === 0 && unscanned_items.shift()
              this.responseAction("scan_success")
              skipError = true
              ActionBarcode = true
            }
          }
        } else {
          if (unscanned_items && unscanned_items.length > 0) {
            if (scan_pack_settings.remove_barcode && scan_pack_settings.remove_barcode === bar_code) {
              unscanned_items.shift()
              this.responseAction("scan_success")
              skipError = true
              ActionBarcode = true
            }
          }
        }
        if (scan_pack_settings.scanning_sequence === "any_sequence" && master_switch === false) {
          bar_code = bar_code.toLowerCase()
          lowercase = true
        }
        if (unscanned_items.length > 0) {
          if (scan_pack_settings.scanning_sequence === "any_sequence" ? "any_sequence" : "items_sequence") {
            let scanpush = false
            let itemFound = false
            unscanned_items.length > 0 && unscanned_items.map((item, index) => {
              if (item.product_type === "individual" && item.child_items && item.child_items.length > 0) {
                if (item.child_items[0].skippable) {
                  let skip_code = lowercase === true ? scan_pack_settings.skip_code.toLowerCase() : scan_pack_settings.skip_code
                  if (scan_pack_settings.skip_code_enabled && skip_code === bar_code) {
                    item.child_items.splice(index, 1)
                    itemFound = true
                    this.responseAction("scan_success")
                    if (unscanned_items.length === 0) {
                      order_complete_flag = true
                    }
                    ActionBarcode = true
                  }
                }
              } else {
                if (item.skippable) {
                  let skip_code = lowercase === true ? scan_pack_settings.skip_code.toLowerCase() : scan_pack_settings.skip_code
                  if (scan_pack_settings.skip_code_enabled && skip_code === bar_code) {
                    unscanned_items.splice(index, 1)
                    itemFound = true
                    this.responseAction("scan_success")
                    if (unscanned_items.length === 0) {
                      order_complete_flag = true
                    }
                    ActionBarcode = true
                  }
                }
              }

              scanAccess = scan_pack_settings.scanning_sequence === "items_sequence" ? 0 : index
              if (index === scanAccess) {
                {
                  item && item.product_type === "individual" && item.child_items && item.child_items.length > 0
                    ?
                    item && item.child_items.map((childItem, childIndex) => {
                      scanAccess = scan_pack_settings.scanning_sequence === "items_sequence" ? 0 : childIndex
                      if (childIndex === scanAccess) {
                        childItem.barcodes.map((barcode) => {
                          let Barcode = lowercase === true ? barcode.barcode.toLowerCase() : barcode.barcode
                          if (Barcode === bar_code && scanpush === false) {
                            let serialScanAccess = false
                            if (enableSerial || childItem.record_serial === false && childItem.second_record_serial === false) {
                              serialScanAccess = true
                            } else {
                              if ((childItem.record_serial) || (childItem.second_record_serial)) {
                                let eventType = type === "item_present" ? "clickscan" : "barcode"
                                rejectLocalLog = false
                                this.setState({ serialRecordPopUpShow: true, type: eventType })
                              }
                            }
                            if (confirmProductConfirmation === false) {
                              if (general_settings.conf_code_product_instruction === "always") {
                                this.setState({ productConfirmationCheck: true, blockItemToScan: childItem, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                skipError = true
                                blockScan = true
                              } else if (general_settings.conf_code_product_instruction === "optional") {
                                if (childItem.confirmation === true) {
                                  this.setState({ productConfirmationCheck: true, blockItemToScan: childItem, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                  skipError = true
                                  blockScan = true
                                }
                              }
                            }
                            if (blockScan === false || confirmProductConfirmation === true) {
                              if (serialScanAccess) {
                                if (scanned_items.length > 0) {
                                  scanned_items.map((scan, scanItemIndex) => {
                                    scan.barcodes.map((scancode) => {
                                      let Scancode = lowercase === true ? scancode.barcode.toLowerCase() : scancode.barcode
                                      if (type === "item_present" ? childItem.qty_remaining >= 1 : childItem.qty_remaining >= parseInt(barcode.packing_count)) {
                                        if (Scancode === Barcode && Barcode === bar_code && childItem.product_id === scan.product_id) {
                                          if (scan.qty_remaining === 1 && scanpush === false) {
                                            if (type === "item_present") {
                                              childItem.qty_remaining = childItem.qty_remaining - 1
                                              childItem.scanned_qty = childItem.scanned_qty + 1
                                              // scan.qty_remaining = childItem.qty_remaining
                                              // scan.scanned_qty = childItem.scanned_qty
                                            } else {
                                              if (childItem.qty_remaining > 0) {
                                                childItem.scanned_qty = childItem.scanned_qty + parseInt(barcode.packing_count)
                                                childItem.qty_remaining = childItem.qty_remaining - parseInt(barcode.packing_count)
                                                // scan.qty_remaining = childItem.qty_remaining
                                                // scan.scanned_qty = childItem.scanned_qty
                                              }
                                            }
                                            item.child_items.splice(scanAccess, 1)
                                            item.child_items.length === 0 && unscanned_items.splice(index, 1)
                                            scanned_items.splice(scanItemIndex, 1)
                                            scanned_items.splice(0, 0, scan)
                                            this.setState({ typeScanState: childItem.sku })
                                            scanpush = true
                                            SKU = childItem.sku
                                            Log_count = barcode.packing_count
                                            product_name = childItem.name
                                            qty_remain = childItem.qty_remaining
                                          } else {
                                            if (scan.qty_remaining > 0 && scanpush === false) {
                                              if (type === "item_present") {
                                                childItem.scanned_qty = childItem.scanned_qty + 1
                                                childItem.qty_remaining = childItem.qty_remaining - 1
                                                // scan.qty_remaining = childItem.qty_remaining
                                                // scan.scanned_qty = childItem.scanned_qty
                                              } else {
                                                childItem.scanned_qty = childItem.scanned_qty + parseInt(barcode.packing_count)
                                                childItem.qty_remaining = childItem.qty_remaining - parseInt(barcode.packing_count)
                                                // scan.qty_remaining = childItem.qty_remaining
                                                // scan.scanned_qty = childItem.scanned_qty
                                              }
                                              scanned_items.splice(scanItemIndex, 1)
                                              scanned_items.splice(0, 0, scan)
                                              this.setState({ typeScanState: childItem.sku })
                                              scanpush = true
                                              SKU = childItem.sku
                                              Log_count = barcode.packing_count
                                              product_name = childItem.name
                                              qty_remain = childItem.qty_remaining
                                            }
                                            if (childItem.qty_remaining === 0) {
                                              item.child_items.splice(scanAccess, 1)
                                              item.child_items.length === 0 && unscanned_items.splice(index, 1)
                                            }
                                          }
                                        } else {
                                          if (scancode !== bar_code && childItem.scanned_qty === 0) {
                                            if (childItem.qty_remaining === 1 && scanpush === false) {
                                              if (type === "item_present") {
                                                childItem.qty_remaining = childItem.qty_remaining - 1
                                                childItem.scanned_qty = childItem.scanned_qty + 1
                                                // scan.qty_remaining = childItem.qty_remaining
                                                // scan.scanned_qty = childItem.scanned_qty
                                              } else {
                                                childItem.qty_remaining = childItem.qty_remaining - parseInt(barcode.packing_count)
                                                childItem.scanned_qty = childItem.scanned_qty + parseInt(barcode.packing_count)
                                                // scan.qty_remaining = childItem.qty_remaining
                                                // scan.scanned_qty = childItem.scanned_qty
                                              }
                                              // scanned_items.push(childItem)
                                              scanned_items.splice(0, 0, childItem)
                                              item.child_items.splice(scanAccess, 1)
                                              item.child_items.length === 0 && unscanned_items.splice(index, 1)
                                              this.setState({ typeScanState: childItem.sku })
                                              scanpush = true
                                              SKU = childItem.sku
                                              Log_count = barcode.packing_count
                                              product_name = childItem.name
                                              qty_remain = childItem.qty_remaining
                                            } else {
                                              if (scanpush === false) {
                                                if (type === "item_present") {
                                                  childItem.qty_remaining = childItem.qty_remaining - 1
                                                  childItem.scanned_qty = childItem.scanned_qty + 1
                                                } else {
                                                  childItem.qty_remaining = childItem.qty_remaining - parseInt(barcode.packing_count)
                                                  childItem.scanned_qty = childItem.scanned_qty + parseInt(barcode.packing_count)
                                                }
                                                // scanned_items.push(childItem)
                                                scanned_items.splice(0, 0, childItem)
                                                this.setState({ typeScanState: childItem.sku })
                                                scanpush = true
                                                SKU = childItem.sku
                                                Log_count = barcode.packing_count
                                                product_name = childItem.name
                                                qty_remain = childItem.qty_remaining
                                              }
                                            }
                                          }
                                        }
                                      }
                                    })
                                  })
                                } else {
                                  if (Barcode === bar_code && childItem.qty_remaining >= parseInt(barcode.packing_count)) {
                                    if (childItem.qty_remaining === 1 && scanpush === false) {
                                      if (type === "item_present") {
                                        childItem.qty_remaining = childItem.qty_remaining - 1
                                        childItem.scanned_qty = childItem.scanned_qty + 1
                                      } else {
                                        childItem.qty_remaining = childItem.qty_remaining - parseInt(barcode.packing_count)
                                        childItem.scanned_qty = childItem.scanned_qty + parseInt(barcode.packing_count)
                                      }
                                      // scanned_items.push(childItem)
                                      scanned_items.splice(0, 0, childItem)
                                      item.child_items.splice(scanAccess, 1)
                                      item.child_items.length === 0 && unscanned_items.splice(index, 1)
                                      this.setState({ typeScanState: childItem.sku })
                                      scanpush = true
                                      SKU = childItem.sku
                                      Log_count = barcode.packing_count
                                      product_name = childItem.name
                                      qty_remain = childItem.qty_remaining
                                    } else {
                                      if (scanpush === false) {
                                        if (type === "item_present") {
                                          childItem.qty_remaining = childItem.qty_remaining - 1
                                          childItem.scanned_qty = childItem.scanned_qty + 1
                                        } else {
                                          childItem.qty_remaining = childItem.qty_remaining - parseInt(barcode.packing_count)
                                          childItem.scanned_qty = childItem.scanned_qty + parseInt(barcode.packing_count)
                                        }
                                        // scanned_items.push(childItem)
                                        scanned_items.splice(0, 0, childItem)
                                        this.setState({ typeScanState: childItem.sku })
                                        scanpush = true
                                        SKU = childItem.sku
                                        Log_count = barcode.packing_count
                                        product_name = childItem.name
                                        qty_remain = childItem.qty_remaining
                                      }
                                    }
                                  }
                                }
                              }
                              if (unscanned_items.length > 0) {
                                if (serialScanAccess) {
                                  if (type === "item_present") {
                                    this.responseAction("scan_success")
                                  } else {
                                    if (remain_qty >= parseInt(barcode.packing_count)) {
                                      this.responseAction("scan_success")
                                    } else {
                                      this.alertBox(`The multi-pack barcode scanned exceeds the quantity remaining`)
                                    }
                                  }
                                }
                              } else {
                                order_complete_flag = true
                                // this.responseAction("order_complete")
                              }
                              if ((this.state.blockItemToScan && this.state.blockItemToScan.name !== childItem.name) || childItem.qty_remaining === 0) {
                                confirmProductConfirmation = false
                              }
                              itemFound = true
                            }
                          }
                        })
                      }
                    })
                    :
                    (
                      item && item.product_type === "depends"
                        ?
                        item && item.barcodes.map((barcode, barcodeIndex) => {
                          let Barcode = lowercase === true ? barcode.barcode.toLowerCase() : barcode.barcode
                          let mainItem = false
                          unscanned_items.map((un) => {
                            un.barcodes.map((bar) => {
                              if (bar.barcode === bar_code) {
                                mainItem = true
                              }
                            })
                          })
                          if (Barcode === bar_code && scanpush === false) {
                            let serialScanAccess = false
                            if (enableSerial || item.record_serial === false && item.second_record_serial === false) {
                              serialScanAccess = true
                            } else {
                              if ((item.record_serial) || (item.second_record_serial)) {
                                let eventType = type === "item_present" ? "clickscan" : "barcode"
                                rejectLocalLog = false
                                this.setState({ serialRecordPopUpShow: true, type: eventType })
                              }
                            }
                            if (confirmProductConfirmation === false) {
                              if (general_settings.conf_code_product_instruction === "always") {
                                this.setState({ productConfirmationCheck: true, blockItemToScan: item, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                skipError = true
                                blockScan = true
                              } else if (general_settings.conf_code_product_instruction === "optional") {
                                if (item.confirmation === true) {
                                  this.setState({ productConfirmationCheck: true, blockItemToScan: item, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                  skipError = true
                                  blockScan = true
                                }
                              }
                            }
                            if (blockScan === false || confirmProductConfirmation === true) {
                              if (serialScanAccess) {
                                if (scanned_items.length > 0) {
                                  scanned_items.map((scan, scanIndex) => {
                                    scan.barcodes.map((scancode, scancodeIndex) => {
                                      let Scancode = lowercase === true ? scancode.barcode.toLowerCase() : scancode.barcode
                                      if (type === "item_present" ? item.qty_remaining >= 1 : item.qty_remaining >= parseInt(barcode.packing_count)) {
                                        if (Scancode === Barcode && Barcode === bar_code && item.order_item_id === scan.order_item_id) {
                                          if (scan.qty_remaining === 1 && scanpush === false) {
                                            if (type === "item_present") {
                                              item.qty_remaining = item.qty_remaining - 1
                                              item.scanned_qty = item.scanned_qty + 1
                                              scan.qty_remaining = item.qty_remaining
                                              scan.scanned_qty = item.scanned_qty
                                            } else {
                                              item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                              item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                              scan.qty_remaining = item.qty_remaining
                                              scan.scanned_qty = item.scanned_qty
                                            }
                                            unscanned_items.splice(scanAccess, 1)
                                            scanned_items.splice(scanIndex, 1)
                                            scanned_items.splice(0, 0, scan)
                                            this.setState({ typeScanState: item.sku })
                                            scanpush = true
                                            SKU = item.sku
                                            Log_count = barcode.packing_count
                                            product_name = item.name
                                            qty_remain = item.qty_remaining
                                          } else {
                                            if (scan.qty_remaining > 0 && scanpush === false) {
                                              if (type === "item_present") {
                                                item.scanned_qty = item.scanned_qty + 1
                                                item.qty_remaining = item.qty_remaining - 1
                                                scan.qty_remaining = item.qty_remaining
                                                scan.scanned_qty = item.scanned_qty
                                              } else {
                                                item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                                item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                scan.qty_remaining = item.qty_remaining
                                                scan.scanned_qty = item.scanned_qty
                                              }
                                              scanned_items.splice(scanIndex, 1)
                                              scanned_items.splice(0, 0, scan)
                                              this.setState({ typeScanState: item.sku })
                                              scanpush = true
                                              SKU = item.sku
                                              Log_count = barcode.packing_count
                                              product_name = item.name
                                              qty_remain = item.qty_remaining
                                            }
                                            if (item.qty_remaining === 0) {
                                              unscanned_items.splice(scanAccess, 1)
                                            }
                                          }
                                        } else {
                                          if (scancode !== bar_code && item.scanned_qty === 0) {
                                            if (item.qty_remaining === 1 && scanpush === false) {
                                              if (type === "item_present") {
                                                item.qty_remaining = item.qty_remaining - 1
                                                item.scanned_qty = item.scanned_qty + 1
                                                scan.qty_remaining = item.qty_remaining
                                                scan.scanned_qty = item.scanned_qty
                                              } else {
                                                item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                                scan.qty_remaining = item.qty_remaining
                                                scan.scanned_qty = item.scanned_qty
                                              }
                                              // scanned_items.push(item)
                                              scanned_items.splice(0, 0, item)
                                              unscanned_items.splice(scanAccess, 1)
                                              this.setState({ typeScanState: item.sku })
                                              scanpush = true
                                              SKU = item.sku
                                              Log_count = barcode.packing_count
                                              product_name = item.name
                                              qty_remain = item.qty_remaining
                                            } else {
                                              if (scanpush === false) {
                                                if (type === "item_present") {
                                                  item.qty_remaining = item.qty_remaining - 1
                                                  item.scanned_qty = item.scanned_qty + 1
                                                  scan.qty_remaining = item.qty_remaining
                                                  scan.scanned_qty = item.scanned_qty
                                                } else {
                                                  item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                  item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                                  scan.qty_remaining = item.qty_remaining
                                                  scan.scanned_qty = item.scanned_qty
                                                }
                                                // scanned_items.push(item)
                                                scanned_items.splice(0, 0, item)
                                                this.setState({ typeScanState: item.sku })
                                                scanpush = true
                                                SKU = item.sku
                                                Log_count = barcode.packing_count
                                                product_name = item.name
                                                qty_remain = item.qty_remaining
                                              }
                                            }
                                          }
                                        }
                                      }
                                    })
                                  })
                                } else {
                                  if (Barcode === bar_code && item.qty_remaining >= parseInt(barcode.packing_count)) {
                                    if (item.qty_remaining === 1 && scanpush === false) {
                                      if (type === "item_present") {
                                        item.qty_remaining = item.qty_remaining - 1
                                        item.scanned_qty = item.scanned_qty + 1
                                      } else {
                                        item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                        item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                      }
                                      // scanned_items.push(item)
                                      scanned_items.splice(0, 0, item)
                                      unscanned_items.splice(scanAccess, 1)
                                      this.setState({ typeScanState: item.sku })
                                      scanpush = true
                                      SKU = item.sku
                                      Log_count = barcode.packing_count
                                      product_name = item.name
                                      qty_remain = item.qty_remaining
                                    } else {
                                      if (scanpush === false) {
                                        if (type === "item_present") {
                                          item.qty_remaining = item.qty_remaining - 1
                                          item.scanned_qty = item.scanned_qty + 1
                                        } else {
                                          item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                          item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                        }
                                        // scanned_items.push(item)
                                        scanned_items.splice(0, 0, item)
                                        this.setState({ typeScanState: item.sku })
                                        scanpush = true
                                        SKU = item.sku
                                        Log_count = barcode.packing_count
                                        product_name = item.name
                                        qty_remain = item.qty_remaining
                                      }
                                    }
                                  }
                                }
                              }
                              if (unscanned_items.length > 0) {
                                if (serialScanAccess) {
                                  if (type === "item_present") {
                                    this.responseAction("scan_success")
                                  } else {
                                    if (remain_qty >= parseInt(barcode.packing_count)) {
                                      this.responseAction("scan_success")
                                    } else {
                                      this.alertBox(`The multi-pack barcode scanned exceeds the quantity remaining`)
                                    }
                                  }
                                }

                              } else {
                                order_complete_flag = true
                                // this.responseAction("order_complete")
                              }
                              itemFound = true
                              if ((this.state.blockItemToScan && this.state.blockItemToScan.name !== item.name) || item.qty_remaining === 0) {
                                confirmProductConfirmation = false
                              }
                            }
                          } else {
                            if (item.product_type === "depends" && mainItem === false) {
                              item && item.child_items.map((childItem, childItemIndex) => {
                                childItem.barcodes.map((childItemBarcode, childItemBarcodeIndex) => {
                                  let Barcode = lowercase === true ? childItemBarcode.barcode.toLowerCase() : childItemBarcode.barcode
                                  // let serialScanAccess = false
                                  if (Barcode === bar_code && scanpush === false && item.qty_remaining > 0) {
                                    let serialScanAccess = false
                                    if (enableSerial || childItem.record_serial === false && childItem.second_record_serial === false) {
                                      serialScanAccess = true
                                    } else {
                                      if ((childItem.record_serial) || (childItem.second_record_serial)) {
                                        let eventType = type === "item_present" ? "clickscan" : "barcode"
                                        rejectLocalLog = false
                                        this.setState({ serialRecordPopUpShow: true, type: eventType })
                                      }
                                    }
                                    if (serialScanAccess) {
                                      let tempItem = Object.assign({}, item);
                                      let tempItem1 = Object.assign({}, item);
                                      let tempItemChildArr = []
                                      let tempItem1ChildArr = []
                                      let arr = []
                                      tempItem.qty_remaining = 1
                                      tempItem.product_type = "individual"
                                      let kitDivide = tempItem1.qty_remaining
                                      tempItem.child_items.map((child) => {
                                        let newCopy = Object.assign({}, child)
                                        newCopy.qty_remaining = newCopy.qty_remaining / kitDivide
                                        tempItemChildArr.push(newCopy)
                                      })
                                      tempItem.child_items = tempItemChildArr
                                      tempItem1.qty_remaining = tempItem1.qty_remaining - 1
                                      tempItem1.child_items.map((childTemp) => {
                                        let newCopy = Object.assign({}, childTemp)
                                        let sub = newCopy.qty_remaining / kitDivide
                                        let final = newCopy.qty_remaining - sub
                                        newCopy.qty_remaining = final
                                        tempItem1ChildArr.push(newCopy)
                                        tempItem1.child_items = tempItem1ChildArr
                                        arr.push(tempItem, tempItem1)
                                      })
                                      // unscanned_items[index] = arr[0]
                                      // if(arr[1].qty_remaining > 1){
                                      unscanned_items.splice(index, 1, arr[0], arr[1])
                                      // }
                                    }
                                    unscanned_items.map((updateProduct, updateProductIndex) => {
                                      updateProduct && updateProduct.child_items && updateProduct.child_items.map((updateChildItem, updatedChildItemIndex) => {
                                        updateChildItem.barcodes.map((barcode) => {
                                          let Barcode = lowercase === true ? barcode.barcode.toLowerCase() : barcode.barcode
                                          if (Barcode === bar_code && scanpush === false) {
                                            let serialScanAccess = false
                                            if (enableSerial || updateChildItem.record_serial === false && updateChildItem.second_record_serial === false) {
                                              serialScanAccess = true
                                            } else {
                                              if ((updateChildItem.record_serial) || (updateChildItem.second_record_serial)) {
                                                let eventType = type === "item_present" ? "clickscan" : "barcode"
                                                rejectLocalLog = false
                                                this.setState({ serialRecordPopUpShow: true, type: eventType })
                                              }
                                            }
                                            if (confirmProductConfirmation === false) {
                                              if (general_settings.conf_code_product_instruction === "always") {
                                                this.setState({ productConfirmationCheck: true, blockItemToScan: childItem, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                                skipError = true
                                                blockScan = true
                                              } else if (general_settings.conf_code_product_instruction === "optional") {
                                                if (childItem.confirmation === true) {
                                                  this.setState({ productConfirmationCheck: true, blockItemToScan: childItem, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                                  skipError = true
                                                  blockScan = true
                                                }
                                              }
                                            }
                                            if (blockScan === false || confirmProductConfirmation === true) {
                                              if (serialScanAccess) {
                                                if (scanned_items.length > 0) {
                                                  scanned_items.map((scan, scanIndex) => {
                                                    scan.barcodes.map((scancode) => {
                                                      let Scancode = lowercase === true ? scancode.barcode.toLowerCase() : scancode.barcode
                                                      if (type === "item_present" ? updateChildItem.qty_remaining >= 1 : updateChildItem.qty_remaining >= parseInt(barcode.packing_count)) {
                                                        if (Scancode === Barcode && Scancode === bar_code && scan.order_item_id === item.order_item_id) {
                                                          if (scan.qty_remaining === 1 && scanpush === false) {
                                                            if (type === "item_present") {
                                                              updateChildItem.scanned_qty = updateChildItem.scanned_qty + 1
                                                              updateChildItem.qty_remaining = updateChildItem.qty_remaining - 1
                                                              //scan.scanned_qty = updateChildItem.scanned_qty
                                                              //scan.qty_remaining = updateChildItem.qty_remaining
                                                            } else {
                                                              updateChildItem.scanned_qty = updateChildItem.scanned_qty + parseInt(barcode.packing_count)
                                                              updateChildItem.qty_remaining = updateChildItem.qty_remaining - parseInt(barcode.packing_count)
                                                              //scan.scanned_qty = updateChildItem.scanned_qty
                                                              //scan.qty_remaining = updateChildItem.qty_remaining
                                                            }
                                                            updateProduct.child_items.splice(updatedChildItemIndex, 1)
                                                            scanned_items.splice(scanIndex, 1)
                                                            scanned_items.splice(0, 0, scan)
                                                            this.setState({ typeScanState: updateChildItem.sku })
                                                            scanpush = true
                                                            SKU = updateChildItem.sku
                                                            Log_count = barcode.packing_count
                                                            product_name = updateChildItem.name
                                                            qty_remain = updateChildItem.qty_remaining
                                                          } else {
                                                            if (scan.qty_remaining > 0 && scanpush === false) {
                                                              if (type === "item_present") {
                                                                updateChildItem.scanned_qty = updateChildItem.scanned_qty + 1
                                                                updateChildItem.qty_remaining = updateChildItem.qty_remaining - 1
                                                                //scan.scanned_qty = updateChildItem.scanned_qty
                                                                //scan.qty_remaining = updateChildItem.qty_remaining
                                                                updateChildItem.qty_remaining === 0 && updateProduct.child_items.splice(index, 1)
                                                              } else {
                                                                updateChildItem.scanned_qty = updateChildItem.scanned_qty + parseInt(barcode.packing_count)
                                                                updateChildItem.qty_remaining = updateChildItem.qty_remaining - parseInt(barcode.packing_count)
                                                                //scan.scanned_qty = updateChildItem.scanned_qty
                                                                //scan.qty_remaining = updateChildItem.qty_remaining
                                                                updateChildItem.qty_remaining === 0 && updateProduct.child_items.splice(index, 1)
                                                              }
                                                              scanned_items.splice(scanIndex, 1)
                                                              scanned_items.splice(0, 0, scan)
                                                              this.setState({ typeScanState: updateChildItem.sku })
                                                              scanpush = true
                                                              SKU = updateChildItem.sku
                                                              Log_count = barcode.packing_count
                                                              product_name = updateChildItem.name
                                                              qty_remain = updateChildItem.qty_remaining
                                                            }
                                                            if (updateChildItem.qty_remaining === 0) {
                                                              item.child_items.splice(scanAccess, 1)
                                                              item.child_items.length === 0 && unscanned_items.splice(index, 1)
                                                            }
                                                          }
                                                        } else {
                                                          if (Barcode === bar_code && updateChildItem.qty_remaining >= 1) {
                                                            if (updateChildItem.qty_remaining === 1 && scanpush === false) {
                                                              if (type === "item_present") {
                                                                updateChildItem.qty_remaining = updateChildItem.qty_remaining - 1
                                                                updateChildItem.scanned_qty = updateChildItem.scanned_qty + 1
                                                              } else {
                                                                updateChildItem.qty_remaining = updateChildItem.qty_remaining - parseInt(barcode.packing_count)
                                                                updateChildItem.scanned_qty = updateChildItem.scanned_qty + parseInt(barcode.packing_count)
                                                              }
                                                              //scanned_items.push(updateChildItem)
                                                              scanned_items.splice(0, 0, updateChildItem)
                                                              updateProduct.child_items.splice(updatedChildItemIndex, 1)
                                                              //scanned_items.splice(scanIndex , 1)
                                                              //scanned_items.splice(0, 0, scan)
                                                              this.setState({ typeScanState: updateChildItem.sku })
                                                              scanpush = true
                                                              SKU = updateChildItem.sku
                                                              Log_count = barcode.packing_count
                                                              product_name = updateChildItem.name
                                                              qty_remain = updateChildItem.qty_remaining
                                                            } else {
                                                              if (scanpush === false) {
                                                                if (type === "item_present") {
                                                                  updateChildItem.qty_remaining = updateChildItem.qty_remaining - 1
                                                                  updateChildItem.scanned_qty = updateChildItem.scanned_qty + 1
                                                                  //scan.scanned_qty = updateChildItem.scanned_qty
                                                                  //scan.qty_remaining = updateChildItem.qty_remaining
                                                                } else {
                                                                  updateChildItem.qty_remaining = updateChildItem.qty_remaining - parseInt(barcode.packing_count)
                                                                  updateChildItem.scanned_qty = updateChildItem.scanned_qty + parseInt(barcode.packing_count)
                                                                  //scan.scanned_qty = updateChildItem.scanned_qty
                                                                  //scan.qty_remaining = updateChildItem.qty_remaining
                                                                }
                                                                //scanned_items.push(updateChildItem)
                                                                scanned_items.splice(0, 0, updateChildItem)
                                                                //scanned_items.splice(scanIndex , 1)
                                                                //scanned_items.splice(0, 0, scan)
                                                                this.setState({ typeScanState: updateChildItem.sku })
                                                                scanpush = true
                                                                SKU = updateChildItem.sku
                                                                Log_count = barcode.packing_count
                                                                product_name = updateChildItem.name
                                                                qty_remain = updateChildItem.qty_remaining
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    })
                                                  })
                                                } else {
                                                  if (Barcode === bar_code && updateChildItem.qty_remaining >= parseInt(barcode.packing_count)) {
                                                    if (updateChildItem.qty_remaining === 1 && scanpush === false) {
                                                      if (type === "item_present") {
                                                        updateChildItem.qty_remaining = updateChildItem.qty_remaining - 1
                                                        updateChildItem.scanned_qty = updateChildItem.scanned_qty + 1
                                                      } else {
                                                        updateChildItem.qty_remaining = updateChildItem.qty_remaining - parseInt(barcode.packing_count)
                                                        updateChildItem.scanned_qty = updateChildItem.scanned_qty + parseInt(barcode.packing_count)
                                                      }
                                                      //scanned_items.push(updateChildItem)
                                                      scanned_items.splice(0, 0, updateChildItem)
                                                      updateProduct.child_items.splice(updatedChildItemIndex, 1)
                                                      // item.child_items.splice(scanAccess , 1 )
                                                      // item.child_items.length === 0 && unscanned_items.splice(scanAccess , 1)
                                                      this.setState({ typeScanState: updateChildItem.sku })
                                                      scanpush = true
                                                      SKU = updateChildItem.sku
                                                      Log_count = barcode.packing_count
                                                      product_name = updateChildItem.name
                                                      qty_remain = updateChildItem.qty_remaining
                                                    } else {
                                                      if (scanpush === false) {
                                                        if (type === "item_present") {
                                                          updateChildItem.qty_remaining = updateChildItem.qty_remaining - 1
                                                          updateChildItem.scanned_qty = updateChildItem.scanned_qty + 1
                                                        } else {
                                                          updateChildItem.qty_remaining = updateChildItem.qty_remaining - parseInt(barcode.packing_count)
                                                          updateChildItem.scanned_qty = updateChildItem.scanned_qty + parseInt(barcode.packing_count)
                                                        }
                                                        //scanned_items.push(updateChildItem)
                                                        scanned_items.splice(0, 0, updateChildItem)
                                                        this.setState({ typeScanState: updateChildItem.sku })
                                                        scanpush = true
                                                        SKU = updateChildItem.sku
                                                        Log_count = barcode.packing_count
                                                        product_name = updateChildItem.name
                                                        qty_remain = updateChildItem.qty_remaining
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                              if (unscanned_items.length > 0) {
                                                if (serialScanAccess) {
                                                  if (type === "item_present") {
                                                    this.responseAction("scan_success")
                                                  } else {
                                                    if (remain_qty >= parseInt(barcode.packing_count)) {
                                                      this.responseAction("scan_success")
                                                    } else {
                                                      this.alertBox(`The multi-pack barcode scanned exceeds the quantity remaining`)
                                                    }
                                                  }
                                                }
                                              } else {
                                                order_complete_flag = true
                                                // this.responseAction("order_complete")
                                              }
                                              itemFound = true
                                              if ((this.state.blockItemToScan && this.state.blockItemToScan.name !== updateChildItem.name) || updateChildItem.qty_remaining === 0) {
                                                confirmProductConfirmation = false
                                              }
                                            }
                                          }
                                        })
                                      })
                                    })
                                  }
                                })
                              })
                              item.qty_remaining === 0 && unscanned_items.splice(index, 1)
                            }
                          }
                        })
                        :
                        item && item.barcodes.map((barcode) => {
                          let Barcode = lowercase === true ? barcode.barcode.toLowerCase() : barcode.barcode
                          if (Barcode === bar_code && scanpush === false) {
                            let serialScanAccess = false
                            if (enableSerial || item.record_serial === false && item.second_record_serial === false) {
                              serialScanAccess = true
                            } else {
                              if ((item.record_serial) || (item.second_record_serial)) {
                                let eventType = type === "item_present" ? "clickscan" : "barcode"
                                rejectLocalLog = false
                                this.setState({ serialRecordPopUpShow: true, type: eventType, forSerialRecord: bar_code })
                              }
                            }

                            if (confirmProductConfirmation === false) {
                              if (general_settings.conf_code_product_instruction === "always") {
                                this.setState({ productConfirmationCheck: true, blockItemToScan: item, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                skipError = true
                                blockScan = true
                              } else if (general_settings.conf_code_product_instruction === "optional") {
                                if (item.confirmation === true) {
                                  this.setState({ productConfirmationCheck: true, blockItemToScan: item, blockItemType: type === "item_present" ? "item_present" : "barcode" })
                                  skipError = true
                                  blockScan = true
                                }
                              }
                            }

                            if (blockScan === false || confirmProductConfirmation === true) {
                              if (serialScanAccess) {
                                if (scanned_items.length > 0) {
                                  scanned_items.map((scan, scanItemIndex) => {
                                    if (scan.order_item_id === item.order_item_id) {
                                      scan.barcodes.map((scancode) => {
                                        let Scancode = lowercase === true ? scancode.barcode.toLowerCase() : scancode.barcode
                                        if (type === "item_present" ? item.qty_remaining >= 1 : item.qty_remaining >= parseInt(barcode.packing_count)) {
                                          if (Scancode === Barcode && Barcode === bar_code && item.order_item_id === scan.order_item_id) {
                                            if (scan.qty_remaining === 1 && scanpush === false) {
                                              if (type === "item_present") {
                                                item.qty_remaining = item.qty_remaining - 1
                                                item.scanned_qty = item.scanned_qty + 1
                                                //scan.qty_remaining = item.qty_remaining
                                                //scan.scanned_qty = item.scanned_qty
                                              } else {
                                                if (item.qty_remaining > 0) {
                                                  item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                  item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                                  //scan.qty_remaining = item.qty_remaining
                                                  //scan.scanned_qty = item.scanned_qty
                                                }
                                              }
                                              unscanned_items.splice(scanAccess, 1)
                                              scanned_items.splice(scanItemIndex, 1)
                                              scanned_items.splice(0, 0, scan)
                                              this.setState({ typeScanState: item.sku })
                                              scanpush = true
                                              SKU = item.sku
                                              Log_count = barcode.packing_count
                                              product_name = item.name
                                              qty_remain = item.qty_remaining
                                            } else {
                                              if (scan.qty_remaining > 1 && scanpush === false) {
                                                if (type === "item_present" && item.qty_remaining > 0) {
                                                  item.qty_remaining = item.qty_remaining - 1
                                                  item.scanned_qty = item.scanned_qty + 1
                                                  //scan.qty_remaining = item.qty_remaining
                                                  //scan.scanned_qty = item.scanned_qty
                                                } else {
                                                  if (item.qty_remaining > 0) {
                                                    item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                                    item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                    //scan.qty_remaining = item.qty_remaining
                                                    //scan.scanned_qty = item.scanned_qty
                                                  }
                                                }
                                                scanned_items.splice(scanItemIndex, 1)
                                                scanned_items.splice(0, 0, scan)
                                                this.setState({ typeScanState: item.sku })
                                                scanpush = true
                                                SKU = item.sku
                                                Log_count = barcode.packing_count
                                                product_name = item.name
                                                qty_remain = item.qty_remaining
                                              }
                                              if (item.qty_remaining === 0) {
                                                unscanned_items.splice(scanAccess, 1)
                                              }
                                            }
                                          } else {
                                            if (Scancode !== bar_code && item.scanned_qty === 0) {
                                              if (item.qty_remaining === 1 && scanpush === false) {
                                                if (type === "item_present") {
                                                  item.qty_remaining = item.qty_remaining - 1
                                                  item.scanned_qty = item.scanned_qty + 1
                                                } else {
                                                  if (item.qty_remaining > 0) {
                                                    item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                    item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                                  }
                                                }
                                                // scanned_items.push(item)
                                                scanned_items.splice(0, 0, item)
                                                unscanned_items.splice(scanAccess, 1)
                                                this.setState({ typeScanState: item.sku })
                                                scanpush = true
                                                SKU = item.sku
                                                Log_count = barcode.packing_count
                                                product_name = item.name
                                                qty_remain = item.qty_remaining
                                              } else {
                                                if (scanpush === false && item.qty_remaining > 0) {
                                                  if (type === "item_present") {
                                                    item.qty_remaining = item.qty_remaining - 1
                                                    item.scanned_qty = item.scanned_qty + 1
                                                  } else {
                                                    if (item.qty_remaining > 0) {
                                                      item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                      item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                                    }
                                                  }
                                                  // scanned_items.push(item)
                                                  scanned_items.splice(0, 0, item)
                                                  this.setState({ typeScanState: item.sku })
                                                  scanpush = true
                                                  SKU = item.sku
                                                  Log_count = barcode.packing_count
                                                  product_name = item.name
                                                  qty_remain = item.qty_remaining
                                                }
                                              }
                                            }
                                          }
                                        }
                                      })
                                    } else {
                                      //share barcode start when barcode is same//
                                      if (Barcode === bar_code && item.qty_remaining >= parseInt(barcode.packing_count)) {
                                        if (item.qty_remaining === 1 && scanpush === false) {
                                          if (type === "item_present") {
                                            item.qty_remaining = item.qty_remaining - 1
                                            item.scanned_qty = item.scanned_qty + 1
                                          } else {
                                            if (item.qty_remaining > 0) {
                                              item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                              item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                            }
                                          }
                                          // scanned_items.push(item)
                                          scanned_items.splice(0, 0, item)
                                          unscanned_items.splice(scanAccess, 1)
                                          this.setState({ typeScanState: item.sku })
                                          scanpush = true
                                          SKU = item.sku
                                          Log_count = barcode.packing_count
                                          product_name = item.name
                                          qty_remain = item.qty_remaining
                                        } else {
                                          if (scanpush === false && item.qty_remaining > 0) {
                                            if (type === "item_present") {
                                              item.qty_remaining = item.qty_remaining - 1
                                              item.scanned_qty = item.scanned_qty + 1
                                            } else {
                                              if (item.qty_remaining > 0) {
                                                item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                                item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                              }
                                            }
                                            // scanned_items.push(item)
                                            scanned_items.splice(0, 0, item)
                                            this.setState({ typeScanState: item.sku })
                                            scanpush = true
                                            SKU = item.sku
                                            Log_count = barcode.packing_count
                                            product_name = item.name
                                            qty_remain = item.qty_remaining
                                          }
                                        }
                                      }
                                      //share barcode end when barcode is same//
                                    }
                                  })
                                } else {
                                  if (Barcode === bar_code && item.qty_remaining >= parseInt(barcode.packing_count)) {
                                    if (item.qty_remaining === 1 && scanpush === false) {
                                      if (type === "item_present") {
                                        item.qty_remaining = item.qty_remaining - 1
                                        item.scanned_qty = item.scanned_qty + 1
                                      } else {
                                        if (item.qty_remaining > 0) {
                                          item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                          item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                        }
                                      }
                                      // scanned_items.push(item)
                                      scanned_items.splice(0, 0, item)
                                      unscanned_items.splice(scanAccess, 1)
                                      this.setState({ typeScanState: item.sku })
                                      scanpush = true
                                      SKU = item.sku
                                      Log_count = barcode.packing_count
                                      product_name = item.name
                                      qty_remain = item.qty_remaining
                                    } else {
                                      if (scanpush === false && item.qty_remaining > 0) {
                                        if (type === "item_present") {
                                          item.qty_remaining = item.qty_remaining - 1
                                          item.scanned_qty = item.scanned_qty + 1
                                        } else {
                                          if (item.qty_remaining > 0) {
                                            item.qty_remaining = item.qty_remaining - parseInt(barcode.packing_count)
                                            item.scanned_qty = item.scanned_qty + parseInt(barcode.packing_count)
                                          }
                                        }
                                        // scanned_items.push(item)
                                        scanned_items.splice(0, 0, item)
                                        this.setState({ typeScanState: item.sku })
                                        scanpush = true
                                        SKU = item.sku
                                        Log_count = barcode.packing_count
                                        product_name = item.name
                                        qty_remain = item.qty_remaining
                                      }
                                    }
                                  }
                                }
                              }
                              if (unscanned_items.length > 0) {
                                if (serialScanAccess) {
                                  if (type === "item_present") {
                                    this.responseAction("scan_success")
                                  } else {
                                    if (remain_qty >= parseInt(barcode.packing_count)) {
                                      this.responseAction("scan_success")
                                    } else {
                                      this.alertBox(`The multi-pack barcode scanned exceeds the quantity remaining`)
                                    }
                                  }
                                }
                              } else {
                                order_complete_flag = true
                                // this.responseAction("order_complete")
                              }
                              if ((this.state.blockItemToScan && this.state.blockItemToScan.name !== item.name) || item.qty_remaining === 0) {
                                confirmProductConfirmation = false
                              }
                              itemFound = true
                            }
                          }
                        })
                    )
                }
              }
              return item
            })
            if (skipError === false) {
              itemFound === false ? this.responseAction("scan_fail") : ""
            }
          }
        } else {
          order_complete_flag = true
          // this.responseAction("order_complete")
        }
        order.order.unscanned_items.map((noCode, index) => {
          if (noCode.barcodes && noCode.barcodes.length === 1 && noCode.barcodes[0].barcode === "noBarcode") {
            noCode.barcodes = []
          }
        })
        if (this.state.serialRecordInput !== "") {
          temp_order = updateSerialLog
        } else {
          temp_order["input"] = event_code;
          temp_order["id"] = order_num;
          temp_order["order_item_id"] = unscanned_items.length > 0 ? unscanned_items[0].order_item_id : (scanned_items.length > 0 ? scanned_items[0].order_item_id : "")
          temp_order["time"] = new Date()
          temp_order["rem_qty"] = remain_qty
          temp_order["qty_rem"] = qty_remain
          temp_order["SKU"] = SKU ? SKU : unscanned_items.length > 0 && unscanned_items[0].sku
          temp_order["Log_count"] = Log_count
          temp_order["product_name"] = product_name
          temp_order["name"] = this.state.userInfo && this.state.userInfo.name ? this.state.userInfo.name : ""
          temp_order["actionBarcode"] = ActionBarcode
          if (type !== "item_present") {
            temp_order["state"] = 'scanpack.rfp.default'
          }
          temp_order["increment_id"] = order.order.increment_id
          temp_order["event"] = this.state.bar_code ? "regular" : "click_scan"
          temp_order["updated_at"] = order.order.updated_at
          event_scanned === true ? temp_order["event"] = "regular" : temp_order["event"]
        }
        // event_scanned === true ? temp_order["event"] = "scanned" : temp_order["event"]
        if (stop_add_log !== true && temp_order !== undefined) {
          if (order_complete_flag) {
            this.updateLog(temp_order, "order_complete")
          } else {
            this.updateLog(temp_order, Action_Type)
          }
          if (this.state.serialRecordInput === "" && rejectLocalLog) {
            // localLogs.push(temp_order)
            localLogs.splice(0, 0, temp_order)
          }
        }
        this.setState({ scanned_items: scanned_items, serialRecordInput: "" })
        blockScan = false
      } else {
        if (event.keyCode === 13 && bar_code === "" && this.state.serialRecordInput === "") {
          this.responseAction("not_ready")
        }
      }
    }
    try {
      // this.barcode.current.focus();
    } catch (error) {
    }
    enableSerial = false
  }
  /*SCAN BARCODE METHOD END*/

  /* CLICK SCAN METHOD START */
  clickScan = (item, fromActionBarcode) => {
    let scan_pack_settings = this.state.scan_pack_settings
    let access = fromActionBarcode === "actionbarcode" ? scan_pack_settings.click_scan : scan_pack_settings.enable_click_sku
    if (access && item) {
      if (item.click_scan_enabled === "on" || item.click_scan_enabled === "on_with_confirmation") {
        if (item.click_scan_enabled === "on_with_confirmation") {
          this.setState({ clickScanConfirmation: true, confirmationCheckItem: item })
        } else {
          let barcode = item.barcodes && item.barcodes.length === 0 ? "noBarcode" : item.barcodes[0].barcode
          this.scanBarcode(barcode, "item_present")
        }
      } else {
        this.alertBox("Click scan is not enable")
      }
    }
    this.props.updateProductList(null)
  }
  /* CLICK SCAN METHOD END*/

  /*Click Scan Confirmation Pop Up Start*/
  clickScanConfirmFun = () => {
    let userInfo = this.state.userInfo
    let item = this.state.confirmationCheckItem
    if (item && userInfo) {
      if (this.state.userInfo.confirmation_code === this.state.clickScanConfirmInput) {
        let barcode = item.barcodes[0].barcode
        this.scanBarcode(barcode, "item_present")
        this.setState({ clickScanConfirmation: false, confirmationCheckItem: null, clickScanConfirmInput: "" })
      } else {
        if (this.state.general_settings && this.state.general_settings.strict_cc) {
          this.setState({ errorMessageClickScanConfirmation: true })
        } else {
          let barcode = item.barcodes[0].barcode
          this.scanBarcode(barcode, "item_present")
          this.setState({ clickScanConfirmation: false, confirmationCheckItem: null, clickScanConfirmInput: "" })
        }
      }
    }
  }
  /*Click Scan Confirmation Pop Up End*/

  /*Click Scan Confirmation On Change Start*/
  handleClickScanConfirmInput = (e) => {
    this.setState({ clickScanConfirmInput: e, errorMessageClickScanConfirmation: false })
  }
  /*Click Scan Confirmation On Change End*/

  /*METHOD TO UPDATE EVERY EVNET LOG START*/
  updateLog = async (logData, type) => {
    let temp = []
    let getItem = await AsyncStorage.getItem("logsArray")
    let logging = await AsyncStorage.getItem("Logging")
    let LoggingArray = JSON.parse(logging)
    if (LoggingArray && LoggingArray.length >= 80) {
      var indexToRemove = 0;
      var numberToRemove = 1;
      LoggingArray.splice(indexToRemove, numberToRemove);
    }
    LoggingArray && LoggingArray.length > 0 ? LoggingArray.push(logData) : LoggingArray = [logData]
    let getTemp = getItem !== "undefined" && JSON.parse(getItem)
    let arr = getTemp ? temp.concat(getTemp) : temp
    arr.push(logData)
    await AsyncStorage.setItem("logsArray", JSON.stringify(arr))
    if (logData && logData.event === "scanned") {
      this.multipleTime()
    }
    if (type === "issue") {
      this.multipleTime()
      this.nav(this.state.order)
    }
    if (type === "RESTART") {
      this.multipleTime()
      this.nav(this.state.order)
    }
    if (type === "order_complete") {
      if (this.state.scan_pack_settings.post_scanning_option === "None") {
        this.responseAction("complete_order")
      }
    }
    if (type === "recordTracking") {
      this.responseAction("complete_order")
      this.setState({ trackingOrderInput: "" })
    }
    await AsyncStorage.setItem("Logging", JSON.stringify(LoggingArray))
    // if(type === "tracking"){
    //   // this.multipleTime()
    //   // this.nav(this.state.order)
    //   this.responseAction("complete_order")
    //   this.setState({trackingOrderInput: ""})
    // }
    // this.setState({bar_code: ""})
  }
  /*METHOD TO UPDATE EVERY EVNET LOG END*/

  close = (type) => {
    if (this.state.order) {
      let scan_pack_settings = this.state.scan_pack_settings
      if (type === "show_customer_notes") {
        scan_pack_settings['show_customer_notes'] = false
      }
      if (type === "show_internal_notes") {
        scan_pack_settings['show_internal_notes'] = false
      }
      if (type === "notes_toPacker") {
        this.setState({ notes_toPacker_enable: false })
      }
      this.setState({ scan_pack_settings })
    }
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }
  }

  leaveComponent = async (order, type) => {
    if (type === "submitLog") {
      this.multipleTime()
    }
  }

  updateDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth
    })
  }
  componentWillUnmount() {
    let Order = this.state.order
    searchOrderCheck = false;
    ScanPackSettingsAccess = false;
    GeneralSettingAccess = false;
    orderSaveSuccess = false;
    updateLogSuccess = true;
    updateFromProductSuccess = false;
    if (Order) {
      this.leaveComponent(Order)
      this.setState({ oldOne: null })
      this.props.SearchScanpackOrder("", false)
    }
    window.removeEventListener('resize', this.updateDimensions);
  }

  hideShipment = () => {
    this.setState({ showshipments: false })
  }

  callShipmentOrder = (order) => {
    let shipmentOrder = this.state.shipmentOrder
    if (order.increment_id !== "") {
      callOrderSuccess = true
      shipmentOrder.input = order.increment_id
      this.hitApi(shipmentOrder)
    }
  }

  //according to the plateform call the function
  hitApi = (shipmentOrder) => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      this.InternetCheck(shipmentOrder)
    } else {
      this.props.SearchScanpackOrder(shipmentOrder)
    }
  }

  /*Check the connection for the ios and android start*/
  InternetCheck = async (shipmentOrder) => {
    const connectionInfo = await NetInfo.fetch();
    if (connectionInfo.isConnected) {
      this.props.SearchScanpackOrder(shipmentOrder)
    } else {
      this.setState({ errorMessageShow: true })
    }
  }
  /*Check the connection for the ios and android end*/

  enableToggle(e) {
    if (this.props.route && this.props.route.params) {
      if (e === 1) {
        this.props.route.params.item(true)
      } else {
        this.props.route.params.item(false)
      }
    }
  }

  serialLogUpdate(type, item, recordFrom, order_id, both) {
    let temp = {}
    let localLog = {}
    let localLogs = this.state.localLogs
    temp["clicked"] = type === "clickscan" ? true : false
    temp["barcode"] = item.barcodes[0].barcode
    temp["order_id"] = order_id
    temp["order_item_id"] = item.order_item_id
    temp["product_lot_id"] = null
    temp["ask"] = recordFrom === "recordOne" ? true : false
    temp["ask_2"] = recordFrom === "recordTwo" ? true : false
    temp["product_id"] = item.product_id
    if (both === false) {
      temp["is_scan"] = true
      temp["second_serial"] = false
    } else {
      if (recordFrom === "recordOne") {
        temp["is_scan"] = false
        temp["second_serial"] = false
      } else {
        temp["is_scan"] = true
        temp["second_serial"] = true
      }
    }
    temp["box_id"] = null
    temp["serial"] = this.state.serialRecordInput
    temp["event"] = "serial_scan"
    updateSerialLog = temp
    localLog["order_item_id"] = item && item.order_item_id
    localLog["time"] = new Date()
    localLog["event"] = "serial_scan"
    localLog["SKU"] = item.sku ? item.sku : ""
    localLog["name"] = this.state.userInfo && this.state.userInfo.name ? this.state.userInfo.name : ""
    if (both) {
      if (recordFrom === "recordTwo") {
        // localLogs.push(localLog)
        localLogs.splice(0, 0, localLog)
      }
    } else {
      // localLogs.push(localLog)
      localLogs.splice(0, 0, localLog)
    }
    this.updateSerialLog(temp)
  }

  updateSerialLog = async (logData) => {
    let temp = []
    let getItem = await AsyncStorage.getItem("logsArray")
    let getTemp = getItem !== "undefined" && JSON.parse(getItem)
    let arr = getTemp ? temp.concat(getTemp) : temp
    arr.push(logData)
    // console.log(arr)
    await AsyncStorage.setItem("logsArray", JSON.stringify(arr))
    // if(logData.event === "scanned"){
    //   this.multipleTime()
    // }
    // if(type === "issue"){
    //   this.multipleTime()
    //   this.nav(this.state.order)
    // }
    // if(type === "tracking"){
    //   // this.multipleTime()
    //   // this.nav(this.state.order)
    //   this.responseAction("complete_order")
    //   this.setState({trackingOrderInput: ""})
    // }
  }

  serialRecordFun() {
    let Order = this.state.order && this.state.order.order
    let scanPackSetting = this.state.scan_pack_settings
    let input = this.state.serialRecordInput
    let inputLength = input.length
    let match = false
    if (scanPackSetting.require_serial_lot) {
      if (scanPackSetting.valid_prefixes) {
        let prefix = scanPackSetting.valid_prefixes.split(',')
        let prefixLength
        let userInput
        let access = false
        prefix && prefix.length > 0 && prefix.map((serial) => {
          prefixLength = serial.length
          userInput = input.slice(0, prefixLength)
          if (userInput === serial) {
            access = true
          }
        })
        if (access) {
          match = true
          enableSerial = true
        } else {
          this.responseAction("scan_fail", "serialRecord")
          this.alertBox("The Value Scanned does not appear to be a Valid serial or lot number. Please check the 'Require Serial/Lot Prefix' setting in your scan and pack options.")
          this.setState({ type: this.state.type, serialRecordInput: "", serialRecordOne: "", serialRecordTwo: "" })
          match = false
          enableSerial = false
        }
      }
    } else {
      match = true
      enableSerial = true
    }
    let type = this.state.type
    let item = this.state.order && this.state.order.order && this.state.order.order.unscanned_items && this.state.order.order.unscanned_items[0]
    let order_id = this.state.order && this.state.order.order && this.state.order.order.id
    if (match) {
      if (item.child_items && item.child_items.length > 0 && item.child_items[0]) {
        if (item.child_items[0].record_serial && item.child_items[0].second_record_serial) {
          if (item.child_items[0].record_serial && this.state.serialRecordOne === "") {
            this.setState({ serialRecordOne: this.state.serialRecordInput })
            this.setState({ serialRecordInput: "" })
            this.serialLogUpdate(type, item.child_items[0], "recordOne", order_id, true)
          } else {
            this.setState({ serialRecordTwo: this.state.serialRecordInput })
            enableSerial = true
            this.allTypeScan(type, item.child_items[0])
            this.setState({ serialRecordPopUpShow: false, type: "", serialRecordInput: "", serialRecordOne: "", serialRecordTwo: "" })
            this.serialLogUpdate(type, item.child_items[0], "recordTwo", order_id, true)
          }
        } else {
          if (item.child_items[0].record_serial) {
            this.setState({ serialRecordOne: this.state.serialRecordInput })
            this.serialLogUpdate(type, item.child_items[0], "recordOne", order_id, false)
          } else {
            this.setState({ serialRecordTwo: this.state.serialRecordInput })
            this.serialLogUpdate(type, item.child_items[0], "recordTwo", order_id, false)
          }
          this.allTypeScan(type, item.child_items[0])
          this.setState({ serialRecordPopUpShow: false, type: "", serialRecordInput: "" })
        }
      } else {
        if (item.record_serial && item.second_record_serial) {
          if (this.state.serialRecordOne === "") {
            this.setState({ serialRecordOne: this.state.serialRecordInput })
            this.setState({ serialRecordInput: "" })
            this.serialLogUpdate(type, item, "recordOne", order_id, true)
          } else {
            this.setState({ serialRecordTwo: this.state.serialRecordInput })
            enableSerial = true
            this.setState({ serialRecordPopUpShow: false, type: "", serialRecordInput: "", serialRecordOne: "", serialRecordTwo: "" })
            this.serialLogUpdate(type, item, "recordTwo", order_id, true)
            this.allTypeScan(type, item)
          }
        } else {
          if (item.record_serial) {
            this.serialLogUpdate(type, item, "recordOne", order_id, false)
          } else {
            this.serialLogUpdate(type, item, "recordTwo", order_id, false)
          }
          this.allTypeScan(type, item)
          // enableSerial = true
          this.setState({ serialRecordPopUpShow: false, type: "", serialRecordInput: "" })
        }
      }
    }
  }

  allTypeScan = (type, item, recordSerial) => {
    if (type === "clickscan") {
      this.clickScan(item)
    }
    if (type === "barcode") {
      this.scanBarcode()
      this.setState({ bar_code: "" })
    }
    if (type === "scan_all_item") {
      this.scanAllItem("scan_all_item")
    }
    if (type === "submit_type_scan") {
      this.submitTypeScan("submit_type_scan")
    }
  }

  handleSerialRecordInput = (e) => {
    this.setState({ serialRecordInput: e })
  }

  /*Product Detail Nav Start*/
  redirectToItemDetail(product) {
    if (product && product.product_id) {
      this.props.navigation.navigate("ProductDetail", { productInfo: product.product_id, orderID: this.state.order.order.id, increment_id: this.state.order.order.increment_id })
    }
  }
  /*Product Detail Nav End*/

  removeFocus() {
    // this.barcode.blur()
    // this.barcode.current.focus()
  }

  onKeyUp(keyName, e, handle) {
    this.setState({ focusBarcode: true })
  }

  onKeyDown(keyName, e, handle) {
    this.setState({ focusBarcode: true })
  }

  navButton = () => {
    this.setState({ reRenderFocus: true, unscannedItemShow: false, nextItemShow: true, scannedItemShow: false }, () => {
      console.log("Update");
    })
    setTimeout(function () {
      this.setState({ reRenderFocus: false, message: "" });
    }.bind(this), 1);
  }

  navButtonLeft = () => {
    this.setState({ reRenderFocus: true, unscannedItemShow: true, nextItemShow: false, scannedItemShow: false }, () => {
      console.log("Update");
    })
    setTimeout(function () {
      this.setState({ reRenderFocus: false, message: "" });
    }.bind(this), 1);
  }

  showScannedList = () => {
    this.setState({ reRenderFocus: true, unscannedList: false, scannedList: true, logList: false })
    setTimeout(function () {
      this.setState({ reRenderFocus: false, message: "" });
    }.bind(this), 1);
  }

  showUnscannedList = () => {
    this.setState({ reRenderFocus: true, unscannedList: true, scannedList: false, logList: false })
    setTimeout(function () {
      this.setState({ reRenderFocus: false, message: "" });
    }.bind(this), 1);
  }

  showLogList = () => {
    this.setState({ reRenderFocus: true, unscannedList: false, scannedList: false, logList: true })
    setTimeout(function () {
      this.setState({ reRenderFocus: false, message: "" });
    }.bind(this), 1);
  }

  closeNotes = () => {
    this.setState({
      notes_toPackerFlag: false,
      notes_internalFlag: false,
      customer_commentsFlag: false
    });
    this.currentFocus()
  }

  assignUniquebarcode = (from) => {
    this.setState({ shareBarcodeShow: false, alias: false, addBarcodeWindow: false, addBarcodeText: "" })
  }

  proceedAliasing = () => {
    let alias_product_data_id = this.state.updateProduct.alias_product_data.id
    let current_product_data_id = []
    current_product_data_id.push(this.state.updateProduct.current_product_data.id)
    let details = {
      product_alias_ids: current_product_data_id
    }
    this.props.updateProductAlias(alias_product_data_id, details)
    this.props.SearchScanpackOrder("", false)
    updateProductInfoSuccess = true
    updateFromProductSuccess = true
    updateAliasSuccess = true
  }

  sameBarcode = () => {
    let newHash = {
      value: this.state.addBarcodeText,
      var: "barcode",
      id: this.state.addBarcodeItem.product_id,
      permit_same_barcode: true
    }
    this.props.updateProductList(newHash)
    this.setState({ updateProductApiCall: new Date(), shareBarcodeShow: false, alias: false })
    updateProductApi = true
  }

render() {
  const config = { velocityThreshold: 1, directionalOffsetThreshold: 80 };
  // const config = { velocityThreshold: 1, directionalOffsetThreshold: 80, gestureIsClickThreshold : 5 };
  const props = this.props
  const Order = this.state.order && this.state.order.order
  const settings = this.state.scan_pack_settings
  Order && Order.status === "scanned" && this.props.navigation.navigate("ScanPack", { showScannedMessage: true })
  return (
    <View key="main" style={{ height: "100%", flex: 1 }}>
      {
        <React.Fragment>
          {
            this.state.loader &&
            <View style={styles.activityContainer}>
              <ActivityIndicator size="large" color="#000" />
              <View>
                <Text style={{ textAlign: "center", color: "#fff", fontSize: 16 }}>Loading...</Text>
              </View>
            </View>
          }
          {
            Order && this.state.scan_pack_settings &&
            <View style={[globalStyles.flex1, { height: "100%", position: "relative" }]}>
              {
                this.state.orderConfirmPopUp
                &&
                <OrderConfirmationPopUp OrderConfirmationCheckFun={() => this.OrderConfirmationCheckFun()}
                  OrderConfirmationCheckInput={this.state.OrderConfirmationCheckInput}
                  errorMessageOrderConfirmationCheck={this.state.errorMessageOrderConfirmationCheck}
                  handleOrderConfirmationCheckInput={(e) => this.handleOrderConfirmationCheckInput(e)}
                  closeAlert={this.closeAlert.bind(this)}
                  orderDetails={this.state.order && this.state.order.order}
                  {...this.props}
                />
              }
              <ProductAlias alias={this.state.alias}
                Product={this.state.Product}
                updateProduct={this.state.updateProduct}
                assignUniquebarcode={(from) => this.assignUniquebarcode(from)}
                shareBarcodeMethod={() => { this.setState({ shareBarcodeShow: true, alias: false }) }}
                proceedAliasing={() => this.proceedAliasing()}
                shareBarcodeShow={this.state.shareBarcodeShow}
                sameBarcode={() => this.sameBarcode()} />

              { //Succes Image , Error Image , Order Complete Image
                this.state.responseShowAction &&
                <ResponseView orderCompleteAction={this.state.orderCompleteAction}
                  scanSuccessAction={this.state.scanSuccessAction}
                  // scanFailAction={this.state.scanFailAction}
                  scanFailAction={this.state.scanFailAction}
                  scanPackSetting={this.state.scan_pack_settings}
                  generalSetting={this.state.general_settings}
                />
              }
              { //Type Scan Count Pop Up
                this.state.typeScanAlert &&
                <TypeScanAlert closeAlert={this.closeAlert.bind(this)}
                  typeScanCount={this.state.typeScanCount}
                  typeScanCountUpdate={(text) => this.setState({ typeScanCount: text })}
                  submitTypeScan={this.submitTypeScan.bind(this)}
                  // submitTypeScan={this.serialRecordCheck.bind(this , "submit_type_scan")}
                  scanPackSetting={this.state.scan_pack_settings}
                  generalSetting={this.state.general_settings}
                />
              }
              { // Add Note Pop Up 
                this.state.alert &&
                <Alert closeAlert={this.closeAlert.bind(this)}
                  submitAlert={this.submitAlert.bind(this)}
                  notes_fromPacker={this.state.notes_fromPacker}
                  noteUpdate={(text) => this.setState({ notes_fromPacker: text })}
                  scanPackSetting={this.state.scan_pack_settings}
                  generalSetting={this.state.general_settings}
                />
              }

              { // Notification Pop Up for messages
                this.state.popUpModelShow &&
                <PopUpModel closeAlert={this.closeAlert.bind(this)}
                  message={this.state.message}
                  messageTypeSuccess={this.state.messageTypeSuccess ? true : false}
                />
              }
              { // Serial Record Pop Up
                this.state.serialRecordPopUpShow &&
                <SerialRecord serialRecordFun={() => this.serialRecordFun()}
                  serialRecordInput={this.state.serialRecordInput}
                  handleSerialRecordInput={(e) => this.handleSerialRecordInput(e)}
                  closeAlert={this.closeAlert.bind(this)}
                  serialRecord={() => this.serialRecord}
                  {...this.props}
                />
              }
              { // Click Scan Confirmation Pop Up
                this.state.clickScanConfirmation &&
                <ClickScanConfirmationPopUp clickScanConfirmFun={() => this.clickScanConfirmFun()}
                  clickScanConfirmInput={this.state.clickScanConfirmInput}
                  errorMessageClickScanConfirmation={this.state.errorMessageClickScanConfirmation}
                  handleClickScanConfirmInput={(e) => this.handleClickScanConfirmInput(e)}
                  closeAlert={this.closeAlert.bind(this)}
                  serialFocus={myInput}
                />
              }

              { // Add Barcode Pop Up 
                this.state.addBarcodeWindow &&
                <AddBarcode closeAlert={(e) => this.closeAlert(e)}
                  addBarcodeSubmit={(e) => this.addBarcodeSubmit(e)}
                  addBarcodeText={this.state.addBarcodeText}
                  addBarcodeChange={(text) => this.setState({ addBarcodeText: text })}
                  addBarcodeWindow={this.state.addBarcodeWindow}
                />
              }

              { // Notification Pop Up for messages
                this.state.popUpModelShow &&
                <PopUpModel closeAlert={this.closeAlert.bind(this)}
                  message={this.state.message}
                />
              }
              { // Serial Record Pop Up
                this.state.serialRecordPopUpShow &&
                <SerialRecord serialRecordFun={() => this.serialRecordFun()}
                  serialRecordInput={this.state.serialRecordInput}
                  handleSerialRecordInput={(e) => this.handleSerialRecordInput(e)}
                  closeAlert={this.closeAlert.bind(this)}
                  serialRecord={() => this.serialRecord}
                  {...this.props}
                />
              }
              { // Click Scan Confirmation Pop Up
                this.state.clickScanConfirmation &&
                <ClickScanConfirmationPopUp clickScanConfirmFun={() => this.clickScanConfirmFun()}
                  clickScanConfirmInput={this.state.clickScanConfirmInput}
                  errorMessageClickScanConfirmation={this.state.errorMessageClickScanConfirmation}
                  handleClickScanConfirmInput={(e) => this.handleClickScanConfirmInput(e)}
                  closeAlert={this.closeAlert.bind(this)}
                  serialFocus={myInput}
                />
              }

              {
                //productConfirmationCheck
                this.state.productConfirmationCheck &&
                <ProductConfirmationCheck ProductConfirmationCheckFun={() => this.ProductConfirmationCheckFun()}
                  ProductConfirmationCheckInput={this.state.productConfirmationCheckInput}
                  errorMessageProductConfirmationCheck={this.state.errorMessageProductConfirmationCheck}
                  handleProductConfirmationCheckInput={(e) => this.handleProductConfirmationCheckInput(e)}
                  closeAlert={this.closeAlert.bind(this)}
                  instruction={this.state.blockItemToScan}
                  {...this.props}
                />
              }
              {
                this.state.scan_pack_settings.post_scanning_option !== "None" && Order && Order.unscanned_items.length === 0
                  ?
                  <ConfirmTrackingNumber postScanningFieldLabel={this.state.postScanningFieldLabel}
                    trackingOrderInput={this.state.trackingOrderInput}
                    onChangeText={(text) => { this.setState({ trackingOrderInput: text }) }}
                    onSubmitEditing={this.trackingSubmit.bind(this, this.state.trackingOrderInput)}
                    postScanningMessageDetail={this.state.postScanningMessageDetail}
                  />
                  :
                  <React.Fragment>
                    {
                      this.props.route && this.props.route.params && this.state.order &&
                      <Hotkeys
                        keyName="enter"
                        onKeyDown={this.onKeyDown.bind(this)}
                        onKeyUp={this.onKeyUp.bind(this)}
                      >
                        <View style={{ flex: 1 }} >
                          {
                            Platform.OS === "web"
                              ?
                              <View style={{ flex: 1 }}>
                                {
                                  this.state.windowWidth >= 900
                                    ?
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                      <View style={{ flex: 2 }}>
                                        <UnscannedItems {...this.props}
                                          order={this.state.order}
                                          currentFocus={() => this.currentFocus()}
                                          scanPackSetting={this.state.scan_pack_settings}
                                          generalSetting={this.state.general_settings}
                                          redirectToItemDetail={(e) => this.redirectToItemDetail(e)}
                                          unscannedItemPerPage={this.state.unscannedItemPerPage}
                                          InputField={this.InputField}
                                          scannedList={this.state.scannedList}
                                          unscannedList={this.state.unscannedList}
                                          logList={this.state.logList}
                                          showUnscannedList={() => this.showUnscannedList()}
                                          showScannedList={() => this.showScannedList()}
                                          showLogList={() => this.showLogList()}
                                          localLogs={this.state.localLogs}
                                        />
                                      </View>
                                      <View style={{ flex: 4 }}>
                                        {
                                          this.state.loadOrderSpinner
                                            ?
                                            <View style={{ marginTop: 100 }}>
                                              <ActivityIndicator size="large" color="#000" />
                                              <View>
                                                <Text style={{ textAlign: "center" }}>Fetch more item to scan...</Text>
                                              </View>
                                            </View>
                                            :
                                            <NextItems {...this.props}
                                              order={this.state.order}
                                              currentFocus={() => this.currentFocus()}
                                              barcodeRef={this.barcode}
                                              access_token={this.state.token}
                                              barcodeState={this.state.bar_code}
                                              removeFocus={() => this.removeFocus()}
                                              clickScan={(e) => this.clickScan(e)}
                                              // clickScan={this.serialRecordCheck.bind(this , "clickscan")}
                                              scanAllItem={(e) => this.scanAllItem(e)}
                                              // scanAllItem={this.serialRecordCheck.bind(this , "scan_all_item")}
                                              scanBarcode={(e) => this.scanBarcode(e)}
                                              // scanBarcode={this.serialRecordCheck.bind(this , "barcode")}
                                              stateUpdate={(text) => this.setState({ bar_code: text })}
                                              scanPackSetting={this.state.scan_pack_settings}
                                              generalSetting={this.state.general_settings}
                                              activities={props && props.Order && props.Order.activities}
                                              localLogs={this.state.localLogs}
                                              restartButton={() => this.restartButton()}
                                              redirectToItemDetail={(e) => this.redirectToItemDetail(e)}
                                              addNote={() => this.addNote()}
                                              saveChanges={() => this.saveChanges()}
                                              leaveComponent={(order, type) => this.leaveComponent(order, type)}
                                              loadOrderSpinner={this.state.loadOrderSpinner}
                                              unscannedItemPerPage={this.state.unscannedItemPerPage}
                                              scannedItemPerPage={this.state.scannedItemPerPage}
                                              InputField={this.InputField}
                                              scannedList={this.state.scannedList}
                                              unscannedList={this.state.unscannedList}
                                              logList={this.state.logList}
                                              showScannedList={() => this.showScannedList()}
                                              showUnscannedList={() => this.showUnscannedList()}
                                              showLogList={() => this.showLogList()}
                                              addBarcode={(e) => this.addBarcode(e)}
                                              notesToPackerFlag={this.state.notes_toPackerFlag}
                                              closeNotes={() => this.closeNotes()}
                                              settings={settings}
                                              customerCommentsFlag={this.state.customer_commentsFlag}
                                              internalNotesFlag={this.state.notes_internalFlag}
                                            />
                                        }
                                      </View>
                                      <View style={{ flex: 2, zIndex: -1 }}>
                                        <ScannedItems {...this.props}
                                          order={this.state.order}
                                          scanPackSetting={this.state.scan_pack_settings}
                                          generalSetting={this.state.general_settings}
                                          scannedItemPerPage={this.state.scannedItemPerPage}
                                        />
                                      </View>
                                    </View>
                                    :
                                    <View style={{ flex: 1, backgroundColor: "#292929" }}>
                                      {
                                        this.state.unscannedItemShow === true && this.state.nextItemShow === false &&
                                        <UnscannedItems {...this.props}
                                          order={this.state.order}
                                          currentFocus={() => this.currentFocus()}
                                          barcodeRef={this.barcode}
                                          access_token={this.state.token}
                                          barcodeState={this.state.bar_code}
                                          removeFocus={(e) => this.removeFocus(e)}
                                          redirectToItemDetail={(e) => this.redirectToItemDetail(e)}
                                          clickScan={(e) => this.clickScan(e)}
                                          // clickScan={this.serialRecordCheck.bind(this , "clickscan")}
                                          scanAllItem={(e) => this.scanAllItem(e)}
                                          // scanAllItem={this.serialRecordCheck.bind(this , "scan_all_item")}
                                          scanBarcode={(e) => this.scanBarcode(e)}
                                          // scanBarcode={this.serialRecordCheck.bind(this , "barcode")}
                                          stateUpdate={(text) => this.setState({ bar_code: text })}
                                          scanPackSetting={this.state.scan_pack_settings}
                                          generalSetting={this.state.general_settings}
                                          activities={props && props.Order && props.Order.activities}
                                          localLogs={this.state.localLogs}
                                          restartButton={() => this.restartButton()}
                                          addNote={() => this.addNote()}
                                          saveChanges={() => this.saveChanges()}
                                          navButton={() => this.navButton()}
                                          leaveComponent={(order, type) => this.leaveComponent(order, type)}
                                          unscannedItemPerPage={this.state.unscannedItemPerPage}
                                          InputField={this.InputField}
                                          scannedList={this.state.scannedList}
                                          unscannedList={this.state.unscannedList}
                                          logList={this.state.logList}
                                          showUnscannedList={() => this.showUnscannedList()}
                                          showScannedList={() => this.showScannedList()}
                                          showLogList={() => this.showLogList()}
                                          localLogs={this.state.localLogs}
                                        />
                                      }

                                      {
                                        this.state.loadOrderSpinner
                                          ?
                                          <View style={{ marginTop: 100 }}>
                                            <ActivityIndicator size="large" color="#000" />
                                            <View>
                                              <Text style={{ textAlign: "center" }}>Fetch more item to scan...</Text>
                                            </View>
                                          </View>
                                          :
                                          <>
                                            {
                                              this.state.unscannedItemShow === false && this.state.nextItemShow === true && this.state.scannedItemShow === false &&
                                              <NextItems {...this.props}
                                                order={this.state.order}
                                                currentFocus={() => this.currentFocus()}
                                                barcodeRef={this.barcode}
                                                access_token={this.state.token}
                                                barcodeState={this.state.bar_code}
                                                removeFocus={(e) => this.removeFocus(e)}
                                                redirectToItemDetail={(e) => this.redirectToItemDetail(e)}
                                                clickScan={(e) => this.clickScan(e)}
                                                // clickScan={this.serialRecordCheck.bind(this , "clickscan")}
                                                scanAllItem={(e) => this.scanAllItem(e)}
                                                // scanAllItem={this.serialRecordCheck.bind(this , "scan_all_item")}
                                                scanBarcode={(e) => this.scanBarcode(e)}
                                                // scanBarcode={this.serialRecordCheck.bind(this , "barcode")}
                                                stateUpdate={(text) => this.setState({ bar_code: text })}
                                                scanPackSetting={this.state.scan_pack_settings}
                                                generalSetting={this.state.general_settings}
                                                activities={props && props.Order && props.Order.activities}
                                                localLogs={this.state.localLogs}
                                                restartButton={() => this.restartButton()}
                                                addNote={() => this.addNote()}
                                                saveChanges={() => this.saveChanges()}
                                                navButtonLeft={() => this.navButtonLeft()}
                                                navButtonRight={() => { this.setState({ unscannedItemShow: false, nextItemShow: false, scannedItemShow: true }) }}
                                                leaveComponent={(order, type) => this.leaveComponent(order, type)}
                                                loadOrderSpinner={this.state.loadOrderSpinner}
                                                unscannedItemPerPage={this.state.unscannedItemPerPage}
                                                scannedItemPerPage={this.state.scannedItemPerPage}
                                                InputField={this.InputField}
                                                scannedList={this.state.scannedList}
                                                unscannedList={this.state.unscannedList}
                                                logList={this.state.logList}
                                                showScannedList={() => this.showScannedList()}
                                                showUnscannedList={() => this.showUnscannedList()}
                                                showLogList={() => this.showLogList()}
                                                addBarcode={(e) => this.addBarcode(e)}
                                                notesToPackerFlag={this.state.notes_toPackerFlag}
                                                closeNotes={() => this.closeNotes()}
                                                settings={settings}
                                                customerCommentsFlag={this.state.customer_commentsFlag}
                                                internalNotesFlag={this.state.notes_internalFlag}
                                              />
                                            }
                                          </>
                                      }
                                      {
                                        this.state.nextItemShow === false && this.state.scannedItemShow === true &&
                                        <ScannedItems {...this.props}
                                          order={this.state.order}
                                          scanPackSetting={this.state.scan_pack_settings}
                                          generalSetting={this.state.general_settings}
                                          navButton={() => { this.setState({ unscannedItemShow: false, nextItemShow: true, scannedItemShow: false }) }}
                                          scannedItemPerPage={this.state.scannedItemPerPage}
                                        />
                                      }
                                    </View>
                                }
                              </View>
                              :
                              <Swiper index={1}
                                onIndexChanged={(e) => this.enableToggle(e)}
                                keyboardShouldPersistTaps={'handled'}
                                loop={false}
                                horizontal={true}
                                dotStyle={{ display: "none" }}
                                activeDotStyle={{ display: "none" }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                  <UnscannedItems {...this.props}
                                    order={this.state.order}
                                    currentFocus={() => this.currentFocus()}
                                    barcodeRef={this.barcode}
                                    barcodeState={this.state.bar_code}
                                    clickScan={(e) => this.clickScan(e)}
                                    // clickScan={this.serialRecordCheck.bind(this , "clickscan")}
                                    scanAllItem={(e) => this.scanAllItem(e)}
                                    // scanAllItem={this.serialRecordCheck.bind(this , "scan_all_item")}
                                    scanBarcode={(e) => this.scanBarcode(e)}
                                    // scanBarcode={this.serialRecordCheck.bind(this , "barcode")}
                                    stateUpdate={(text) => this.setState({ bar_code: text })}
                                    leaveComponent={(order, type) => this.leaveComponent(order, type)}
                                    scanPackSetting={this.state.scan_pack_settings}
                                    generalSetting={this.state.general_settings}
                                    redirectToItemDetail={(e) => this.redirectToItemDetail(e)}
                                    restartButton={() => this.restartButton()}
                                    addNote={() => this.addNote()}
                                    saveChanges={() => this.saveChanges()}
                                    unscannedItemPerPage={this.state.unscannedItemPerPage}
                                    InputField={this.InputField}
                                    scannedList={this.state.scannedList}
                                    unscannedList={this.state.unscannedList}
                                    logList={this.state.logList}
                                    showUnscannedList={() => this.showUnscannedList()}
                                    showScannedList={() => this.showScannedList()}
                                    showLogList={() => this.showLogList()}
                                    localLogs={this.state.localLogs}
                                  />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                  <NextItems {...this.props}
                                    order={this.state.order}
                                    currentFocus={() => this.currentFocus()}
                                    barcodeRef={this.barcode}
                                    access_token={this.state.token}
                                    barcodeState={this.state.bar_code}
                                    clickScan={(e) => this.clickScan(e)}
                                    removeFocus={(e) => this.removeFocus(e)}
                                    // clickScan={this.serialRecordCheck.bind(this , "clickscan")}
                                    scanAllItem={(e) => this.scanAllItem(e)}
                                    // scanAllItem={this.serialRecordCheck.bind(this , "scan_all_item")}
                                    scanBarcode={(e) => this.scanBarcode(e)}
                                    // scanBarcode={this.serialRecordCheck.bind(this , "barcode")}
                                    stateUpdate={(text) => this.setState({ bar_code: text })}
                                    scanPackSetting={this.state.scan_pack_settings}
                                    generalSetting={this.state.general_settings}
                                    activities={props && props.Order && props.Order.activities}
                                    localLogs={this.state.localLogs}
                                    restartButton={() => this.restartButton()}
                                    addNote={() => this.addNote()}
                                    saveChanges={() => this.saveChanges()}
                                    leaveComponent={(order, type) => this.leaveComponent(order, type)}
                                    redirectToItemDetail={(e) => this.redirectToItemDetail(e)}
                                    loadOrderSpinner={this.state.loadOrderSpinner}
                                    unscannedItemPerPage={this.state.unscannedItemPerPage}
                                    scannedItemPerPage={this.state.scannedItemPerPage}
                                    InputField={this.InputField}
                                    scannedList={this.state.scannedList}
                                    unscannedList={this.state.unscannedList}
                                    logList={this.state.logList}
                                    showScannedList={() => this.showScannedList()}
                                    showUnscannedList={() => this.showUnscannedList()}
                                    showLogList={() => this.showLogList()}
                                    addBarcode={(e) => this.addBarcode(e)}
                                  />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                  <ScannedItems {...this.props}
                                    order={this.state.order}
                                    scanPackSetting={this.state.scan_pack_settings}
                                    generalSetting={this.state.general_settings}
                                    redirectToItemDetail={(e) => this.redirectToItemDetail(e)}
                                    scannedItemPerPage={this.state.scannedItemPerPage}
                                  />
                                </View>
                              </Swiper>
                          }
                        </View>
                      </Hotkeys>
                    }
                  </React.Fragment>
              }
            </View>
          }
        </React.Fragment>
      }
    </View>
  );
}
}

const mapStateToProps = (state) => {
  return {
    Order: state.order.order,
    ordersList: state.order.list,
    bothSettings: state.user.bothSettings,
    searchOrder: state.scanpack,
    saveData: state.updateAsync.retriveData,
    updateLog: state.saveLog,
    callOrder: state.scanpack.searchOrder,
    updateProduct: state.product.updateProductList,
    updateAlias: state.product.updateProductAlias
  }
};

const mapDispatchToProps = {
  GetOrderDetail,
  GetOrderList,
  GetBothSettings,
  SearchScanpackOrder,
  GetItem,
  SetItem,
  SubmitLog,
  SearchOrder,
  updateProductList,
  updateProductAlias
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanPackItem)
