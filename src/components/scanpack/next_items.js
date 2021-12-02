import React, { Component } from 'react';
import { View, Dimensions, Text, TextInput, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import moment from 'moment';
import HTML from 'react-native-render-html';
import restart from "../../../assets/restart.png";
import upArrow from "../../../assets/up_arrow.png";
import downArrow from "../../../assets/down_arrow.png";
import note from "../../../assets/note.png";
import deleteImage from "../../../assets/delete.png";
import toggle from "../../../assets/dotToggle.png";
import placeholder from "../../../assets/placeholder.png";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { fontFamily } from '../../helpers/fontFamily';


export default class NextItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showKeyboard: true,
      scanPackView: true,
      logView: false,
      enableLog: false,
      nextItemPageShow: true,
      activityLogPageShow: false,
      actionBarShow: false,
      localValue: [],
      ascii: [
        97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122,
        65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        27
      ],
      scannedList: true,
      unscannedList: false,
      logList: false,
      logPerPage: 1,
      scanPlaceHolderValue: "Ready For Product Scan",
      windowWidth: Dimensions.get('window').width
    }
  }

  enableToggle(e) {
    if (e === 0) {
      this.props.route.params.item(true)
      this.setState({ enableLog: false })
      // this.props.barcode.current.focus()
    } else {
      this.props.route.params.item(false)
      this.setState({ enableLog: true })
    }
  }

  orderDetail = (order) => {
    if (order) {
      this.props.leaveComponent(this.props.order, "submitLog")
      this.props.navigation.navigate("OrderDetail", { data: order })
    }
  }

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.updateDimensions)
  }
  AttributeRow = (label, text, color) => {
    return (<View
      style={{
        flexDirection: "row",
        padding: 8,
        alignItems: "center",
        backgroundColor: color,
      }}
    >
      <Text style={{ fontSize: 18, fontFamily: fontFamily.font700, color: "#393838", paddingTop: 2 }}>{label}</Text>
      <Text style={{ fontSize: 28, fontFamily: fontFamily.font700, color: "#393838", width: "65%", textAlign: "left" }}>{text}</Text>
    </View>)
  }
  getAttributeRows = () => {
    let rowsObj = {}
    let Order = this.props.order.order
    let spSetting = this.props.scanPackSetting
    if (Order.unscanned_items.length === 0) return
    if ((Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0) === true) return

    rowsObj.isShowL1 = Order.unscanned_items[0].location !== null &&
      Order.unscanned_items[0].location !== "" &&
      spSetting.display_location ? true : false
    rowsObj.isShowL2 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].location2 !== null &&
      Order.unscanned_items[0].location2 !== "" &&
      spSetting.display_location2 ? true : false
    rowsObj.isShowL3 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].location3 !== null &&
      Order.unscanned_items[0].location3 !== "" &&
      spSetting.display_location3 ? true : false
    rowsObj.isShowC1 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].custom_product_1 !== null &&
      Order.unscanned_items[0].custom_product_1 !== "" &&
      Order.unscanned_items[0].custom_product_display_1 ? true : false
    rowsObj.isShowC2 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].custom_product_2 !== null &&
      Order.unscanned_items[0].custom_product_2 !== "" &&
      Order.unscanned_items[0].custom_product_display_2 ? true : false
    rowsObj.isShowC3 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].custom_product_3 !== null &&
      Order.unscanned_items[0].custom_product_3 !== "" &&
      Order.unscanned_items[0].custom_product_display_3 ? true : false
    const showKeys = Object.keys(rowsObj).map(key => rowsObj[key] ? key : null).filter(v => v)
    return showKeys.map((key, index) => {
      switch (key) {
        case 'isShowL1':
          return this.AttributeRow('L1: ', Order.unscanned_items[0].location, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowL2':
          return this.AttributeRow('L2: ', Order.unscanned_items[0].location2, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowL3':
          return this.AttributeRow('L3: ', Order.unscanned_items[0].location3, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowC1':
          return this.AttributeRow('C1: ', Order.unscanned_items[0].custom_product_1, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowC2':
          return this.AttributeRow('C2: ', Order.unscanned_items[0].custom_product_2, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowC3':
          return this.AttributeRow('C3: ', Order.unscanned_items[0].custom_product_3, index % 2 === 0 ? '#b6cadd' : '#768da5')
        default:
          break;
      }

    })
  }

  getAttributeRowsChild = () => {
    let rowsObj = {}
    let Order = this.props.order.order
    let spSetting = this.props.scanPackSetting
    if (Order.unscanned_items.length === 0) return
    if ((Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0) === false) return
    rowsObj.isShowL1 = Order.unscanned_items[0].child_items[0].location !== undefined &&
      Order.unscanned_items[0].child_items[0].location !== null &&
      Order.unscanned_items[0].child_items[0].location !== "" &&
      spSetting.display_location ? true : false
    rowsObj.isShowL2 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].child_items &&
      Order.unscanned_items[0].child_items[0] &&
      Order.unscanned_items[0].child_items[0].location2 !== null &&
      Order.unscanned_items[0].child_items[0].location2 !== "" &&
      spSetting.display_location2 ? true : false
    rowsObj.isShowL3 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].child_items &&
      Order.unscanned_items[0].child_items[0] &&
      Order.unscanned_items[0].child_items[0].location3 !== null &&
      Order.unscanned_items[0].child_items[0].location3 !== "" &&
      spSetting.display_location3 ? true : false
    rowsObj.isShowC1 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].child_items &&
      Order.unscanned_items[0].child_items[0] &&
      Order.unscanned_items[0].child_items[0].custom_product_1 !== null &&
      Order.unscanned_items[0].child_items[0].custom_product_1 !== "" &&
      Order.unscanned_items[0].child_items[0].custom_product_display_1 ? true : false
    rowsObj.isShowC2 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].child_items &&
      Order.unscanned_items[0].child_items[0] &&
      Order.unscanned_items[0].child_items[0].custom_product_2 !== null &&
      Order.unscanned_items[0].child_items[0].custom_product_2 !== "" &&
      Order.unscanned_items[0].child_items[0].custom_product_display_2 ? true : false
    rowsObj.isShowC3 = Order.unscanned_items &&
      Order.unscanned_items[0] &&
      Order.unscanned_items[0].child_items &&
      Order.unscanned_items[0].child_items[0] &&
      Order.unscanned_items[0].child_items[0].custom_product_3 !== null &&
      Order.unscanned_items[0].child_items[0].custom_product_3 !== "" &&
      Order.unscanned_items[0].child_items[0].custom_product_display_3 ? true : false
    const showKeys = Object.keys(rowsObj).map(key => rowsObj[key] ? key : null).filter(v => v)
    return showKeys.map((key, index) => {
      switch (key) {
        case 'isShowL1':
          return this.AttributeRow('L1: ', Order.unscanned_items[0].child_items[0].location, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowL2':
          return this.AttributeRow('L2: ', Order.unscanned_items[0].child_items[0].location2, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowL3':
          return this.AttributeRow('L3: ', Order.unscanned_items[0].child_items[0].location3, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowC1':
          return this.AttributeRow('C1: ', Order.unscanned_items[0].child_items[0].custom_product_1, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowC2':
          return this.AttributeRow('C2: ', Order.unscanned_items[0].child_items[0].custom_product_2, index % 2 === 0 ? '#b6cadd' : '#768da5')
        case 'isShowC3':
          return this.AttributeRow('C3: ', Order.unscanned_items[0].child_items[0].custom_product_3, index % 2 === 0 ? '#b6cadd' : '#768da5')
        default:
          break;
      }

    })
  }
  calculateUnScanned = () => {
    let Order = this.props.order.order
    if (Order.unscanned_items && Order.unscanned_items.length > 0) {
      let qty_remaning = 0
      for (let i = 0; i <= Order.unscanned_items.length - 1; ++i) {
        qty_remaning += Order.unscanned_items[i].qty_remaining
        if (Order.unscanned_items[i].child_items.length > 0) {
          for (let j = 0; j <= Order.unscanned_items[i].child_items.length - 1; ++j) {
            qty_remaning += Order.unscanned_items[i].child_items[j].qty_remaining
          }
        }
      }
      return qty_remaning
    }
    return 0
  }

  render() {
    let slider_image = []
    let Order = this.props.order.order
    let activities = this.props.activities
    let localLogs = this.props.localLogs
    let spSetting = this.props.scanPackSetting
    const config = { velocityThreshold: 0.1, directionalOffsetThreshold: 100, gestureIsClickThreshold: 5 };
    let logPerPage = this.state.logPerPage * 14
    const rows = this.getAttributeRows()
    const rowsChild = this.getAttributeRowsChild()
    let unscannedCount = this.calculateUnScanned()

    return (
      <View key="next" style={{ flex: 1, width: "100%", height: "100%", shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.9, shadowRadius: 20, elevation: 3 }}>
        {
          Platform.OS === "web"
            ?
            <View style={[globalStyles.flex1]}>
              {
                this.state.windowWidth >= 900
                  ?
                  <View style={[globalStyles.flex1]}>
                    {
                      this.props.order && Order.unscanned_items[0] ?
                        <View style={styles.nextItemsMain}>
                          {
                            this.props.order && Order.unscanned_items[0] &&
                            <View style={styles.RFPScreen}>
                              <View style={{ width: "100%", flex: 1, backgroundColor: "#000" }}>
                                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                  colors={['#000000', '#00000006', '#00000006', '#000000']}
                                  style={[styles.actionButtonsView]}
                                >
                                  <View>
                                    <TouchableOpacity onLongPress={() => this.orderDetail(Order)}
                                      delayLongPress={1000}
                                      style={{ marginRight: 45, marginLeft: 45 }}
                                    >
                                      <Text numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={[styles.nowScanningTextView, { textAlign: "center", fontSize: 22, paddingVertical: 10, fontFamily: fontFamily.font700, color: "#8e8b8b" }]}>
                                        Order {Order.increment_id}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                  <LinearGradient
                                    style={[styles.actionButtonInnerView, {
                                      backgroundColor: "#707070",
                                      borderRadius: 12
                                    }]}
                                    start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                    colors={['#142130', '#304454']}
                                  >
                                    <TouchableOpacity style={styles.restartButtonDesign}
                                      onPress={this.props.restartButton}
                                    >
                                      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
                                        <Image style={styles.actionImages}
                                          source={restart ? restart : ""} />
                                        {
                                          this.state.windowWidth > 375 &&
                                          <React.Fragment>
                                            <View style={{ flexDirection: "column", alignItems: "flex-start", marginLeft: 3 }}>
                                              <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font400, fontSize: 20, lineHeight: '50%', marginTop: 10 }]}>Restart</Text>
                                              <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font400, fontSize: 20 }]}>Order</Text>
                                            </View>
                                          </React.Fragment>
                                        }
                                      </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.noteSaveButtonDesign}
                                      onPress={this.props.saveChanges}
                                    >
                                      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                                        <FontAwesome5.Button size={26} name="trash-alt" style={{ marginRight: -15 }} backgroundColor="transparent">
                                        </FontAwesome5.Button>
                                        {
                                          this.state.windowWidth > 375 &&
                                          <View style={{ flexDirection: "column", alignItems: "flex-start", marginLeft: 3 }}>
                                            <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font400, fontSize: 20, lineHeight: '50%', marginTop: 10 }]}>Remove</Text>
                                            <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font400, fontSize: 20 }]}>Item</Text>
                                          </View>
                                        }
                                      </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.noteSaveButtonDesign}
                                      onPress={this.props.addNote}
                                    >
                                      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                        <Image style={styles.actionImages}
                                          source={note ? note : ""} />
                                        {
                                          this.state.windowWidth > 375 &&
                                          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                                            <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font400, fontSize: 20, lineHeight: '50%', marginTop: 10 }]}>Add</Text>
                                            <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font400, fontSize: 20 }]}>Note</Text>
                                          </View>
                                        }
                                      </View>
                                    </TouchableOpacity>
                                  </LinearGradient>
                                </LinearGradient>
                                <LinearGradient
                                  start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                  colors={['#142130', '#304454']}
                                  style={{
                                    marginTop: 2,
                                    backgroundColor: "#707070",
                                    padding: 10,
                                    borderRadius: 12,
                                    position: "relative"
                                  }}
                                >
                                  <View style={{ flexDirection: "row" }}>
                                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                      <LinearGradient
                                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                        colors={['#6384ff', '#1329ff', '#35096c']}
                                        style={{
                                          backgroundColor: "#ebebeb",
                                          height: 10,
                                          width: 10,
                                          borderRadius: 5,
                                          marginRight: 10,
                                          shadowColor: "#fff",
                                          shadowOffset: {
                                            width: 0,
                                            height: 0
                                          },
                                          shadowOpacity: 1,
                                          shadowRadius: 10,
                                          elevation: 24
                                        }} />
                                    </View>
                                    <View
                                      style={{
                                        flex: 15,
                                        paddingLeft: 20,
                                        padding: 5,
                                        fontSize: 15,
                                        color: "black",
                                        width: "100%",
                                        textAlign: "left",
                                        borderWidth: 1,
                                        borderColor: "#a6a9ab",
                                        borderRadius: 7,
                                        justifyContent: "center",
                                        backgroundColor: "#ebebeb",
                                      }}
                                    >
                                      <TextInput value={this.props.barcodeState}
                                        autoFocus={false}
                                        ref={this.props.InputField}
                                        style={{ fontFamily: fontFamily.font600, outline: "none", fontSize: 22 }}
                                        onSubmitEditing={this.props.scanBarcode}
                                        onChangeText={this.props.stateUpdate}
                                        placeholder={this.state.scanPlaceHolderValue}
                                        placeholderTextColor={"#acacad"}
                                        onBlur={() => {
                                          const blurValue = Platform.OS === "web" ? "Click Here Before Scanning" : "Tap Here Before Scanning"
                                          this.setState({ scanPlaceHolderValue: blurValue })
                                        }
                                        }
                                        onFocus={() => this.setState({ scanPlaceHolderValue: 'Ready For Product Scan' })}

                                      />
                                    </View>
                                    {
                                      Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0
                                        ?
                                        <View style={{ flex: 4 }}>
                                          <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0])}
                                            onLongPress={this.props.scanAllItem}
                                            delayLongPress={1000}
                                            style={{ alignSelf: "center", marginLeft: 5, backgroundColor: "#455766", justifyContent: "center", alignItems: "center", paddingHorizontal: 10, borderRadius: 5 }}>
                                            <Text style={{ fontFamily: fontFamily.font800, fontSize: 30, paddingLeft: 1, paddingRight: 1, color: "#fff", textAlign: "center" }}
                                            >
                                              Pass
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={{ flex: 4 }}>
                                          <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0])}
                                            onLongPress={this.props.scanAllItem}
                                            delayLongPress={1000}
                                            style={{ alignSelf: "center", marginLeft: 5, backgroundColor: "#455766", justifyContent: "center", alignItems: "center", paddingHorizontal: 10, borderRadius: 5 }}>
                                            <Text style={{ fontFamily: fontFamily.font800, fontSize: 30, paddingLeft: 1, paddingRight: 1, color: "#fff", textAlign: "center" }}
                                            >
                                              Pass
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                    }
                                  </View>
                                </LinearGradient>
                                {
                                  Order.tags !== null && Order.tags && Order.tags.trim() !== "" && this.props.settings.show_tags ||
                                    Order.notes_toPacker !== null && Order.notes_toPacker && Order.notes_toPacker.trim() !== "" && this.props.notesToPackerFlag && this.props.settings.show_internal_notes ||
                                    Order.customer_comments !== null && Order.customer_comments && Order.customer_comments.trim() !== "" && this.props.customerCommentsFlag && this.props.settings.show_customer_notes ||
                                    Order.notes_internal !== null && Order.notes_internal && Order.notes_internal.trim() !== "" && this.props.internalNotesFlag && this.props.settings.show_internal_notes
                                    ?
                                    <LinearGradient
                                      locations={[0, 0.13, 1]}
                                      colors={["#000000", "#fdf359", "#d2c609"]}
                                      style={{ width: '100%', backgroundColor: '#d3dfea', paddingHorizontal: 15, paddingVertical: 10, alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", zIndex: 1, top: 10 }}>
                                      <View>
                                        {
                                          Order.tags !== null && Order.tags && Order.tags.trim() !== "" &&
                                          <View>
                                            <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                              {Order.tags}
                                            </Text>
                                            {(Order.customer_comments !== null && Order.customer_comments.trim() !== "" || Order.notes_toPacker !== null && Order.notes_toPacker.trim() !== "" || Order.notes_internal !== null && Order.notes_internal && Order.notes_internal.trim() !== "") &&
                                              <View style={{ width: '100%', height: 1, backgroundColor: "black" }} />
                                            }
                                          </View>
                                        }
                                        {
                                          Order.notes_internal !== null && Order.notes_internal && Order.notes_internal.trim() !== "" &&
                                          <View>
                                            <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                              {Order.notes_internal}
                                            </Text>
                                            {(Order.customer_comments !== null && Order.customer_comments.trim() !== "" || Order.notes_toPacker !== null && Order.notes_toPacker.trim() !== "") &&
                                              <View style={{ width: '100%', height: 1, backgroundColor: "black" }} />
                                            }
                                          </View>
                                        }
                                        {
                                          Order.customer_comments !== null && Order.customer_comments.trim() !== "" &&
                                          <View>
                                            <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                              {Order.customer_comments}
                                            </Text>
                                            {(Order.notes_toPacker !== null ? Order.notes_toPacker.trim() !== "" : false) &&
                                              <View style={{ width: '100%', height: 1, backgroundColor: "black" }} />
                                            }
                                          </View>
                                        }
                                        {
                                          Order.notes_toPacker !== null && Order.notes_toPacker.trim() !== "" &&
                                          <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                            {Order.notes_toPacker}
                                          </Text>
                                        }
                                      </View>
                                      <TouchableOpacity
                                        onPress={() => this.props.closeNotes()}
                                        style={{ borderWidth: 2, borderColor: "#1a1a1a", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
                                        <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a", lineHeight: '100%' }}>Got it.</Text>
                                      </TouchableOpacity>
                                    </LinearGradient>
                                    :
                                    null
                                }
                                {
                                  Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0
                                    ?
                                    <React.Fragment>
                                      {
                                        Order.unscanned_items[0].child_items[0].instruction !== "" && Order.unscanned_items[0].child_items[0].instruction !== null &&
                                        <View style={{ textAlign: "left", backgroundColor: "#152b43" }}>
                                          {
                                            Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                            <View style={{ zIndex: 10, backgroundColor: "#152b43", width: "100%", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                                              <LinearGradient
                                                locations={[0, 0.31, 1]}
                                                colors={["#000000", "#2b2b2b", "#000000"]}
                                                style={{ width: "100%", backgroundColor: "#fff" }}>
                                                {
                                                  Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                                  <View style={{ padding: 5, color: "white", textShadowColor: "white", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 10 }}>
                                                    {
                                                      Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                                      <HTML html={`<div style="color: white; fontSize: 27px;line-height: 1.2;">${Order.unscanned_items[0].child_items[0].instruction}</div>`} imagesMaxWidth={Dimensions.get('window').width} />
                                                    }
                                                  </View>
                                                }
                                              </LinearGradient>
                                            </View>
                                          }
                                        </View>
                                      }
                                      <View style={{ flexDirection: "row", position: "relative", display: "flex" }}>
                                        <View style={{ width: "100%", minHeight: 390, borderRadius: 12, paddingBottom: 10, backgroundColor: "#b6c2d2" }}>
                                          <LinearGradient
                                            colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                            locations={[0, 0.34, 1]}
                                            style={{
                                              flex: 16, padding: 8, borderTopLeftRadius: 12, borderTopEndRadius: 12
                                            }}
                                          >
                                            <TouchableOpacity onPress={() => this.props.redirectToItemDetail(Order.unscanned_items[0].child_items[0])}
                                            >
                                              <Text numberOfLines={3}
                                                ellipsizeMode='tail'
                                                style={Order.unscanned_items[0].child_items[0].name &&
                                                  Order.unscanned_items[0].child_items[0].name.length <= 32
                                                  ?
                                                  { fontSize: 34, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                  :
                                                  { fontSize: 28, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                }>
                                                {Order.unscanned_items[0].child_items[0].name}
                                              </Text>
                                            </TouchableOpacity>
                                          </LinearGradient>
                                          <View
                                            style={{
                                              padding: 8,
                                              justifyContent: "center",
                                              backgroundColor: "#b6cadd"
                                            }}
                                          >
                                            <Text numberOfLines={1}
                                              ellipsizeMode='tail'
                                              style={{ fontSize: 30, fontFamily: fontFamily.font700, color: "#3f638b", width: '65%', textAlign: "left" }}
                                            >
                                              {Order.unscanned_items[0].child_items[0].sku}
                                            </Text>
                                          </View>
                                          {
                                            Order.unscanned_items[0].child_items[0] &&
                                              Order.unscanned_items[0].child_items[0].barcodes.length > 0 &&
                                              Order.unscanned_items[0].child_items[0].barcodes[0].barcode
                                              ?
                                              <View
                                                style={{
                                                  padding: 8,
                                                  backgroundColor: "#7c95ae",
                                                }}
                                              >
                                                <Text style={{ fontSize: 28, fontFamily: fontFamily.font400, color: "#393838", width: '65%', textAlign: "left" }}
                                                  numberOfLines={1}
                                                  ellipsizeMode='tail'
                                                >
                                                  {Order.unscanned_items[0].child_items[0].barcodes[0].barcode}
                                                </Text>
                                              </View>
                                              :
                                              <View
                                                style={{
                                                  padding: 8,
                                                  backgroundColor: '#7c95ae',
                                                  paddingHorizontal: 100,
                                                }}
                                              >
                                                <TouchableOpacity style={{ backgroundColor: "#fff", borderRadius: 20, borderWidth: 2, padding: 4 }} onPress={() => { this.props.addBarcode(Order.unscanned_items[0].child_items[0]) }}>
                                                  <Text style={{ fontSize: 16, color: "#fff", fontFamily: fontFamily.font400 }}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                  >
                                                    ADD A BARCODE
                                                  </Text>
                                                </TouchableOpacity>
                                              </View>
                                          }
                                          {
                                            rowsChild.map(row => row)
                                          }
                                        </View>

                                        <View style={{ position: 'absolute', top: 0, right: 0, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%' }}>
                                          <LinearGradient
                                            locations={[0, 0.04, 0.08]}
                                            start={{ x: .9, y: 1 }}
                                            colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                            style={{
                                              height: 240, width: 240, backgroundColor: "#000000", marginTop: 10, position: "relative", zIndex: 9,
                                              justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
                                              shadowColor: "#000000",
                                              shadowOpacity: 0.58,
                                              shadowRadius: 29,
                                              shadowOffset: {
                                                width: 5,
                                                height: 29
                                              }
                                            }}>
                                            {
                                              Order.unscanned_items[0].child_items[0].images.map((image, index) => {
                                                slider_image.push(image.image)
                                              })
                                            }
                                            <Image source={{ uri: slider_image[0] ? slider_image[0] : placeholder }}
                                              style={{ height: '90%', width: '90%', resizeMode: 'contain', borderRadius: 12, marginRight: 10 }} />
                                          </LinearGradient>
                                          <LinearGradient
                                            locations={[0, 0.04, 0.08]}
                                            start={{ x: .9, y: 1 }}
                                            colors={['#3d4851', '#cfd7dc', '#ffffff']}
                                            style={{
                                              justifyContent: "center", backgroundColor: '#fff', paddingHorizontal: 10, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingVertical: 5, marginBottom: 10,
                                              borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
                                              shadowColor: "#000000",
                                              shadowOpacity: 0.58,
                                              shadowRadius: 29,
                                              shadowOffset: {
                                                width: 5,
                                                height: 29
                                              }
                                            }}>
                                            <Text style={{ textAlign: "center", fontSize: 36, color: "#8e8b8b", fontFamily: fontFamily.font700 }}>
                                              {Order.unscanned_items[0].child_items[0].scanned_qty} / {Order.unscanned_items[0].child_items[0].qty_remaining + Order.unscanned_items[0].child_items[0].scanned_qty}
                                            </Text>
                                            <Text style={{ textAlign: "center", fontSize: 20, color: "#8e8b8b", fontFamily: fontFamily.font800, textTransform: "uppercase" }}>
                                              Scanned
                                            </Text>
                                            <Text style={{ textAlign: "center", fontSize: 18, color: "#8e8b8b", fontFamily: fontFamily.font700 }}>{Order.unscanned_items[0].qty_remaining} more to scan</Text>
                                          </LinearGradient>
                                        </View>
                                      </View>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                      {
                                        Order.unscanned_items[0].instruction !== "" && Order.unscanned_items[0].instruction !== null &&
                                        <View style={{ textAlign: "left", backgroundColor: "#152b43" }}>
                                          {
                                            Order.unscanned_items[0].instruction !== "" &&
                                            <View style={{ zIndex: 10, width: "100%", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                                              <LinearGradient
                                                locations={[0, 0.31, 1]}
                                                colors={["#000000", "#2b2b2b", "#000000"]}
                                                style={{ width: "100%", backgroundColor: "#fff" }}>
                                                {
                                                  Order.unscanned_items[0].instruction !== "" &&
                                                  <View style={{ padding: 5, color: "white", textShadowColor: "white", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 10 }}>
                                                    {
                                                      Order.unscanned_items[0].instruction !== "" &&
                                                      <HTML html={`<div style="color: white; fontSize: 27px;line-height: 1.2;">${Order.unscanned_items[0].instruction}</div>`} imagesMaxWidth={Dimensions.get('window').width} />
                                                    }
                                                  </View>
                                                }
                                              </LinearGradient>
                                            </View>
                                          }
                                        </View>
                                      }
                                      <View style={{ flexDirection: 'row', position: 'relative', display: "flex" }}>

                                        <View style={{
                                          width: '100%', minHeight: 390, borderRadius: 12, paddingBottom: 10,
                                          backgroundColor: "#b6c2d2"
                                        }}>
                                          <LinearGradient
                                            colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                            locations={[0, 0.34, 1]}
                                            style={{ flex: 16, padding: 8, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                                          >
                                            <TouchableOpacity onPress={() => this.props.redirectToItemDetail(Order.unscanned_items[0])}
                                            >
                                              <Text numberOfLines={4}
                                                style={
                                                  Order.unscanned_items[0].name &&
                                                    Order.unscanned_items[0].name.length <= 32
                                                    ?
                                                    { fontSize: 34, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                    :
                                                    { fontSize: 28, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                }
                                                ellipsizeMode='tail'>
                                                {Order.unscanned_items[0].name}
                                              </Text>
                                            </TouchableOpacity>
                                          </LinearGradient>
                                          <View
                                            style={{
                                              padding: 8,
                                              justifyContent: "center",
                                              backgroundColor: "#b6cadd"
                                            }}
                                          >
                                            <Text numberOfLines={1}
                                              ellipsizeMode='tail'
                                              style={{ fontSize: 30, fontFamily: fontFamily.font700, color: "#3f638b", width: '65%', textAlign: "left" }}
                                            >
                                              {Order.unscanned_items[0].sku}
                                            </Text>
                                          </View>
                                          {
                                            Order.unscanned_items[0] &&
                                              Order.unscanned_items[0].barcodes.length > 0
                                              ?
                                              <View
                                                style={{
                                                  padding: 8,
                                                  backgroundColor: "#7c95ae",
                                                }}
                                              >
                                                <Text style={{ fontSize: 28, fontFamily: fontFamily.font400, color: "#393838", width: '65%', textAlign: "left" }}
                                                  numberOfLines={1}
                                                  ellipsizeMode='tail'
                                                >
                                                  {Order.unscanned_items[0].barcodes[0].barcode}
                                                </Text>
                                              </View>
                                              :
                                              <View
                                                style={{
                                                  padding: 8,
                                                  backgroundColor: '#7c95ae',
                                                  paddingHorizontal: 100,
                                                }}
                                              >
                                                <TouchableOpacity style={{ borderColor: '#fff', borderRadius: 10, borderWidth: 2, padding: 4, justifyContent: 'center', alignItems: 'center', width: '65%' }} onPress={() => { this.props.addBarcode(Order.unscanned_items[0]) }}>
                                                  <Text style={{ fontSize: 16, color: "#fff", fontFamily: fontFamily.font400 }}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                  >
                                                    ADD A BARCODE
                                                  </Text>
                                                </TouchableOpacity>
                                              </View>
                                          }
                                          {
                                            rows.map(row => row)
                                          }
                                        </View>
                                        <View style={{ position: 'absolute', top: 0, right: 0, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%' }}>
                                          <LinearGradient
                                            locations={[0, 0.04, 0.08]}
                                            start={{ x: .9, y: 1 }}
                                            colors={['#3d4851', '#cfd7dc', '#ffffff']}
                                            style={{
                                              height: 240, width: 240, backgroundColor: "#000000", marginTop: 10, position: "relative", zIndex: 9,
                                              justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
                                              shadowColor: "#000000",
                                              shadowOpacity: 0.58,
                                              shadowRadius: 29,
                                              shadowOffset: {
                                                width: 5,
                                                height: 29
                                              }
                                            }}
                                          >
                                            {
                                              Order.unscanned_items[0].images.map((image, index) => {
                                                slider_image.push(image.image)
                                              })
                                            }
                                            <Image source={{ uri: slider_image[0] ? slider_image[0] : placeholder }}
                                              style={{ height: '90%', width: '90%', resizeMode: 'contain', borderRadius: 12, marginRight: 10 }} />
                                          </LinearGradient>
                                          <LinearGradient
                                            locations={[0, 0.04, 0.08]}
                                            start={{ x: .9, y: 1 }}
                                            colors={['#3d4851', '#cfd7dc', '#ffffff']}
                                            style={{
                                              justifyContent: "center", backgroundColor: '#fff', paddingHorizontal: 10, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingVertical: 5, marginBottom: 10,
                                              borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
                                              shadowColor: "#000000",
                                              shadowOpacity: 0.58,
                                              shadowRadius: 29,
                                              shadowOffset: {
                                                width: 5,
                                                height: 29
                                              }
                                            }}>
                                            <Text style={{ textAlign: "center", fontSize: 36, color: "#8e8b8b", fontFamily: fontFamily.font700 }}>
                                              {Order.unscanned_items[0].scanned_qty} / {Order.unscanned_items[0].qty_remaining + Order.unscanned_items[0].scanned_qty}
                                            </Text>
                                            <Text style={{ textAlign: "center", fontSize: 20, color: "#8e8b8b", fontFamily: fontFamily.font800, textTransform: "uppercase" }}>
                                              Scanned
                                            </Text>
                                            <Text style={{ textAlign: "center", fontSize: 18, color: "#8e8b8b", fontFamily: fontFamily.font700 }}>{Order.unscanned_items[0].qty_remaining} more to scan</Text>
                                          </LinearGradient>
                                        </View>
                                      </View>
                                    </React.Fragment>
                                }
                                <React.Fragment>
                                  {
                                    localLogs && localLogs.length > 0
                                      ?
                                      localLogs && localLogs.slice(0, 14).map((log, index) => {
                                        return (
                                          <View key={index} style={[globalStyles.flexDirectionRow, { paddingLeft: 10, paddingBottom: 0, paddingTop: 5, paddingRight: 10, textAlign: "left", borderBottomWidth: 1, borderBottomColor: "#000" }]}>
                                            <View style={styles.actionBox}>
                                              <Text style={[styles.logDate, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                {moment(log.time).format('MMMM Do YYYY, h:mm:ss a')}
                                              </Text>
                                              {
                                                log.event === "regular" &&
                                                <View>
                                                  {
                                                    log.Log_count !== ""
                                                      ?
                                                      <View>
                                                        <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                          {`Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                        </Text>
                                                        <Text style={[styles.logDate, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                          {`Multibarcode count of ${log.Log_count} scanned for product ${log.SKU} `}
                                                        </Text>
                                                      </View>
                                                      :
                                                      log.actionBarcode
                                                        ?
                                                        <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                          {`Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                        </Text>
                                                        :
                                                        <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                          {`INVALID SCAN - Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                        </Text>
                                                  }
                                                </View>
                                              }
                                              {
                                                log.event === "click_scan" &&
                                                <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                  {` Item with SKU: ${log.SKU} has been click scanned - by: ${log.name}`}
                                                </Text>
                                              }
                                              {
                                                log.event === "bulk_scan" &&
                                                <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                  {`Item ${log.SKU} scanned through Bulk Scan - by: ${log.name}`}
                                                </Text>
                                              }
                                              {
                                                log.event === "type_scan" &&
                                                <View>
                                                  <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                    {`Item with SKU: ${log.SKU} has been click scanned for a Type-In count - by: ${log.name}`}
                                                  </Text>
                                                  <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                    {`Type-In count of ${log.count} entered for product ${log.SKU}`}
                                                  </Text>
                                                </View>
                                              }
                                              {
                                                log.event === "serial_scan" &&
                                                <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                                  {`Product: ${log.SKU} Serial scanned: "check" - by: ${log.name}`}
                                                </Text>
                                              }
                                            </View>
                                          </View>
                                        )
                                      })
                                      :
                                      <View style={globalStyles.p_10}>
                                        <Text style={[styles.scannedItemNameText, { color: "#8a8989", fontFamily: fontFamily.font400 }]}>
                                          No Record
                                        </Text>
                                      </View>
                                  }
                                </React.Fragment>
                              </View>
                            </View>
                          }
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: 14, fontFamily: fontFamily.font700 }}>No order is present to scan</Text>
                        </View>
                    }
                  </View>
                  :
                  <React.Fragment>
                    {
                      Order && Order.unscanned_items[0]
                        ?
                        <View style={[globalStyles.flex1, globalStyles.pb_50]}>
                          <ScrollView keyboardShouldPersistTaps='handled' style={{ height: "100%" }}>
                            <View style={styles.nextItemsMain}>
                              {
                                this.props.order && Order.unscanned_items[0] &&
                                <View style={styles.RFPScreen}>
                                  <View style={{ width: "100%", flex: 1, backgroundColor: "#000" }}>
                                    <View style={styles.actionButtonsView}>
                                      <LinearGradient
                                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                        colors={['#000000', '#00000006', '#00000006', '#000000']}
                                        style={{ position: "relative", backgroundColor: "#292929" }}>
                                        <TouchableOpacity onLongPress={() => this.orderDetail(Order)}
                                          delayLongPress={1000}
                                          style={{ marginRight: 45, marginLeft: 45 }}>
                                          <Text numberOfLines={1}
                                            ellipsizeMode='tail'
                                            style={[styles.nowScanningTextView, { textAlign: "center", margin: 8, fontFamily: fontFamily.font700, color: "#8e8b8b" }]}>
                                            Order {Order.increment_id}
                                          </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                          let actionBarShow = !this.state.actionBarShow
                                          this.setState({ actionBarShow })
                                        }
                                        }
                                          style={{ position: "absolute", top: 10, right: 10 }}>
                                          {this.state.actionBarShow ? <Image style={{ width: 20, height: 20 }}
                                            source={upArrow ? upArrow : ""}
                                          /> : <Image style={{ width: 20, height: 20 }}
                                            source={downArrow ? downArrow : ""}
                                          />}
                                        </TouchableOpacity>
                                      </LinearGradient>
                                      {
                                        this.state.actionBarShow &&
                                        <LinearGradient style={[styles.actionButtonInnerView, {
                                          backgroundColor: "#707070",
                                          borderRadius: 5
                                        }]}
                                          start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                          colors={['#142130', '#304454']}
                                        >
                                          <TouchableOpacity style={styles.restartButtonDesign}
                                            onPress={this.props.restartButton}
                                          >
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: 5 }}>
                                              <Image style={[styles.actionImages, { width: 25, height: 25 }]}
                                                source={restart ? restart : ""} />
                                              {
                                                this.state.windowWidth > 375 &&
                                                <View style={{ flexDirection: "column", alignItems: "center" }}>
                                                  <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Restart</Text>
                                                  <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Order</Text>
                                                </View>
                                              }
                                            </View>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.noteSaveButtonDesign}
                                            onPress={this.props.saveChanges}
                                          >
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                                              <Image style={[styles.actionImages, { width: 25, height: 25 }]}
                                                source={deleteImage ? deleteImage : ""} />
                                              {
                                                this.state.windowWidth > 375 &&
                                                <View style={{ flexDirection: "column", alignItems: "center" }}>
                                                  <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Remove</Text>
                                                  <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Item</Text>
                                                </View>
                                              }
                                            </View>
                                          </TouchableOpacity>
                                          <TouchableOpacity style={styles.noteSaveButtonDesign}
                                            onPress={this.props.addNote}
                                          >
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: 5 }}>
                                              <Image style={[styles.actionImages, { width: 25, height: 25 }]}
                                                source={note ? note : ""} />
                                              {
                                                this.state.windowWidth > 375 &&
                                                <React.Fragment>
                                                  <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 2 }}>
                                                    <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Add</Text>
                                                    <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Note</Text>
                                                  </View>
                                                </React.Fragment>
                                              }
                                            </View>
                                          </TouchableOpacity>
                                        </LinearGradient>
                                      }
                                    </View>
                                    <LinearGradient style={{
                                      padding: 10,
                                      backgroundColor: "#707070",
                                      borderRadius: 5,
                                      marginTop: 1
                                    }}
                                      start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                      colors={['#142130', '#304454']}
                                    >
                                      <View style={{ flexDirection: "row" }}>
                                        <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                          <LinearGradient
                                            start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                            colors={['#6384ff', '#1329ff', '#35096c']}
                                            style={{
                                              backgroundColor: "#ebebeb",
                                              height: 10,
                                              width: 10,
                                              borderRadius: 5,
                                              marginRight: 10,
                                              shadowColor: "#fff",
                                              shadowOffset: {
                                                width: 0,
                                                height: 0
                                              },
                                              shadowOpacity: 1,
                                              shadowRadius: 10,
                                              elevation: 24
                                            }} />
                                        </View>
                                        <TextInput value={this.props.barcodeState}
                                          autoFocus={false}
                                          ref={this.props.InputField}
                                          onSubmitEditing={this.props.scanBarcode}
                                          onChangeText={this.props.stateUpdate}
                                          style={{ outline: "none", flex: 15, paddingLeft: 20, padding: 5, backgroundColor: "#ebebeb", fontSize: 15, fontFamily: fontFamily.font600, width: "100%", textAlign: "left", borderRadius: 5 }}
                                          placeholder={this.state.scanPlaceHolderValue}
                                          placeholderTextColor={"#acacad"}
                                          onBlur={() => {
                                            const blurValue = Platform.OS === "web" ? "Click Here Before Scanning" : "Tap Here Before Scanning"
                                            this.setState({ scanPlaceHolderValue: blurValue })
                                          }}
                                          onFocus={() => this.setState({ scanPlaceHolderValue: 'Ready For Product Scan' })}
                                        />
                                        {
                                          Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0
                                            ?
                                            <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0])}
                                              onLongPress={this.props.scanAllItem}
                                              delayLongPress={1000}
                                              style={{ flex: 4, marginLeft: 10, backgroundColor: "#455766", justifyContent: "center", alignItems: "center", paddingHorizontal: 7, borderRadius: 5 }}>
                                              <Text style={{ fontFamily: fontFamily.font800, fontSize: 26, color: "#fff", textAlign: "center" }}
                                              >
                                                Pass
                                              </Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0])}
                                              onLongPress={this.props.scanAllItem}
                                              delayLongPress={1000}
                                              style={{ flex: 4, marginLeft: 10, backgroundColor: "#455766", justifyContent: "center", alignItems: "center", paddingHorizontal: 7, borderRadius: 5 }}>
                                              <Text style={{ fontFamily: fontFamily.font800, fontSize: 26, color: "#fff", textAlign: "center" }}
                                              >
                                                Pass
                                              </Text>
                                            </TouchableOpacity>
                                        }
                                      </View>
                                    </LinearGradient>
                                    {
                                      Order.tags !== null && Order.tags && Order.tags.trim() !== "" && this.props.settings.show_tags ||
                                        Order.notes_toPacker !== null && Order.notes_toPacker.trim() !== "" && this.props.notesToPackerFlag && this.props.settings.show_internal_notes ||
                                        Order.customer_comments !== null && Order.customer_comments.trim() !== "" && this.props.customerCommentsFlag && this.props.settings.show_customer_notes ||
                                        Order.notes_internal !== null && Order.notes_internal.trim() !== "" && this.props.internalNotesFlag && this.props.settings.show_internal_notes
                                        ?
                                        <LinearGradient
                                          locations={[0, 0.13, 1]}
                                          colors={["#000000", "#fdf359", "#d2c609"]}
                                          style={{ width: '100%', backgroundColor: '#d3dfea', paddingHorizontal: 15, paddingVertical: 10, alignItems: "flex-end", flexDirection: "row", justifyContent: "space-between", top: 10, zIndex: 1 }}>
                                          <View>
                                            {
                                              Order.tags !== null && Order.tags && Order.tags.trim() !== "" &&
                                              <View>
                                                <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                                  {Order.tags}
                                                </Text>
                                                {(Order.customer_comments !== null && Order.customer_comments.trim() !== "" || Order.notes_toPacker !== null && Order.notes_toPacker.trim() !== "" || Order.notes_internal !== null && Order.notes_internal && Order.notes_internal.trim() !== "") &&
                                                  <View style={{ width: '100%', height: 1, backgroundColor: "black" }} />
                                                }
                                              </View>
                                            }
                                            {
                                              Order.notes_internal && Order.notes_internal !== null && Order.notes_internal.trim() !== "" &&
                                              <View>
                                                {
                                                  Order.notes_internal !== null &&
                                                  <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                                    {Order.notes_internal}
                                                  </Text>
                                                }
                                                {((Order.customer_comments !== null && Order.customer_comments.trim() !== "") || (Order.notes_toPacker !== null && Order.notes_toPacker.trim() !== "")) &&
                                                  <View style={{ width: '100%', height: 1, backgroundColor: "black" }} />
                                                }
                                              </View>
                                            }
                                            {
                                              Order.customer_comments !== null && Order.customer_comments.trim() !== "" &&
                                              <View>
                                                <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                                  {Order.customer_comments}
                                                </Text>
                                                {(Order.notes_toPacker !== null ? Order.notes_toPacker.trim() !== "" : false) &&
                                                  <View style={{ width: '100%', height: 1, backgroundColor: "black" }} />
                                                }
                                              </View>
                                            }
                                            {
                                              Order.notes_toPacker !== null && Order.notes_toPacker.trim() !== "" &&
                                              <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a" }}>
                                                {Order.notes_toPacker}
                                              </Text>
                                            }
                                          </View>
                                          <TouchableOpacity
                                            onPress={() => this.props.closeNotes()}
                                            style={{ borderWidth: 2, borderColor: "#1a1a1a", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2 }}>
                                            <Text style={{ fontFamily: fontFamily.font500, fontSize: 22, textAlign: "left", color: "#1a1a1a", lineHeight: '100%' }}>Got it.</Text>
                                          </TouchableOpacity>
                                        </LinearGradient>
                                        :
                                        null
                                    }
                                    {
                                      Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0
                                        ?
                                        <React.Fragment>
                                          {
                                            Order.unscanned_items[0].child_items[0].instruction !== "" && Order.unscanned_items[0].child_items[0].instruction !== null &&
                                            <ScrollView style={{ textAlign: "left", backgroundColor: "#152b43" }}>
                                              {
                                                Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                                <View style={{ zIndex: 10, width: "100%", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                                                  <LinearGradient
                                                    locations={[0, 0.31, 1]}
                                                    colors={["#000000", "#2b2b2b", "#000000"]}
                                                    style={{ width: "100%", backgroundColor: "#fff" }}
                                                  >
                                                    {
                                                      Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                                      <View>
                                                        <View style={{ padding: 5, color: "white", textShadowColor: "white", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 10 }}>
                                                          {
                                                            Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                                            <HTML html={`<div style="color: white;">${Order.unscanned_items[0].child_items[0].instruction}</div>`} imagesMaxWidth={Dimensions.get('window').width} />
                                                          }
                                                        </View>
                                                      </View>
                                                    }
                                                  </LinearGradient>
                                                </View>
                                              }
                                            </ScrollView>
                                          }
                                          <View style={{ flexDirection: "row", position: "relative", backgroundColor: "#292929", textAlign: "left", display: "flex" }}>
                                            <View style={{ width: '100%', minHeight: 235 }}>
                                              <LinearGradient
                                                colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                                locations={[0, 0.34, 1]}
                                                style={{ flex: 16, padding: 8, borderTopLeftRadius: 12, borderTopEndRadius: 12 }}>
                                                <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(Order.unscanned_items[0].child_items[0])}
                                                  delayLongPress={1000}>
                                                  <Text numberOfLines={3}
                                                    ellipsizeMode='tail'
                                                    style={Order.unscanned_items[0].child_items[0].name &&
                                                      Order.unscanned_items[0].child_items[0].name.length <= 32
                                                      ?
                                                      { fontSize: 24, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                      :
                                                      { fontSize: 20, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                    }>
                                                    {Order.unscanned_items[0].child_items[0].name}
                                                  </Text>
                                                </TouchableOpacity>
                                              </LinearGradient>
                                              <View style={{
                                                padding: 8,
                                                justifyContent: "center",
                                                backgroundColor: "#b6cadd"
                                              }}>
                                                <Text numberOfLines={1}
                                                  ellipsizeMode='tail'
                                                  style={{ fontSize: 22, fontFamily: fontFamily.font700, color: "#3f638b", width: '65%' }}
                                                >
                                                  {Order.unscanned_items[0].child_items[0].sku}
                                                </Text>
                                              </View>
                                              {
                                                Order.unscanned_items[0].child_items[0] &&
                                                  Order.unscanned_items[0].child_items[0].barcodes.length > 0
                                                  ?
                                                  <View style={{
                                                    padding: 8,
                                                    backgroundColor: "#7c95ae"
                                                  }}>
                                                    <Text style={{ fontSize: 22, fontFamily: fontFamily.font400, color: "#393838", width: '65%', textAlign: "left" }}
                                                      numberOfLines={1}
                                                      ellipsizeMode='tail'>
                                                      {
                                                        Order.unscanned_items[0].child_items[0].barcodes[0].barcode
                                                      }
                                                    </Text>
                                                  </View>
                                                  :
                                                  <TouchableOpacity style={{ borderRadius: 20, borderWidth: 2, padding: 4 }}
                                                    onPress={() => { this.props.addBarcode(Order.unscanned_items[0].child_items[0]) }}>
                                                    <Text style={{ fontSize: 14, color: "#fff", fontFamily: fontFamily.font400 }}
                                                      numberOfLines={1}
                                                      ellipsizeMode='tail'
                                                    >
                                                      ADD A BARCODE
                                                    </Text>
                                                  </TouchableOpacity>
                                              }
                                              {
                                                Order.unscanned_items[0].child_items[0].location !== undefined &&
                                                Order.unscanned_items[0].child_items[0].location !== null &&
                                                Order.unscanned_items[0].child_items[0].location !== "" &&
                                                spSetting.display_location &&
                                                <View style={{
                                                  flexDirection: "row",
                                                  padding: 8,
                                                  alignItems: "center",
                                                  backgroundColor: "#b6cadd"
                                                }}>
                                                  <Text style={{ fontSize: 14, fontFamily: fontFamily.font700, color: "#393838", paddingTop: 2, textAlign: "left", paddingTop: 2 }}>L1 : </Text>
                                                  <Text numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{ fontSize: 22, fontFamily: fontFamily.font700, color: "#393838", paddingTop: 2, textAlign: "left" }}
                                                  >
                                                    {Order.unscanned_items[0].child_items[0].location}
                                                  </Text>
                                                </View>
                                              }
                                              {
                                                rowsChild.map(row => row)
                                              }
                                            </View>
                                            <View style={{ position: 'absolute', top: 0, right: 0, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%' }}>
                                              <LinearGradient
                                                locations={[0, 0.04, 0.08]}
                                                start={{ x: .9, y: 1 }}
                                                colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                style={{
                                                  height: 150, width: 150, backgroundColor: "#000000", marginTop: 10, position: "relative", zIndex: 9,
                                                  justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
                                                  shadowColor: "#000000",
                                                  shadowOpacity: 0.58,
                                                  shadowRadius: 29,
                                                  shadowOffset: {
                                                    width: 0,
                                                    height: 0
                                                  }
                                                }}>
                                                <Image source={{ uri: placeholder }}
                                                  style={{ height: '90%', width: '90%', resizeMode: 'contain', borderRadius: 12, marginRight: 10 }} />
                                              </LinearGradient>

                                              <LinearGradient
                                                locations={[0, 0.04, 0.08]}
                                                start={{ x: .9, y: 1 }}
                                                colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                style={{
                                                  justifyContent: "center", backgroundColor: '#fff', paddingHorizontal: 10, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingVertical: 5, marginBottom: 10,
                                                  borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
                                                  shadowColor: "#000000",
                                                  shadowOpacity: 0.58,
                                                  shadowRadius: 29,
                                                  shadowOffset: {
                                                    width: 5,
                                                    height: 29
                                                  }
                                                }}>
                                                <Text style={{ textAlign: "center", fontSize: 25, color: "#8e8b8b", fontFamily: fontFamily.font700 }}>
                                                  {Order.unscanned_items[0].child_items[0].scanned_qty} / {Order.unscanned_items[0].child_items[0].qty_remaining + Order.unscanned_items[0].child_items[0].scanned_qty}
                                                </Text>
                                                <Text style={{ textAlign: "center", fontSize: 15, color: "#8e8b8b", fontFamily: fontFamily.font600, textTransform: "uppercase", lineHeight: '70%' }}>
                                                  Scanned
                                                </Text>
                                              </LinearGradient>
                                            </View>
                                          </View>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                          {
                                            Order.unscanned_items[0].instruction !== "" && Order.unscanned_items[0].instruction !== null &&
                                            <View style={{ textAlign: "left", backgroundColor: "#152b43" }}>
                                              {
                                                Order.unscanned_items[0].instruction !== "" &&
                                                <View style={{ zIndex: 10, width: "100%", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                                                  <LinearGradient
                                                    locations={[0, 0.31, 1]}
                                                    colors={["#000000", "#2b2b2b", "#000000"]}
                                                    style={{ width: "100%", backgroundColor: "#fff" }}>
                                                    {
                                                      Order.unscanned_items[0].instruction !== "" &&
                                                      <View>
                                                        <View style={{ padding: 5, color: "white", textShadowColor: "white", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 10 }}>
                                                          {
                                                            Order.unscanned_items[0].instruction !== "" &&
                                                            <HTML html={`<div style="color: white;">${Order.unscanned_items[0].instruction}</div>`} imagesMaxWidth={Dimensions.get('window').width} />
                                                          }
                                                        </View>
                                                      </View>
                                                    }
                                                  </LinearGradient>
                                                </View>
                                              }
                                            </View>
                                          }
                                          <View style={{ flexDirection: "row", position: "relative", backgroundColor: "#292929", textAlign: "left", display: "flex" }}>
                                            <View style={{ width: '100%', minHeight: 235 }}>
                                              <LinearGradient
                                                colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                                locations={[0, 0.34, 1]}
                                                style={{ flex: 16, padding: 8, borderTopLeftRadius: 12, borderTopEndRadius: 12 }}>
                                                <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(Order.unscanned_items[0])}
                                                  delayLongPress={1000}>
                                                  <Text numberOfLines={3}
                                                    style={Order.unscanned_items[0].name &&
                                                      Order.unscanned_items[0].name.length <= 32
                                                      ?
                                                      { fontSize: 24, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                      :
                                                      { fontSize: 20, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                    }
                                                    ellipsizeMode='tail'>
                                                    {Order.unscanned_items[0].name}
                                                  </Text>
                                                </TouchableOpacity>
                                              </LinearGradient>
                                              <View style={{
                                                padding: 8,
                                                justifyContent: "center",
                                                backgroundColor: "#b6cadd"
                                              }}>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 22, fontFamily: fontFamily.font700, color: "#3f638b", width: '65%' }}>{Order.unscanned_items[0].sku}</Text>
                                              </View>
                                              {
                                                Order.unscanned_items[0] &&
                                                  Order.unscanned_items[0].barcodes.length > 0
                                                  ?
                                                  <View style={{
                                                    padding: 8,
                                                    backgroundColor: "#7c95ae"
                                                  }}>
                                                    <Text style={{ fontSize: 22, fontFamily: fontFamily.font400, color: "#393838", width: '65%', textAlign: "left" }}
                                                      numberOfLines={1}
                                                      ellipsizeMode='tail'
                                                    >
                                                      {
                                                        Order.unscanned_items[0].barcodes[0].barcode
                                                      }
                                                    </Text>
                                                  </View>
                                                  :
                                                  <TouchableOpacity style={{ borderRadius: 20, borderWidth: 2, padding: 4 }}
                                                    onPress={() => { this.props.addBarcode(Order.unscanned_items[0]) }}>
                                                    <Text style={{ fontSize: 14, color: "#fff", fontFamily: fontFamily.font400 }}
                                                      numberOfLines={1}
                                                      ellipsizeMode='tail'
                                                    >
                                                      ADD A BARCODE
                                                    </Text>
                                                  </TouchableOpacity>
                                              }
                                              {
                                                rows.map(row => row)
                                              }
                                            </View>
                                            <View style={{ position: 'absolute', top: 0, right: 0, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', height: '100%' }}>
                                              <LinearGradient
                                                locations={[0, 0.04, 0.08]}
                                                start={{ x: .9, y: 1 }}
                                                colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                style={{
                                                  height: 150, width: 150, backgroundColor: "#000000", marginTop: 10, position: "relative", zIndex: 9,
                                                  justifyContent: 'center', alignItems: "center", borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
                                                  shadowColor: "#000000",
                                                  shadowOpacity: 0.58,
                                                  shadowRadius: 29,
                                                  shadowOffset: {
                                                    width: 0,
                                                    height: 0
                                                  }
                                                }}
                                              >
                                                {
                                                  Order.unscanned_items[0].images.map((image, index) => {
                                                    slider_image.push(image.image)
                                                  })
                                                }
                                                <Image source={{ uri: slider_image[0] ? slider_image[0] : placeholder }}
                                                  style={{ height: '90%', width: '90%', resizeMode: 'contain', borderRadius: 12, marginRight: 10 }} />
                                              </LinearGradient>
                                              <LinearGradient
                                                locations={[0, 0.04, 0.08]}
                                                start={{ x: .9, y: 1 }}
                                                colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                style={{
                                                  justifyContent: "center", backgroundColor: '#fff', paddingHorizontal: 10, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingVertical: 5, marginBottom: 10,
                                                  borderTopLeftRadius: 12, borderBottomLeftRadius: 12,
                                                  shadowColor: "#000000",
                                                  shadowOpacity: 0.58,
                                                  shadowRadius: 29,
                                                  shadowOffset: {
                                                    width: 5,
                                                    height: 29
                                                  }
                                                }}>
                                                <Text style={{ textAlign: "center", fontSize: 25, color: "#8e8b8b", fontFamily: fontFamily.font700 }}>
                                                  {Order.unscanned_items[0].scanned_qty} / {Order.unscanned_items[0].qty_remaining + Order.unscanned_items[0].scanned_qty}
                                                </Text>
                                                <Text style={{ textAlign: "center", fontSize: 15, color: "#8e8b8b", fontFamily: fontFamily.font600, textTransform: "uppercase", lineHeight: '70%' }}>
                                                  Scanned
                                                </Text>
                                              </LinearGradient>
                                            </View>

                                          </View>
                                        </React.Fragment>
                                    }
                                    <View style={{ backgroundColor: "#000" }}>
                                      <LinearGradient
                                        style={{ flexDirection: "row", backgroundColor: "#707070", borderRadius: 10, marginTop: 1, marginBottom: 1 }}
                                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                        locations={[0, 1]}
                                        colors={['#000000', '#3a3a3a']}>
                                        <TouchableOpacity onPress={this.props.showScannedList}
                                          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontFamily: fontFamily.font500, color: "#c6c6c6", alignItems: "center" }}>
                                              {unscannedCount} Un-scanned
                                            </Text>
                                            {
                                              this.props.scannedList && <View style={{ width: '90%', height: 2, backgroundColor: '#555454' }} />
                                            }
                                          </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.props.showUnscannedList}
                                          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontFamily: fontFamily.font500, color: "#c6c6c6", alignItems: "center" }}>{Order.scanned_items && Order.scanned_items.length > 0 ? Order.scanned_items.length : 0} Scanned</Text>
                                            {
                                              this.props.unscannedList && <View style={{ width: '90%', height: 2, backgroundColor: '#555454' }} />
                                            }
                                          </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.props.showLogList}
                                          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontFamily: fontFamily.font500, color: "#c6c6c6", alignItems: "center" }}>Activity Log</Text>
                                            {

                                              this.props.logList && <View style={{ width: '90%', height: 2, backgroundColor: '#555454' }} />
                                            }
                                          </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.props.navButtonLeft} style={{ marginRight: 10, marginTop: 5 }}>
                                          <Image style={{ width: 20, height: 20 }} source={upArrow ? upArrow : ""} />
                                        </TouchableOpacity>
                                      </LinearGradient>
                                    </View>
                                    <ScrollView>
                                      {
                                        this.props.scannedList &&
                                        <React.Fragment>
                                          {
                                            Order.unscanned_items && Order.unscanned_items.length > 0
                                              ?
                                              Order.unscanned_items.slice(0, 10).map((item, index) => {
                                                return (
                                                  <React.Fragment>
                                                    {
                                                      index >= 0 &&
                                                      <View style={{ textAlign: "left" }}>
                                                        {
                                                          (item && item.product_type === "single") || (item && item.product_type === "depends")
                                                            ?
                                                            <View key={index} style={{ flexDirection: "row", position: "relative", backgroundColor: "#292929", textAlign: "left", display: "flex", marginTop: 5 }}>
                                                              <View style={{ width: '100%', minHeight: 125 }}>
                                                                <LinearGradient
                                                                  colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                                                  locations={[0, 0.34, 1]}
                                                                  style={{ flex: 16, padding: 4, borderTopLeftRadius: 12, borderTopEndRadius: 12 }}
                                                                >
                                                                  <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(item)}
                                                                    delayLongPress={1000}
                                                                  >
                                                                    <Text numberOfLines={2}
                                                                      ellipsizeMode='tail'
                                                                      style={item.name && item.name.length <= 32
                                                                        ?
                                                                        { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                                        :
                                                                        { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }}
                                                                    >
                                                                      {item.name}
                                                                    </Text>
                                                                  </TouchableOpacity>
                                                                </LinearGradient>
                                                                <View style={{
                                                                  padding: 4,
                                                                  justifyContent: "center",
                                                                  backgroundColor: "#b6cadd"
                                                                }}>
                                                                  <Text numberOfLines={1}
                                                                    ellipsizeMode='tail'
                                                                    style={{ fontSize: 18, fontFamily: fontFamily.font700, color: "#3f638b", width: '65%' }}
                                                                  >
                                                                    {item.sku}
                                                                  </Text>
                                                                </View>
                                                                <View style={{ backgroundColor: "#c1d4e6", paddingLeft: 3, paddingRight: 3, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 3 }}>
                                                                  <View style={{ backgroundColor: "#d3def4", }}>
                                                                    <Text style={{ fontSize: 18, width: "75%", fontFamily: fontFamily.font400 }}
                                                                      numberOfLines={1}
                                                                      ellipsizeMode='tail'
                                                                    >
                                                                      {
                                                                        item &&
                                                                        item.barcodes.length > 0 &&
                                                                        item.barcodes[0].barcode
                                                                      }
                                                                    </Text>
                                                                  </View>
                                                                  <View style={{ flexDirection: "row", width: "75%" }}>
                                                                    {
                                                                      item.location !== null && item.location !== "" &&
                                                                      <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                                                        <Text style={{ fontSize: 12, fontFamily: fontFamily.font400 }}>L1:</Text>
                                                                        <Text numberOfLines={1}
                                                                          style={{ fontSize: 15, fontFamily: fontFamily.font700 }}
                                                                        >
                                                                          {item.location}
                                                                        </Text>
                                                                      </View>
                                                                    }
                                                                    {
                                                                      item.custom_product_1 !== null && item.custom_product_1 !== "" &&
                                                                      <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                                                        <Text style={{ fontSize: 12, fontFamily: fontFamily.font400 }}>C1:</Text>
                                                                        <Text numberOfLines={1}
                                                                          style={{ fontSize: 15, fontFamily: fontFamily.font700 }}
                                                                        >
                                                                          {item.custom_product_1}
                                                                        </Text>
                                                                      </View>
                                                                    }
                                                                  </View>
                                                                </View>
                                                              </View>

                                                              <View style={{ position: "absolute", top: 0, right: 0, height: "100%" }}>
                                                                <LinearGradient
                                                                  locations={[0, 0.04, 0.08]}
                                                                  start={{ x: .9, y: 1 }}
                                                                  colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                                  style={{
                                                                    height: 100,
                                                                    width: 100,
                                                                    backgroundColor: "#000000",
                                                                    shadowColor: "#000",
                                                                    shadowOffset: { width: 0, height: 0 },
                                                                    shadowOpacity: 0.58,
                                                                    shadowRadius: 29,
                                                                    elevation: 3,
                                                                    borderTopLeftRadius: 5,
                                                                    borderBottomLeftRadius: 5,
                                                                    marginTop: 5,
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                  }}>
                                                                  <Text style={{ width: '90%', position: "absolute", textAlign: "center", fontSize: 18, fontFamily: fontFamily.font600, backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                                    {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                                                  </Text>
                                                                  <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                                                    style={{ height: "90%", width: "90%", resizeMode: 'contain', borderRadius: 10 }} />
                                                                </LinearGradient>
                                                              </View>
                                                            </View>
                                                            :
                                                            <View key={index} style={{ margin: 1, borderRadius: 20, backgroundColor: "#3f5163", padding: 5 }}>
                                                              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                                                                <View style={{ width: "45%", height: 2, backgroundColor: "#fff" }} />
                                                                <Text style={{ fontSize: 18, fontFamily: fontFamily.font500, color: "#fff" }}>KIT</Text>
                                                                <View style={{ width: "45%", height: 2, backgroundColor: "#fff" }} />
                                                              </View>
                                                              <View style={{ flexDirection: "row", position: "relative" }}>
                                                                <View style={{ width: '100%', minHeight: 100 }}>
                                                                  <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(item)}
                                                                    delayLongPress={1000}>
                                                                    <Text numberOfLines={2}
                                                                      ellipsizeMode='tail'
                                                                      style={item.name && item.name.length <= 32
                                                                        ?
                                                                        { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", color: "#fff", paddingTop: 4 }
                                                                        :
                                                                        { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", color: "#fff", paddingTop: 4 }
                                                                      }
                                                                    >
                                                                      {item.name}
                                                                    </Text>
                                                                  </TouchableOpacity>
                                                                  <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 18, fontFamily: fontFamily.font700, color: "#fff", width: '65%' }}>{item.sku}</Text>
                                                                </View>
                                                                <View style={{ position: "absolute", top: 0, right: 0, height: "100%" }}>
                                                                  <LinearGradient
                                                                    locations={[0, 0.04, 0.08]}
                                                                    start={{ x: .9, y: 1 }}
                                                                    colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                                    style={{
                                                                      height: 100,
                                                                      width: 100,
                                                                      backgroundColor: "#000000",
                                                                      shadowColor: "#000",
                                                                      shadowOffset: { width: 0, height: 0 },
                                                                      shadowOpacity: 0.58,
                                                                      shadowRadius: 29,
                                                                      elevation: 3,
                                                                      borderTopLeftRadius: 5,
                                                                      borderBottomLeftRadius: 5,
                                                                      marginTop: 5,
                                                                      justifyContent: "center",
                                                                      alignItems: "center"
                                                                    }}
                                                                  >
                                                                    <Text style={{ width: '90%', position: "absolute", textAlign: "center", fontSize: 18, fontFamily: fontFamily.font600, backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                                      {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                                                    </Text>
                                                                    <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                                                      style={{ height: "90%", width: "90%", resizeMode: 'contain', borderRadius: 10 }} />
                                                                  </LinearGradient>
                                                                </View>


                                                              </View>
                                                              {
                                                                item && item.child_items && item.child_items.length > 0 && item.child_items.map((childItem, index) => {
                                                                  return (
                                                                    <View key={index} style={{ flexDirection: "row", position: "relative", backgroundColor: "#3f5163", textAlign: "left", display: "flex", marginTop: 5 }}>
                                                                      <View style={{ width: '100%', minHeight: 125 }}>
                                                                        <LinearGradient
                                                                          colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                                                          locations={[0, 0.34, 1]}
                                                                          style={{ flex: 16, padding: 4, borderTopLeftRadius: 12, borderTopEndRadius: 12 }}>
                                                                          <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(childItem)}
                                                                            delayLongPress={1000}>
                                                                            <Text numberOfLines={2}
                                                                              ellipsizeMode='tail'
                                                                              style={childItem.name && childItem.name.length <= 32
                                                                                ?
                                                                                { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }
                                                                                :
                                                                                { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }}>
                                                                              {childItem.name}
                                                                            </Text>
                                                                          </TouchableOpacity>
                                                                        </LinearGradient>
                                                                        <View style={{
                                                                          padding: 4,
                                                                          justifyContent: "center",
                                                                          backgroundColor: "#b6cadd"
                                                                        }}>
                                                                          <Text numberOfLines={1}
                                                                            ellipsizeMode='tail'
                                                                            style={{ fontSize: 18, fontFamily: fontFamily.font700, color: "#3f638b", width: '65%' }}
                                                                          >
                                                                            {childItem.sku}
                                                                          </Text>
                                                                        </View>
                                                                        <View style={{ backgroundColor: "#c1d4e6", paddingLeft: 3, paddingRight: 3, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 3 }}>
                                                                          <View style={{ backgroundColor: "#d3def4" }}>
                                                                            <Text style={{ fontSize: 18, width: "75%", fontFamily: fontFamily.font400 }}
                                                                              numberOfLines={1}
                                                                            >
                                                                              {
                                                                                childItem &&
                                                                                childItem.barcodes.length > 0 &&
                                                                                childItem.barcodes[0].barcode
                                                                              }
                                                                            </Text>
                                                                          </View>
                                                                          <View style={{ flexDirection: "row", width: "75%" }}>
                                                                            {
                                                                              childItem &&
                                                                              childItem.location !== null &&
                                                                              childItem.location !== "" &&
                                                                              <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                                                                <Text style={{ fontSize: 12, fontFamily: fontFamily.font400 }}>L1:</Text>
                                                                                <Text numberOfLines={1}
                                                                                  ellipsizeMode='tail'
                                                                                  style={{ fontSize: 15, fontFamily: fontFamily.font700 }}
                                                                                >
                                                                                  {childItem.location}
                                                                                </Text>
                                                                              </View>
                                                                            }
                                                                            {
                                                                              childItem &&
                                                                              childItem.custom_product_1 !== null &&
                                                                              childItem.custom_product_1 !== "" &&
                                                                              <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                                                                <Text style={{ fontSize: 12, fontFamily: fontFamily.font400 }}>C1:</Text>
                                                                                <Text numberOfLines={1}
                                                                                  ellipsizeMode='tail'
                                                                                  style={{ fontSize: 15, fontFamily: fontFamily.font700 }}
                                                                                >
                                                                                  {childItem.custom_product_1}
                                                                                </Text>
                                                                              </View>
                                                                            }
                                                                          </View>
                                                                        </View>
                                                                      </View>
                                                                      <View style={{ position: "absolute", top: 0, right: 0, height: "100%" }}>
                                                                        <LinearGradient
                                                                          locations={[0, 0.04, 0.08]}
                                                                          start={{ x: .9, y: 1 }}
                                                                          colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                                          style={{
                                                                            height: 100,
                                                                            width: 100,
                                                                            backgroundColor: "#000000",
                                                                            shadowColor: "#000",
                                                                            shadowOffset: { width: 0, height: 0 },
                                                                            shadowOpacity: 0.58,
                                                                            shadowRadius: 29,
                                                                            elevation: 3,
                                                                            borderTopLeftRadius: 5,
                                                                            borderBottomLeftRadius: 5,
                                                                            marginTop: 5,
                                                                            justifyContent: "center",
                                                                            alignItems: "center"
                                                                          }}>
                                                                          <Text style={{ width: '90%', position: "absolute", textAlign: "center", fontSize: 18, fontFamily: fontFamily.font600, backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                                            {childItem.scanned_qty}/{childItem.qty_remaining + childItem.scanned_qty}
                                                                          </Text>
                                                                          <Image source={{ uri: childItem.images && childItem.images.length > 0 ? childItem.images[0].image : placeholder }}
                                                                            style={{ height: "90%", width: "90%", resizeMode: 'contain', borderRadius: 10 }} />
                                                                        </LinearGradient>
                                                                      </View>
                                                                    </View>
                                                                  )
                                                                })
                                                              }
                                                            </View>
                                                        }
                                                      </View>
                                                    }
                                                  </React.Fragment>
                                                )
                                              })
                                              :
                                              <View style={globalStyles.p_10}>
                                                <Text style={styles.scannedItemNameText}>
                                                  No more item remaining to scan
                                                </Text>
                                              </View>
                                          }
                                        </React.Fragment>
                                      }
                                      {
                                        this.props.unscannedList &&
                                        <React.Fragment>
                                          {
                                            Order.scanned_items && Order.scanned_items.length > 0
                                              ?
                                              Order.scanned_items.slice(0, 10).map((item, index) => {
                                                return (
                                                  <View style={{ textAlign: "left" }}>
                                                    {
                                                      <View key={index} style={{ flexDirection: "row", position: "relative", backgroundColor: "#292929", textAlign: "left", display: "flex", marginTop: 5 }}>
                                                        <View style={{ width: '100%', minHeight: 125 }}>
                                                          <LinearGradient
                                                            colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                                            locations={[0, 0.34, 1]}
                                                            style={{ flex: 16, padding: 4, borderTopLeftRadius: 12, borderTopEndRadius: 12 }}
                                                          >
                                                            <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(item)}
                                                              delayLongPress={1000}>
                                                              <Text numberOfLines={2}
                                                                ellipsizeMode='tail'
                                                                style={item.name && item.name.length <= 32
                                                                  ?
                                                                  { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }
                                                                  :
                                                                  { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }
                                                                }
                                                              >
                                                                {item.name}
                                                              </Text>
                                                            </TouchableOpacity>
                                                          </LinearGradient>
                                                          <View style={{
                                                            padding: 4,
                                                            justifyContent: "center",
                                                            backgroundColor: "#b6cadd"
                                                          }}>
                                                            <Text numberOfLines={1}
                                                              ellipsizeMode='tail'
                                                              style={{ fontSize: 18, fontFamily: fontFamily.font700, color: "#3f638b", width: '65%' }}
                                                            >
                                                              {item.sku}
                                                            </Text>
                                                          </View>
                                                          <View style={{ backgroundColor: "#c1d4e6", paddingLeft: 3, paddingRight: 3 }}>
                                                            <View style={{ flexDirection: "row", width: "75%" }}>
                                                              {
                                                                item && item.location !== null && item.location !== "" &&
                                                                <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                                                  <Text style={{ fontSize: 12, fontFamily: fontFamily.font400 }}>L1:</Text>
                                                                  <Text numberOfLines={1}
                                                                    ellipsizeMode='tail'
                                                                    style={{ fontSize: 15, fontFamily: fontFamily.font700 }}
                                                                  >
                                                                    {item.location}
                                                                  </Text>
                                                                </View>
                                                              }
                                                              {
                                                                item && item.custom_product_1 !== null && item.custom_product_1 !== "" &&
                                                                <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                                                  <Text style={{ fontSize: 12, fontFamily: fontFamily.font400 }}>C1:</Text>
                                                                  <Text numberOfLines={1}
                                                                    ellipsizeMode='tail'
                                                                    style={{ fontSize: 15, fontFamily: fontFamily.font700 }}
                                                                  >
                                                                    {item.custom_product_1}
                                                                  </Text>
                                                                </View>
                                                              }
                                                            </View>
                                                          </View>
                                                          <View style={{ backgroundColor: "#d3def4", paddingLeft: 3, paddingRight: 3, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                                            <Text style={{ fontSize: 18, width: "75%", fontFamily: fontFamily.font400 }}
                                                              numberOfLines={1}
                                                              ellipsizeMode='tail'
                                                            >
                                                              {
                                                                item &&
                                                                item.barcodes.length > 0 &&
                                                                item.barcodes[0].barcode
                                                              }
                                                            </Text>
                                                          </View>
                                                        </View>

                                                        <View style={{ position: "absolute", top: 0, right: 0, height: "100%" }}>
                                                          <LinearGradient
                                                            locations={[0, 0.04, 0.08]}
                                                            start={{ x: .9, y: 1 }}
                                                            colors={['#3d4851', '#9EA4A8', '#ffffff']}
                                                            style={{
                                                              height: 100,
                                                              width: 100,
                                                              backgroundColor: "#000000",
                                                              shadowColor: "#000",
                                                              shadowOffset: { width: 0, height: 0 },
                                                              shadowOpacity: 0.58,
                                                              shadowRadius: 29,
                                                              elevation: 3,
                                                              borderTopLeftRadius: 5,
                                                              borderBottomLeftRadius: 5,
                                                              marginTop: 5,
                                                              justifyContent: "center",
                                                              alignItems: "center"
                                                            }}
                                                          >
                                                            <Text style={{ width: '90%', position: "absolute", textAlign: "center", fontSize: 18, fontFamily: fontFamily.font600, backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                              {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                                            </Text>

                                                            <Image source={{ uri: item.images.length > 0 ? item.images[0].image : placeholder }}
                                                              style={{ height: "90%", width: "90%", resizeMode: 'contain', borderRadius: 10 }} />
                                                          </LinearGradient>
                                                        </View>
                                                      </View>
                                                    }
                                                  </View>
                                                )
                                              })
                                              :
                                              <View style={globalStyles.p_10}>
                                                <Text style={styles.scannedItemNameText}>
                                                  No Record
                                                </Text>
                                              </View>
                                          }
                                        </React.Fragment>
                                      }
                                      {
                                        this.props.logList &&
                                        <React.Fragment>
                                          {
                                            localLogs && localLogs.length > 0
                                              ?
                                              localLogs && localLogs.slice(0, 10).map((log, index) => {
                                                return (
                                                  <View key={index} style={[globalStyles.flexDirectionRow, { paddingLeft: 10, paddingBottom: 0, paddingTop: 5, paddingRight: 10, textAlign: "left", borderBottomWidth: 1, borderBottomColor: "#000" }]}>
                                                    <View style={styles.actionBox}>
                                                      <Text style={[styles.logDate, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                        {moment(log.time).format('MMMM Do YYYY, h:mm:ss a')}
                                                      </Text>
                                                      {
                                                        log.event === "regular" &&
                                                        <View>
                                                          {
                                                            log.Log_count !== ""
                                                              ?
                                                              <View>
                                                                <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                                  {`Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                                </Text>
                                                                <Text style={[styles.logDate, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                                  {`Multibarcode count of ${log.Log_count} scanned for product ${log.SKU} `}
                                                                </Text>
                                                              </View>
                                                              :
                                                              log.actionBarcode
                                                                ?
                                                                <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                                  {`Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                                </Text>
                                                                :
                                                                <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                                  {`INVALID SCAN - Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                                </Text>
                                                          }
                                                        </View>
                                                      }
                                                      {
                                                        log.event === "click_scan" &&
                                                        <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                          {` Item with SKU: ${log.SKU} has been click scanned - by: ${log.name}`}
                                                        </Text>
                                                      }
                                                      {
                                                        log.event === "bulk_scan" &&
                                                        <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                          {`Item ${log.SKU} scanned through Bulk Scan - by: ${log.name}`}
                                                        </Text>
                                                      }
                                                      {
                                                        log.event === "type_scan" &&
                                                        <View>
                                                          <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                            {`Item with SKU: ${log.SKU} has been click scanned for a Type-In count - by: ${log.name}`}
                                                          </Text>
                                                          <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                            {`Type-In count of ${log.count} entered for product ${log.SKU}`}
                                                          </Text>
                                                        </View>
                                                      }
                                                      {
                                                        log.event === "serial_scan" &&
                                                        <Text style={[styles.logAction, { color: "#8a8989", fontFamily: fontFamily.font500 }]}>
                                                          {`Product: ${log.SKU} Serial scanned: "check" - by: ${log.name}`}
                                                        </Text>
                                                      }
                                                    </View>
                                                  </View>
                                                )
                                              })
                                              :
                                              <View style={globalStyles.p_10}>
                                                <Text style={styles.scannedItemNameText}>
                                                  No Record
                                                </Text>
                                              </View>
                                          }
                                        </React.Fragment>
                                      }
                                    </ScrollView>
                                  </View>
                                </View>
                              }
                            </View>
                          </ScrollView>
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontSize: 14, fontWeight: "bold" }}>No order is present to scan</Text>
                        </View>
                    }
                  </React.Fragment>
              }
            </View>
            :
            <View>
              <View style={{ height: "100%", width: "100%" }}>
                <View style={styles.nextItemsMain}>
                  {
                    this.props.order && Order.unscanned_items[0] &&
                    <View style={styles.RFPScreen}>
                      <View style={{ width: "100%", flex: 1, backgroundColor: "#666666" }}>
                        <View style={styles.actionButtonsView}>
                          <View style={{ position: "relative" }}>
                            <TouchableOpacity onPress={() => this.orderDetail(Order)} style={{ marginRight: 45, marginLeft: 45 }}>
                              <Text numberOfLines={1}
                                ellipsizeMode='tail'
                                style={[styles.nowScanningTextView, { textAlign: "center", margin: 8 }]}>
                                Order {Order.increment_id}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                              let actionBarShow = !this.state.actionBarShow
                              this.setState({ actionBarShow })
                            }
                            }
                              style={{ position: "absolute", right: 10 }}>
                              <Image style={[styles.nowScanningTextView, { textAlign: "center", marginTop: 8, marginBottom: 8 }]} source={toggle ? toggle : ""} />
                            </TouchableOpacity>
                          </View>
                          {
                            this.state.actionBarShow &&
                            <View style={styles.actionButtonInnerView}>
                              <TouchableOpacity style={styles.restartButtonDesign}
                                onPress={this.props.restartButton}
                              >
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                  <Image style={styles.actionImages}
                                    source={restart ? restart : ""} />
                                  {
                                    this.state.windowWidth > 375 &&
                                    <React.Fragment>
                                      <View style={{ flexDirection: "column", alignItems: "center" }}>
                                        <Text style={styles.actionButtonText}>Restart</Text>
                                        <Text style={styles.actionButtonText}>Order</Text>
                                      </View>
                                    </React.Fragment>
                                  }
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.noteSaveButtonDesign}
                                onPress={this.props.saveChanges}
                              >
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                                  <Image style={styles.actionImages}
                                    source={deleteImage ? deleteImage : ""} />
                                  {
                                    this.state.windowWidth > 375 &&
                                    <React.Fragment>
                                      <View style={{ flexDirection: "column", alignItems: "center" }}>
                                        <Text style={styles.actionButtonText}>Remove</Text>
                                        <Text style={styles.actionButtonText}>Item</Text>
                                      </View>
                                    </React.Fragment>
                                  }
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.noteSaveButtonDesign}
                                onPress={this.props.addNote}
                              >
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                  <Image style={styles.actionImages}
                                    source={note ? note : ""} />
                                  {
                                    this.state.windowWidth > 375 &&
                                    <React.Fragment>
                                      <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 2 }}>
                                        <Text style={styles.actionButtonText}>Add</Text>
                                        <Text style={styles.actionButtonText}>Note</Text>
                                      </View>
                                    </React.Fragment>
                                  }
                                </View>
                              </TouchableOpacity>
                            </View>
                          }
                        </View>
                        <View style={{ backgroundColor: "#2c2c2c", padding: 10 }}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <View style={{ height: 10, width: 10, backgroundColor: "#5f80ff", borderRadius: 30, marginRight: 10, shadowOffset: { width: 0, height: 0, }, shadowColor: '#fff', shadowOpacity: 1.0, }}>
                              </View>
                            </View>
                            <TextInput value={this.props.barcodeState}
                              autoFocus={true}
                              ref={this.props.InputField}
                              onSubmitEditing={this.props.scanBarcode}
                              onChangeText={this.props.stateUpdate}
                              style={{ outline: "none", flex: 15, paddingLeft: 20, padding: 5, backgroundColor: "#cbcbca", fontSize: 15, fontWeight: "bold", color: "black", width: "100%", textAlign: "left", borderWidth: 1, borderColor: "#cbcbca", borderRadius: 5 }}
                              onKeyUp={this.props.removeFocus}
                              placeholder={this.state.scanPlaceHolderValue}
                              placeholderTextColor={"#4c4c4b"}
                              onBlur={() => {
                                const blurValue = Platform.OS === "web" ? "Click Here Before Scanning" : "Tap Here Before Scanning"
                                this.setState({ scanPlaceHolderValue: blurValue })
                              }}
                              onFocus={() => this.setState({ scanPlaceHolderValue: 'Ready For Product Scan' })}
                            />
                            {
                              Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0
                                ?
                                <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0])}
                                  onLongPress={this.props.scanAllItem}
                                  delayLongPress={1000}
                                  style={{ flex: 4, marginLeft: 5, backgroundColor: "#41970f", textTransform: "uppercase", justifyContent: "center", alignItems: "center", padding: 5, borderRadius: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff", textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textAlign: "center", fontSize: 20 }}
                                  >
                                    Pass
                                  </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0])}
                                  onLongPress={this.props.scanAllItem}
                                  delayLongPress={1000}
                                  style={{ flex: 4, marginLeft: 5, backgroundColor: "#41970f", textTransform: "uppercase", justifyContent: "center", alignItems: "center", padding: 5, borderRadius: 5 }}>
                                  <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff", textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textAlign: "center", fontSize: 20 }}
                                  >
                                    Pass
                                  </Text>
                                </TouchableOpacity>
                            }
                          </View>
                        </View>
                        {
                          Order.unscanned_items[0].product_type === "individual" && Order.unscanned_items[0].child_items.length > 0
                            ?
                            <React.Fragment>
                              {
                                Order.unscanned_items[0].child_items[0].instruction !== "" && Order.unscanned_items[0].child_items[0].instruction !== null &&
                                <View style={{ height: 70 }}>
                                  <ScrollView>
                                    {
                                      Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                      <View style={{ zIndex: 10, backgroundColor: "#01126c", width: "100%", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                                        <View style={{ width: "100%" }}>
                                          <View>
                                            {
                                              Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                              <View>
                                                <View style={{ padding: 5, color: "white", fontWeight: "bold", marginBottom: -16, marginTop: -12, textShadowColor: "white", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 10 }}>
                                                  {
                                                    Order.unscanned_items[0].child_items[0].instruction !== "" &&
                                                    <HTML html={`<div style="color: white;">${Order.unscanned_items[0].child_items[0].instruction}</div>`} imagesMaxWidth={Dimensions.get('window').width} />
                                                  }
                                                </View>
                                              </View>
                                            }
                                          </View>
                                        </View>
                                      </View>
                                    }
                                  </ScrollView>
                                </View>
                              }
                              <View style={{ flexDirection: "row", backgroundColor: "#292929" }}>
                                <View style={{ flex: 15 }}>
                                  <TouchableOpacity onPress={() => this.props.redirectToItemDetail(Order.unscanned_items[0].child_items[0])}
                                    style={{ flex: 16, backgroundColor: "#fff" }}
                                  >
                                    <Text numberOfLines={3}
                                      ellipsizeMode='tail'
                                      style={Order.unscanned_items[0].child_items[0].name &&
                                        Order.unscanned_items[0].child_items[0].name.length <= 32
                                        ?
                                        { fontSize: 22 }
                                        :
                                        { fontSize: 16 }
                                      }>
                                      {Order.unscanned_items[0].child_items[0].name}
                                    </Text>
                                  </TouchableOpacity>
                                  <View style={{ backgroundColor: "#d3def4", flex: 5, paddingTop: 3, paddingBottom: 3 }}>
                                    <Text style={{ fontSize: 22 }}
                                      numberOfLines={1}
                                      ellipsizeMode='tail'>
                                      {
                                        Order.unscanned_items[0].child_items[0] &&
                                        Order.unscanned_items[0].child_items[0].barcodes.length > 0 &&
                                        Order.unscanned_items[0].child_items[0].barcodes[0].barcode
                                      }
                                    </Text>
                                  </View>
                                </View>

                                <View style={{ flex: 5, backgroundColor: "#d3def4", borderBottomRightRadius: 12, borderTopRightRadius: 12 }}>
                                  <View style={{ backgroundColor: "#fff", position: "relative", zIndex: 9, shadowColor: "#000", shadowOffset: { width: -5, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, borderRadius: 12, borderWidth: 5, borderColor: "#3f5163" }}>

                                    <Image source={{ uri: placeholder }}
                                      style={{ height: 90, width: "100%", resizeMode: 'contain', borderRadius: 12 }} />
                                  </View>
                                </View>
                              </View>
                              <View style={{ flexDirection: "row", backgroundColor: "#292929", zIndex: -1 }}>
                                <View style={{ flex: 15, flexDirection: "column" }}>
                                  <View style={{ height: 80, backgroundColor: "#666666" }}>
                                    <View style={{ backgroundColor: "#000" }}>
                                      <View style={{ height: 40, padding: 8, justifyContent: "center", backgroundColor: "#336598", borderBottomRightRadius: 10 }}>
                                        <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0])}>
                                          <Text numberOfLines={1}
                                            ellipsizeMode='tail'
                                            style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}
                                          >
                                            {Order.unscanned_items[0].child_items[0].sku}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    {
                                      Order.unscanned_items[0].child_items[0].location !== undefined &&
                                      Order.unscanned_items[0].child_items[0].location !== null &&
                                      Order.unscanned_items[0].child_items[0].location !== "" &&
                                      <View style={{ flexDirection: "row", height: 40, padding: 8, alignItems: "center", backgroundColor: "#000", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", paddingTop: 2 }}>L1 : </Text>
                                        <Text numberOfLines={1}
                                          ellipsizeMode='tail'
                                          style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}
                                        >
                                          {Order.unscanned_items[0].child_items[0].location}
                                        </Text>
                                      </View>
                                    }
                                  </View>
                                </View>

                                <View style={{ flex: 5, backgroundColor: "#000", borderBottomRightRadius: 20, justifyContent: "center" }}>
                                  <Text style={{ textAlign: "center", fontSize: 25, color: "#fff", fontWeight: "bold" }}>
                                    {Order.unscanned_items[0].child_items[0].scanned_qty} / {Order.unscanned_items[0].child_items[0].qty_remaining + Order.unscanned_items[0].child_items[0].scanned_qty}
                                  </Text>
                                  <Text style={{ textAlign: "center", fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                                    Scanned
                                  </Text>
                                </View>
                              </View>
                              <View style={{ backgroundColor: "#666666" }}>
                                {
                                  Order.unscanned_items &&
                                  Order.unscanned_items[0] &&
                                  Order.unscanned_items[0].child_items &&
                                  Order.unscanned_items[0].child_items[0] &&
                                  Order.unscanned_items[0].child_items[0].location2 !== null &&
                                  Order.unscanned_items[0].child_items[0].location2 !== "" &&
                                  <View style={{ flexDirection: "row", height: 40, padding: 8, alignItems: "center", backgroundColor: "#282828", borderRadius: 10, marginTop: 2, marginBottom: 1 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", paddingTop: 2 }}>L2 : </Text>
                                    <Text numberOfLines={1}
                                      ellipsizeMode='tail'
                                      style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}
                                    >
                                      {Order.unscanned_items[0].child_items[0].location2}
                                    </Text>
                                  </View>
                                }
                                {
                                  Order.unscanned_items &&
                                  Order.unscanned_items[0] &&
                                  Order.unscanned_items[0].child_items &&
                                  Order.unscanned_items[0].child_items[0] &&
                                  Order.unscanned_items[0].child_items[0].custom_product_1 !== null &&
                                  Order.unscanned_items[0].child_items[0].custom_product_1 !== "" &&
                                  <View style={{ flexDirection: "row", height: 40, padding: 8, alignItems: "center", backgroundColor: "#454444", borderRadius: 10, marginTop: 1, marginBottom: 2 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", paddingTop: 2 }}>C1: </Text>
                                    <Text numberOfLines={1}
                                      ellipsizeMode='tail'
                                      style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}
                                    >
                                      {Order.unscanned_items[0].child_items[0].custom_product_1}
                                    </Text>
                                  </View>
                                }
                              </View>
                            </React.Fragment>
                            :
                            <React.Fragment>
                              {
                                Order.unscanned_items[0].instruction !== "" && Order.unscanned_items[0].instruction !== null &&
                                <View style={{ height: 70 }}>
                                  <ScrollView>
                                    {
                                      Order.unscanned_items[0].instruction !== "" &&
                                      <View style={{ zIndex: 10, backgroundColor: "#01126c", width: "100%", justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
                                        <View style={{ width: "100%" }}>
                                          <View>
                                            {
                                              Order.unscanned_items[0].instruction !== "" &&
                                              <View>
                                                <View style={{ padding: 5, color: "white", fontWeight: "bold", marginBottom: -16, marginTop: -12, textShadowColor: "white", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 10 }}>
                                                  {
                                                    Order.unscanned_items[0].instruction !== "" &&
                                                    <HTML html={`<div style="color: white;">${Order.unscanned_items[0].instruction}</div>`} imagesMaxWidth={Dimensions.get('window').width} />
                                                  }
                                                </View>
                                              </View>
                                            }
                                          </View>
                                        </View>
                                      </View>
                                    }
                                  </ScrollView>
                                </View>
                              }
                              <View style={{ flexDirection: "row", backgroundColor: "#292929" }}>
                                <View style={{ flex: 15 }}>
                                  <TouchableOpacity onPress={() => this.props.redirectToItemDetail(Order.unscanned_items[0])}
                                    style={{ flex: 16, backgroundColor: "#fff" }}
                                  >
                                    <Text numberOfLines={3}
                                      style={Order.unscanned_items[0].name &&
                                        Order.unscanned_items[0].name.length <= 32
                                        ?
                                        { fontSize: 24 }
                                        :
                                        { fontSize: 20 }
                                      }
                                      ellipsizeMode='tail'>
                                      {Order.unscanned_items[0].name}
                                    </Text>
                                  </TouchableOpacity>
                                  <View style={{ backgroundColor: "#d3def4", flex: 5, padding: 3 }}>
                                    <Text style={{ fontSize: 22, paddingBottom: 3 }}
                                      numberOfLines={1}
                                      ellipsizeMode='tail'
                                    >
                                      {
                                        Order.unscanned_items[0] &&
                                        Order.unscanned_items[0].barcodes.length > 0 &&
                                        Order.unscanned_items[0].barcodes[0].barcode
                                      }
                                    </Text>
                                  </View>
                                </View>

                                <View style={{ flex: 5, backgroundColor: "#d3def4", borderBottomRightRadius: 12, borderTopRightRadius: 12 }}>
                                  <View style={{ backgroundColor: "#fff", position: "relative", zIndex: 9, shadowColor: "#000", shadowOffset: { width: -5, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, borderRadius: 12, borderWidth: 5, borderColor: "#3f5163" }}>

                                    <Image source={{ uri: placeholder }}
                                      style={{ height: 90, width: "100%", resizeMode: 'contain', borderRadius: 12 }} />
                                  </View>
                                </View>
                              </View>
                              <View style={{ flexDirection: "row", backgroundColor: "#292929", zIndex: -1 }}>
                                <View style={{ flex: 15, flexDirection: "column" }}>
                                  <View style={{ height: 80, backgroundColor: "#666666" }}>
                                    <View style={{ backgroundColor: "#000" }}>
                                      <View style={{ height: 40, padding: 8, justifyContent: "center", backgroundColor: "#336598", borderBottomRightRadius: 10 }}>
                                        <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0])} >
                                          <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>{Order.unscanned_items[0].sku}</Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    {
                                      Order.unscanned_items[0].location !== null &&
                                      Order.unscanned_items[0].location !== "" &&
                                      <View style={{ flexDirection: "row", height: 40, padding: 8, alignItems: "center", backgroundColor: "#000", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", paddingTop: 2 }}>L1 : </Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>{Order.unscanned_items[0].location}</Text>
                                      </View>
                                    }
                                  </View>
                                </View>

                                <View style={{ flex: 5, backgroundColor: "#000", borderBottomRightRadius: 20, justifyContent: "center" }}>
                                  <Text style={{ textAlign: "center", fontSize: 25, color: "#fff", fontWeight: "bold" }}>
                                    {Order.unscanned_items[0].scanned_qty} / {Order.unscanned_items[0].qty_remaining + Order.unscanned_items[0].scanned_qty}
                                  </Text>
                                  <Text style={{ textAlign: "center", fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                                    Scanned
                                  </Text>
                                </View>
                              </View>
                              <View style={{ backgroundColor: "#666666" }}>
                                {
                                  Order.unscanned_items &&
                                  Order.unscanned_items[0] &&
                                  Order.unscanned_items[0].location2 !== null &&
                                  Order.unscanned_items[0].location2 !== "" &&
                                  <View style={{ flexDirection: "row", height: 40, padding: 8, alignItems: "center", backgroundColor: "#282828", borderRadius: 10, marginTop: 2, marginBottom: 1 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", paddingTop: 2 }}>L2 : </Text>
                                    <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>{Order.unscanned_items[0].location2}</Text>
                                  </View>
                                }
                                {
                                  Order.unscanned_items &&
                                  Order.unscanned_items[0] &&
                                  Order.unscanned_items[0].custom_product_1 !== null &&
                                  Order.unscanned_items[0].custom_product_1 !== "" &&
                                  <View style={{ flexDirection: "row", height: 40, padding: 8, alignItems: "center", backgroundColor: "#454444", borderRadius: 10, marginTop: 1, marginBottom: 2 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff", paddingTop: 2 }}>C1: </Text>
                                    <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>{Order.unscanned_items[0].custom_product_1}</Text>
                                  </View>
                                }
                              </View>
                            </React.Fragment>
                        }
                        <View style={{ backgroundColor: "#2e4862" }}>
                          <View style={{ flexDirection: "row", height: 40, backgroundColor: "#2e4862", borderRadius: 10, marginTop: 1, marginBottom: 1 }}>
                            <TouchableOpacity onPress={() => { this.setState({ unscannedList: false, scannedList: true, logList: false }) }}
                              style={
                                this.state.scannedList
                                  ?
                                  { flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#000", color: "#fff", borderRadius: 10 }
                                  :
                                  { flex: 2, justifyContent: "center", alignItems: "center" }
                              }
                            >
                              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", padding: 4, alignItems: "center" }}>NEXT UP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ unscannedList: true, scannedList: false, logList: false }) }}
                              style={
                                this.state.unscannedList
                                  ?
                                  { flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#000", color: "#fff", borderRadius: 10 }
                                  :
                                  { flex: 2, justifyContent: "center", alignItems: "center" }
                              }>
                              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", padding: 4 }}>SCANNED</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ unscannedList: false, scannedList: false, logList: true }) }}
                              style={
                                this.state.logList
                                  ?
                                  { flex: 2, justifyContent: "center", alignItems: "center", backgroundColor: "#000", color: "#fff", borderRadius: 10 }
                                  :
                                  { flex: 2, justifyContent: "center", alignItems: "center" }
                              }>
                              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", padding: 4 }}>SCAN LOG</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <ScrollView>
                          {
                            this.state.scannedList &&
                            <React.Fragment>
                              {
                                Order.unscanned_items && Order.unscanned_items.length > 0
                                  ?
                                  Order.unscanned_items.map((item, index) => {
                                    return (
                                      <View>
                                        {
                                          (item && item.product_type === "single") || (item && item.product_type === "depends")
                                            ?
                                            <View key={index} style={{ flexDirection: "row", margin: 2, borderRadius: 30, borderWidth: 4, backgroundColor: "#336598", borderColor: "black", padding: 10 }}>
                                              <View style={{ flex: 20 }}>
                                                <TouchableOpacity onPress={() => this.props.redirectToItemDetail(item)}
                                                  style={{ backgroundColor: "#fff", padding: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                                  <Text numberOfLines={2}
                                                    ellipsizeMode='tail'
                                                    style={item.name && item.name.length <= 32 ? { fontSize: 20, width: "75%" } : { fontSize: 16, width: "75%" }}>
                                                    {item.name}
                                                  </Text>
                                                </TouchableOpacity>
                                                <Text numberOfLines={1}
                                                  ellipsizeMode='tail'
                                                  style={{ color: "#fff", fontSize: 20, fontWeight: "600", width: "75%" }}
                                                >
                                                  {item.sku}
                                                </Text>
                                                <View style={{ backgroundColor: "#95b0e5", paddingLeft: 3, paddingRight: 3 }}>
                                                  <View style={{ flexDirection: "row", width: "70%" }}>
                                                    {
                                                      item.location !== undefined && item.location !== "" &&
                                                      <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline", height: 25 }}>
                                                        <Text>L1:</Text>
                                                        <Text numberOfLines={1}
                                                          ellipsizeMode='tail'
                                                          style={{ fontSize: 20, fontWeight: "bold", paddingRight: 10 }}
                                                        >
                                                          {item.location}
                                                        </Text>
                                                      </View>
                                                    }
                                                    {
                                                      item.custom_product_1 !== undefined && item.custom_product_1 !== "" &&
                                                      <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline", height: 25 }}>
                                                        <Text>C1:</Text>
                                                        <Text numberOfLines={1}
                                                          ellipsizeMode='tail'
                                                          style={{ fontSize: 20, fontWeight: "bold" }}
                                                        >
                                                          {item.custom_product_1}
                                                        </Text>
                                                      </View>
                                                    }
                                                  </View>
                                                </View>
                                                <View style={{ backgroundColor: "#d3def4", padding: 3, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                                                  <Text style={{ fontSize: 20, width: "75%" }}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                  >
                                                    {
                                                      item &&
                                                      item.barcodes.length > 0 &&
                                                      item.barcodes[0].barcode
                                                    }
                                                  </Text>
                                                </View>
                                              </View>

                                              <View style={{ flex: 5, borderBottomRightRadius: 12, borderTopRightRadius: 12, position: "absolute", right: 6, width: "25%", height: "100%", bottom: 0, top: 10 }}>
                                                <View style={{ backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: -5, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, borderRadius: 12, borderWidth: 8, borderColor: "#336598" }}>
                                                  <Text style={{ position: "absolute", textAlign: "center", fontSize: 18, fontWeight: "600", backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                    {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                                  </Text>
                                                  <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                                    style={{ height: "100%", width: "100%", resizeMode: 'contain', borderRadius: 12 }} />
                                                </View>
                                              </View>
                                            </View>
                                            :
                                            <View key={index} style={{ margin: 2, borderRadius: 30, borderWidth: 4, borderColor: "black", backgroundColor: "#3f5163", padding: 10 }}>
                                              <View style={{ flexDirection: "row" }}>
                                                <View style={{ height: 5, flex: 8, backgroundColor: "#fff", borderRadius: 3, position: "relative" }}>
                                                  <Text style={{ fontSize: 18, fontWeight: "bold", position: "absolute", left: "50%", top: -7, marginLeft: "auto", marginRight: "auto", backgroundColor: "#3f5163", paddingLeft: 4, paddingRight: 4, color: "#fff" }}>
                                                    1KIT
                                                  </Text>
                                                </View>
                                                <View style={{ flex: 2 }}>
                                                  <Text style={{ textAlign: "center", color: "#fff", fontSize: 18, marginTop: -6, fontWeight: "bold" }}>{item.scanned_qty}/{item.qty_remaining + item.scanned_qty}</Text>
                                                </View>
                                              </View>
                                              <View style={{ flexDirection: "row" }}>
                                                <View style={{ flex: 8 }}>
                                                  <TouchableOpacity onPress={() => this.props.redirectToItemDetail(item)}>
                                                    <Text numberOfLines={2}
                                                      ellipsizeMode='tail'
                                                      style={item.name && item.name.length <= 32 ? { fontSize: 22 } : { fontSize: 16 }, { color: "#fff", fontWeight: "600", padding: 3 }}>
                                                      {item.name}
                                                    </Text>
                                                  </TouchableOpacity>
                                                  <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 20, color: "#fff", fontWeight: "600", padding: 3 }}>{item.sku}</Text>
                                                </View>
                                                {
                                                  item.images.length > 0 && item.images[0].image &&
                                                  <View style={{ flex: 2, borderRadius: 12, borderWidth: 12, borderColor: "#3f5163", maxHeight: 80 }}>
                                                    <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                                      style={{ height: "100%", width: "100%", resizeMode: 'contain', borderRadius: 12 }} />
                                                  </View>
                                                }

                                              </View>
                                              {
                                                item && item.child_items && item.child_items.length > 0 && item.child_items.map((childItem, index) => {
                                                  return (
                                                    <View key={index} style={{ flexDirection: "row", margin: 4, backgroundColor: "#fff", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                                      <View style={{ flex: 20 }}>
                                                        <View style={{ backgroundColor: "#fff" }}></View>
                                                        <TouchableOpacity onPress={() => this.props.redirectToItemDetail(childItem)}
                                                          style={{ backgroundColor: "#fff", padding: 5, paddingTop: 10 }}>
                                                          <Text numberOfLines={2}
                                                            ellipsizeMode='tail'
                                                            style={childItem.name && childItem.name.length <= 32
                                                              ?
                                                              { fontSize: 22, width: "75%", lineHeight: "100%" }
                                                              :
                                                              { fontSize: 16, width: "75%", lineHeight: "100%" }}>
                                                            {childItem.name}
                                                          </Text>
                                                        </TouchableOpacity>
                                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ backgroundColor: "#3f5163", color: "#fff", fontSize: 20, fontWeight: "600" }}>{childItem.sku}</Text>
                                                        <View style={{ backgroundColor: "#a4b4c5", height: 25 }}>
                                                          <View style={{ flexDirection: "row", width: "70%" }}>
                                                            {
                                                              childItem &&
                                                              childItem.location !== null &&
                                                              childItem.location !== "" &&
                                                              <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline", height: 25 }}>
                                                                <Text>L1:</Text>
                                                                <Text numberOfLines={1}
                                                                  ellipsizeMode='tail'
                                                                  style={{ fontSize: 20, fontWeight: "bold", paddingRight: 10 }}
                                                                >
                                                                  {childItem.location}
                                                                </Text>
                                                              </View>
                                                            }
                                                            {
                                                              childItem &&
                                                              childItem.custom_product_1 !== null &&
                                                              childItem.custom_product_1 !== "" &&
                                                              <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline", height: 25 }}>
                                                                <Text>C1:</Text>
                                                                <Text numberOfLines={1}
                                                                  ellipsizeMode='tail'
                                                                  style={{ fontSize: 20, fontWeight: "bold" }}
                                                                >
                                                                  {childItem.custom_product_1}
                                                                </Text>
                                                              </View>
                                                            }
                                                          </View>
                                                        </View>
                                                        <View style={{ backgroundColor: "#cdd7e2", padding: 3, borderBottomRightRadius: 20 }}>
                                                          <Text style={{ fontSize: 20, width: "75%" }}
                                                            numberOfLines={1}
                                                          >
                                                            {
                                                              childItem &&
                                                              childItem.barcodes.length > 0 &&
                                                              childItem.barcodes[0].barcode
                                                            }
                                                          </Text>
                                                        </View>
                                                      </View>
                                                      <View style={{ flex: 5, borderBottomRightRadius: 12, paddingTop: 10, position: "absolute", right: 0, width: "25%", height: "100%", bottom: 0, top: 0 }}>
                                                        <View style={{ backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: -5, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, borderRadius: 12, borderWidth: 8, borderColor: "#3f5163" }}>
                                                          <Text style={{ position: "absolute", textAlign: "center", fontSize: 18, fontWeight: "600", backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                            {childItem.scanned_qty}/{childItem.qty_remaining + childItem.scanned_qty}
                                                          </Text>
                                                          <Image source={{ uri: childItem.images && childItem.images.length > 0 ? childItem.images[0].image : placeholder }}
                                                            style={{ height: "100%", width: "100%", resizeMode: 'contain', borderRadius: 12 }} />
                                                        </View>
                                                      </View>
                                                    </View>
                                                  )
                                                })
                                              }
                                            </View>
                                        }
                                      </View>
                                    )
                                  })
                                  :
                                  <View style={globalStyles.p_10}>
                                    <Text style={styles.scannedItemNameText}>
                                      No more item remaining to scan
                                    </Text>
                                  </View>
                              }
                            </React.Fragment>
                          }
                          {
                            this.state.unscannedList &&
                            <React.Fragment>
                              {
                                Order.scanned_items && Order.scanned_items.length > 0
                                  ?
                                  Order.scanned_items.map((item, index) => {
                                    return (
                                      <View>
                                        {
                                          <View key={index} style={{ flexDirection: "row", margin: 2, borderRadius: 30, borderWidth: 4, backgroundColor: "#336598", borderColor: "black", padding: 10 }}>
                                            <View style={{ flex: 20 }}>
                                              <TouchableOpacity onPress={() => this.props.redirectToItemDetail(item)}
                                                style={{ backgroundColor: "#fff", padding: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                                <Text numberOfLines={2}
                                                  ellipsizeMode='tail'
                                                  style={item.name && item.name.length <= 32
                                                    ?
                                                    { fontSize: 20, width: "75%", lineHeight: "100%", lineHeight: "100%" }
                                                    :
                                                    { fontSize: 16, width: "75%", lineHeight: "100%", lineHeight: "100%" }
                                                  }
                                                >
                                                  {item.name}
                                                </Text>
                                              </TouchableOpacity>
                                              <Text numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={{ color: "#fff", fontSize: 20, fontWeight: "600", width: "75%" }}
                                              >
                                                {item.sku}
                                              </Text>
                                              <View style={{ backgroundColor: "#95b0e5", paddingLeft: 3, paddingRight: 3 }}>
                                                <View style={{ flexDirection: "row", width: "70%" }}>
                                                  {
                                                    item && item.location !== null && item.location !== "" &&
                                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline", height: 25 }}>
                                                      <Text>L1:</Text>
                                                      <Text numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                        style={{ fontSize: 20, fontWeight: "bold", paddingRight: 10 }}
                                                      >
                                                        {item.location}
                                                      </Text>
                                                    </View>
                                                  }
                                                  {
                                                    item && item.custom_product_1 !== null && item.custom_product_1 !== "" &&
                                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline", height: 25 }}>
                                                      <Text>C1:</Text>
                                                      <Text numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                        style={{ fontSize: 20, fontWeight: "bold" }}
                                                      >
                                                        {item.custom_product_1}
                                                      </Text>
                                                    </View>
                                                  }
                                                </View>
                                              </View>
                                              <View style={{ backgroundColor: "#d3def4", padding: 3, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                                                <Text style={{ fontSize: 20, width: "75%" }}
                                                  numberOfLines={1}
                                                  ellipsizeMode='tail'
                                                >
                                                  {
                                                    item &&
                                                    item.barcodes.length > 0 &&
                                                    item.barcodes[0].barcode
                                                  }
                                                </Text>
                                              </View>
                                            </View>

                                            <View style={{ flex: 5, borderBottomRightRadius: 12, borderTopRightRadius: 12, position: "absolute", right: 6, width: "25%", height: "100%", bottom: 0, top: 10 }}>
                                              <View style={{ backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: -5, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, borderRadius: 12, borderWidth: 8, borderColor: "#336598" }}>
                                                <Text style={{ position: "absolute", textAlign: "center", fontSize: 18, fontWeight: "600", backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                  {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                                </Text>
                                                <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                                  style={{ height: "100%", width: "100%", resizeMode: 'contain', borderRadius: 12 }
                                                  } />
                                              </View>
                                            </View>
                                          </View>
                                        }
                                      </View>
                                    )
                                  })
                                  :
                                  <View style={globalStyles.p_10}>
                                    <Text style={styles.scannedItemNameText}>
                                      No Record
                                    </Text>
                                  </View>
                              }
                            </React.Fragment>
                          }
                          {
                            this.state.logList &&
                            <React.Fragment>
                              {
                                localLogs && localLogs.length > 0
                                  ?
                                  localLogs && localLogs.slice(0).reverse().map((log, index) => {
                                    return (
                                      <View key={index} style={[globalStyles.flexDirectionRow, { paddingLeft: 10, paddingBottom: 0, paddingTop: 5, paddingRight: 10, textAlign: "left", borderBottomWidth: 1, borderBottomColor: "#000" }]}>
                                        <View style={styles.actionBox}>
                                          <Text style={[styles.logDate, { color: "#000" }]}>
                                            {moment(log.time).format('MMMM Do YYYY, h:mm:ss a')}
                                          </Text>
                                          {
                                            log.event === "regular" &&
                                            <View>
                                              {
                                                log.Log_count !== ""
                                                  ?
                                                  <View>
                                                    <Text style={[styles.logAction, { color: "#000" }]}>
                                                      {`Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                    </Text>
                                                    <Text style={[styles.logDate, { color: "#000" }]}>
                                                      {`Multibarcode count of ${log.Log_count} scanned for product ${log.SKU} `}
                                                    </Text>
                                                  </View>
                                                  :
                                                  log.actionBarcode
                                                    ?
                                                    <Text style={[styles.logAction, { color: "#000" }]}>
                                                      {`Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                    </Text>
                                                    :
                                                    <Text style={[styles.logAction, { color: "#000" }]}>
                                                      {`INVALID SCAN - Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                                                    </Text>
                                              }
                                            </View>
                                          }
                                          {
                                            log.event === "click_scan" &&
                                            <Text style={[styles.logAction, { color: "#000" }]}>
                                              {` Item with SKU: ${log.SKU} has been click scanned - by: ${log.name}`}
                                            </Text>
                                          }
                                          {
                                            log.event === "bulk_scan" &&
                                            <Text style={[styles.logAction, { color: "#000" }]}>
                                              {`Item ${log.SKU} scanned through Bulk Scan - by: ${log.name}`}
                                            </Text>
                                          }
                                          {
                                            log.event === "type_scan" &&
                                            <View>
                                              <Text style={[styles.logAction, { color: "#000" }]}>
                                                {`Item with SKU: ${log.SKU} has been click scanned for a Type-In count - by: ${log.name}`}
                                              </Text>
                                              <Text style={[styles.logAction, { color: "#000" }]}>
                                                {`Type-In count of ${log.count} entered for product ${log.SKU}`}
                                              </Text>
                                            </View>
                                          }
                                          {
                                            log.event === "serial_scan" &&
                                            <Text style={[styles.logAction, { color: "#000" }]}>
                                              {`Product: ${log.SKU} Serial scanned: "check" - by: ${log.name}`}
                                            </Text>
                                          }
                                        </View>
                                      </View>
                                    )
                                  })
                                  :
                                  <View style={globalStyles.p_10}>
                                    <Text style={styles.scannedItemNameText}>
                                      No Record
                                    </Text>
                                  </View>
                              }
                            </React.Fragment>
                          }
                        </ScrollView>
                      </View>
                    </View>
                  }
                </View>
              </View>
            </View>
        }
      </View>
    );
  }
}