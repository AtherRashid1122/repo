import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground, Image, Dimensions, TouchableOpacity, Platform, ScrollView } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import restart from "../../../assets/restart.png";
import note from "../../../assets/note.png";
import deleteImage from "../../../assets/delete.png";
import toggle from "../../../assets/dotToggle.png";
import { LinearGradient } from 'expo-linear-gradient';
import backImage from "../../../assets/bg_left.png";
import upArrow from "../../../assets/up_arrow.png";
import downArrow from "../../../assets/down_arrow.png";
import placeholder from "../../../assets/placeholder.png";
import { fontFamily } from '../../helpers/fontFamily';
import moment from 'moment';

let count = 0

export default class UnscannedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionBarShow: false,
      unscannedItemPerPage: 1,
      scanPlaceHolderValue: "Ready For Product Scan",
      windowWidth: Dimensions.get('window').width
    };
    this.unscannedInputField = React.createRef();
  }

  orderDetail = (order) => {
    // if(order){
    // this.props.leaveComponent(this.props.order , "submitLog")
    this.props.navigation.navigate("OrderDetail", { data: order })
    // }
  }

  updateDimensions = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  calculateUnScanned = () => {
    let Order = this.props.order.order
    if (Order.unscanned_items && Order.unscanned_items.length > 0) {
      let qty_remaning = 0
      for (let i = 0; i <= Order.unscanned_items.length -1; ++i) {
        qty_remaning += Order.unscanned_items[i].qty_remaining
        if(Order.unscanned_items[i].child_items.length > 0) {
          for (let j = 0; j <= Order.unscanned_items[i].child_items.length -1; ++j) {
            qty_remaning += Order.unscanned_items[i].child_items[j].qty_remaining
          }
        }
      }
      return qty_remaning
    }
    return 0
  }

  render() {
    let props = this.props
    let Order = props.order.order
    let localCount = 0
    let unscannedCount = this.calculateUnScanned()
    Order &&
      Order.unscanned_items &&
      Order.unscanned_items.length > 0 &&
      Order.unscanned_items.map((item) => {
        if (item.child_items && item.child_items.length > 0 && item.product_type === "individual") {
          item.child_items.map((childItem) => {
            localCount = localCount + childItem.qty_remaining
          })
        } else {
          localCount = localCount + item.qty_remaining
        }
      }
      )
    count = localCount
    const windowHeight = Dimensions.get('window').height;
    let perPage = this.state.unscannedItemPerPage * 10

    return (
      <React.Fragment>
        {
          Order &&
          <View style={Platform.OS === "web" ? styles.unscannedItemContainerWeb : { width: "100%", height: "100%", backgroundColor: "#666666" }}>
            {
              Platform.OS === "web"
                ?
                <View style={{ flex: 1, height: "100%" }}>
                  {
                    this.state.windowWidth >= 900
                      ?
                      <ImageBackground source={backImage} style={{ height: "100%" }}>
                        <Text style={[styles.unscannedItemTitleWeb, { fontFamily: fontFamily.font600 }]}> {count} Unscanned Items</Text>
                        {
                          props.order && props.order.order && props.order.order.unscanned_items && props.order.order.unscanned_items.length > 0
                            ?
                            props.order.order.unscanned_items && props.order.order.unscanned_items.slice(0, perPage).map((item, index) => {
                              return (
                                <View style={{ margin: 1 }}>
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
                                                  { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }
                                                  :
                                                  { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }}
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
                                            <View style={{ backgroundColor: "#d3def4", paddingLeft: 3, paddingRight: 3 }}>
                                              <Text style={{ fontSize: 18, maxWidth: "75%" }}
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
                                            <View style={{ maxWidth: "75%", flexDirection: "row" }}>
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
                                                item.custom_product_1 !== null && item.custom_product_1 !== "" && item.custom_product_1 !== undefined &&
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
                                            <TouchableOpacity onPress={() => this.props.redirectToItemDetail(item)}>
                                              <Text numberOfLines={2}
                                                ellipsizeMode='tail'
                                                style={item.name && item.name.length <= 32
                                                  ?
                                                  { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", color: "#fff", lineHeight: "100%" }
                                                  :
                                                  { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", color: "#fff", lineHeight: "100%" }
                                                }
                                              >
                                                {item.name}
                                              </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0])}>
                                              <Text numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={{ fontSize: 18, fontFamily: fontFamily.font700, color: "#fff", width: '65%' }}>{item.sku}</Text>
                                            </TouchableOpacity>
                                          </View>
                                          {
                                            item.images.length > 0 && item.images[0].image &&
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
                                          }
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
                                                          { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }
                                                          :
                                                          { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }}>
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
                                                    <View style={{ backgroundColor: "#d3def4", paddingLeft: 3, paddingRight: 3 }}>
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
                                                        childItem.location !== null && childItem.location !== "" &&
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
                                                        childItem.custom_product_1 !== null && childItem.custom_product_1 !== "" &&
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
                              )
                            })
                            :
                            <View style={globalStyles.p_10}>
                              <Text style={styles.scannedItemNameText}>
                                No more item remaining to scan
                              </Text>
                            </View>
                        }
                        {
                          props.order.order.unscanned_items && props.order.order.unscanned_items.length >= perPage &&
                          <View>
                            {
                              props.order.order.unscanned_items && props.order.order.unscanned_items.length >= perPage
                                ?
                                <TouchableOpacity onPress={() => {
                                  let perPage = this.state.unscannedItemPerPage + 1
                                  this.setState({ unscannedItemPerPage: perPage })
                                }}>
                                  <Text style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    zIndex: 99999,
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: 1, height: 1 },
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: 8,
                                    background: "#41970f",
                                    marginRight: "auto",
                                    marginLeft: "auto",
                                    borderRadius: 5,
                                    marginTop: 2
                                  }}>
                                    Show More
                                  </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {
                                  let perPage = 1
                                  this.setState({ unscannedItemPerPage: perPage })
                                }}>
                                  <Text style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    zIndex: 99999,
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: 1, height: 1 },
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: 8,
                                    background: "#f54400",
                                    marginRight: "auto",
                                    marginLeft: "auto",
                                    borderRadius: 5,
                                    marginTop: 2
                                  }}>
                                    Reset
                                  </Text>
                                </TouchableOpacity>
                            }
                          </View>
                        }
                      </ImageBackground>
                      :
                      <View>
                        <View style={{ height: windowHeight - 70, width: "100%" }}>
                          <View style={styles.actionButtonsView}>
                            <LinearGradient
                              start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                              colors={['#000000', '#00000006', '#00000006', '#000000']}
                              style={{ position: "relative", backgroundColor: "#292929" }}>
                              <TouchableOpacity onLongPress={() => this.orderDetail(Order)}
                                delayLongPress={1000}
                                style={{ marginRight: 45, marginLeft: 45 }}>
                                <Text numberOfLines={1} ellipsizeMode='tail'
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
                              <LinearGradient
                                style={[styles.actionButtonInnerView, {
                                  backgroundColor: "#707070",
                                  borderRadius: 5
                                }]}
                                start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                colors={['#142130', '#304454']}>
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
                                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: 5 }}>

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
                                      <View style={{ flexDirection: "column", alignItems: "center" }}>
                                        <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Add</Text>
                                        <Text style={[styles.actionButtonText, { fontFamily: fontFamily.font500, lineHeight: "100%", color: "#fff" }]}>Note</Text>
                                      </View>
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
                            colors={['#142130', '#304454']}>
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
                              {
                                Order &&
                                  Order.unscanned_items &&
                                  Order.unscanned_items[0] &&
                                  Order.unscanned_items[0].product_type === "individual"
                                  ?
                                  <React.Fragment>
                                    <TextInput value={this.props.barcodeState}
                                      autoFocus={false}
                                      ref={this.props.InputField}
                                      onSubmitEditing={this.props.scanBarcode}
                                      onChangeText={this.props.stateUpdate}
                                      style={{ flex: 15, paddingLeft: 20, padding: 5, backgroundColor: "#ebebeb", fontSize: 15, fontFamily: fontFamily.font600, width: "100%", textAlign: "left", borderRadius: 5 }}
                                      placeholder={this.state.scanPlaceHolderValue}
                                      placeholderTextColor={"#4c4c4b"}
                                      onBlur={() => {
                                        const blurValue = Platform.OS === "web" ? "Click Here Before Scanning" : "Tap Here Before Scanning"
                                        this.setState({ scanPlaceHolderValue: blurValue })
                                      }}
                                      onFocus={() => this.setState({ scanPlaceHolderValue: 'Ready For Product Scan' })}
                                    />
                                    <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0], "unscan")}
                                      onLongPress={this.props.scanAllItem}
                                      delayLongPress={1000}
                                      style={{ flex: 4, marginLeft: 10, backgroundColor: "#455766", justifyContent: "center", alignItems: "center", paddingHorizontal: 7, borderRadius: 5 }}>
                                      <Text style={{ fontFamily: fontFamily.font800, fontSize: 26, color: "#fff", textAlign: "center" }}>Pass</Text>
                                    </TouchableOpacity>
                                  </React.Fragment>
                                  :
                                  <React.Fragment>
                                    <TextInput value={this.props.barcodeState}
                                      autoFocus={false}
                                      ref={this.props.InputField}
                                      onSubmitEditing={this.props.scanBarcode}
                                      onChangeText={this.props.stateUpdate}
                                      style={{ outline: "none", flex: 15, paddingLeft: 20, padding: 5, backgroundColor: "#ebebeb", fontSize: 15, fontFamily: fontFamily.font700, color: "black", width: "100%", textAlign: "left", borderWidth: 1, borderColor: "#cbcbca", borderRadius: 5 }}
                                      placeholder={this.state.scanPlaceHolderValue}
                                      placeholderTextColor={"#4c4c4b"}
                                      onBlur={() => {
                                        const blurValue = Platform.OS === "web" ? "Click Here Before Scanning" : "Tap Here Before Scanning"
                                        this.setState({ scanPlaceHolderValue: blurValue })
                                      }}
                                      onFocus={() => this.setState({ scanPlaceHolderValue: 'Ready For Product Scan' })}
                                    />
                                    <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0], "unscan")}
                                      onLongPress={this.props.scanAllItem}
                                      delayLongPress={1000}
                                      style={{ flex: 4, marginLeft: 10, backgroundColor: "#455766", justifyContent: "center", alignItems: "center", paddingHorizontal: 7, borderRadius: 5 }}>
                                      <Text style={{ fontFamily: fontFamily.font800, fontSize: 26, color: "#fff", textAlign: "center" }}>Pass</Text>
                                    </TouchableOpacity>
                                  </React.Fragment>
                              }
                            </View>
                          </LinearGradient>
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
                              <TouchableOpacity onPress={this.props.navButton} style={{ marginRight: 10, marginTop: 2 }}>
                                <Image style={{ width: 20, height: 20 }} source={downArrow} />
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>
                          <ScrollView>
                            {
                              props.scannedList && props.order && props.order.order && props.order.order.unscanned_items && props.order.order.unscanned_items.length > 0
                                ?
                                props.scannedList && props.order.order.unscanned_items && props.order.order.unscanned_items.slice(0, perPage).map((item, index) => {
                                  return (
                                    <View>
                                      {
                                        (item && item.product_type === "single") || (item && item.product_type === "depends")
                                          ?
                                          <View key={index} style={{ flexDirection: "row", position: "relative", backgroundColor: "#292929", textAlign: "left", display: "flex", marginTop: 5 }}>
                                            <View style={{ width: '100%', minHeight: 100 }}>
                                              <LinearGradient
                                                colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                                locations={[0, 0.34, 1]}
                                                style={{ flex: 16, padding: 4, borderTopLeftRadius: 12, borderTopEndRadius: 12 }}>
                                                <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(item)}
                                                  delayLongPress={1000}>
                                                  <Text numberOfLines={2}
                                                    style={item.name && item.name.length <= 32
                                                      ?
                                                      { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }
                                                      :
                                                      { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }}
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
                                                <View style={{ backgroundColor: "#d3def4", paddingLeft: 3, paddingRight: 3 }}>
                                                  <Text style={{ fontSize: 18, maxWidth: "75%", fontFamily: fontFamily.font400 }}
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
                                                <View style={{ width: "75%", flexDirection: "row" }}>
                                                  {
                                                    item.location !== null && item.location !== "" && item.location !== undefined &&
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
                                                    item.custom_product_1 !== null && item.custom_product_1 !== "" && item.custom_product_1 !== undefined &&
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
                                          <View key={index} style={{ margin: 1, borderRadius: 20, borderWidth: 3, borderColor: "black", backgroundColor: "#3f5163", padding: 5 }}>
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
                                                      { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", color: "#fff", lineHeight: "100%" }
                                                      :
                                                      { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", color: "#fff", lineHeight: "100%" }
                                                    }
                                                  >
                                                    {item.name}
                                                  </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0])}>
                                                  <Text numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{ fontSize: 18, fontFamily: fontFamily.font700, color: "#fff", width: '65%' }}>{item.sku}</Text>
                                                </TouchableOpacity>
                                              </View>
                                              {
                                                item.images.length > 0 && item.images[0].image &&
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
                                              }
                                            </View>
                                            {
                                              item && item.child_items && item.child_items.length > 0 && item.child_items.map((childItem, index) => {
                                                return (
                                                  <View key={index} style={{ flexDirection: "row", position: "relative", backgroundColor: "#3f5163", textAlign: "left", display: "flex", marginTop: 5 }}>
                                                    <View style={{ width: '100%', minHeight: 100 }}>
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
                                                              { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left" }}
                                                          >
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
                                                        <View style={{ backgroundColor: "#d3def4", paddingLeft: 3, paddingRight: 3 }}>
                                                          <Text numberOfLines={1}
                                                            ellipsizeMode='tail'
                                                            style={{ fontSize: 18, width: "75%", fontFamily: fontFamily.font400 }}>
                                                            {
                                                              childItem &&
                                                              childItem.barcodes.length > 0 &&
                                                              childItem.barcodes[0].barcode
                                                            }
                                                          </Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", width: "75%" }}>
                                                          {
                                                            childItem.location !== null && childItem.location !== "" &&
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
                                                            childItem.custom_product_1 !== null && childItem.custom_product_1 !== "" &&
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
                                  )
                                })
                                :
                                props.scannedList && <View style={globalStyles.p_10}>
                                  <Text style={styles.scannedItemNameText}>
                                    No more item remaining to scan
                                  </Text>
                                </View>
                            }
                            {
                              props.unscannedList &&
                              <React.Fragment>
                                {
                                  Order.scanned_items && Order.scanned_items.length > 0
                                    ?
                                    Order.scanned_items.map((item, index) => {
                                      return (
                                        <View>
                                          {
                                            <View key={index} style={{ flexDirection: "row", position: "relative", backgroundColor: "#292929", textAlign: "left", display: "flex", marginTop: 5 }}>
                                              <View style={{ width: '100%', minHeight: 100 }}>
                                                <LinearGradient
                                                  colors={['#b6c2d2', '#ddedfc', '#dceafc']}
                                                  locations={[0, 0.34, 1]}
                                                  style={{ flex: 16, padding: 4, borderTopLeftRadius: 12, borderTopEndRadius: 12 }}>
                                                  <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(item)}
                                                    delayLongPress={1000}>
                                                    <Text numberOfLines={2}
                                                      style={item.name && item.name.length <= 32
                                                        ?
                                                        { fontSize: 18, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }
                                                        :
                                                        { fontSize: 16, fontFamily: fontFamily.font400, width: "65%", textAlign: "left", lineHeight: "100%" }}
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
                                                  <View style={{ width: "75%", flexDirection: "row" }}>
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
                                                  <Text style={{ fontSize: 20, width: "75%", fontFamily: fontFamily.font400 }}
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
                                                  }}>
                                                  <Text style={{ width: '90%', position: "absolute", textAlign: "center", fontSize: 18, fontFamily: fontFamily.font600, backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                                    {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                                  </Text>
                                                  <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
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
                                  props.localLogs && props.localLogs.length > 0
                                    ?
                                    props.localLogs && props.localLogs.slice(0).reverse().map((log, index) => {
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
                            {/* {
                              props.order.order.unscanned_items && props.order.order.unscanned_items.length >= perPage
                                ?
                                <TouchableOpacity onPress={() => {
                                  let perPage = this.state.unscannedItemPerPage + 1
                                  this.setState({ unscannedItemPerPage: perPage })
                                }}>
                                  <Text style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    zIndex: 99999,
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: 1, height: 1 },
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: 8,
                                    background: "#41970f",
                                    marginRight: "auto",
                                    marginLeft: "auto",
                                    borderRadius: 5,
                                    marginTop: 2
                                  }}>
                                    Show More
                                  </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {
                                  let perPage = 1
                                  this.setState({ unscannedItemPerPage: perPage })
                                }}>
                                  <Text style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    zIndex: 99999,
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: 1, height: 1 },
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: 8,
                                    background: "#f54400",
                                    marginRight: "auto",
                                    marginLeft: "auto",
                                    borderRadius: 5,
                                    marginTop: 2
                                  }}>
                                    Reset
                                  </Text>
                                </TouchableOpacity>
                            } */}
                          </ScrollView>
                        </View>
                      </View>
                  }
                </View>
                :
                <View>
                  <View style={{ height: windowHeight - 90, width: "100%" }}>
                    <View style={styles.actionButtonsView}>
                      <View style={{ position: "relative" }}>
                        <TouchableOpacity onPress={() => this.orderDetail(Order)}
                          style={{ marginRight: 45, marginLeft: 45 }}>
                          <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.nowScanningTextView, { textAlign: "center", margin: 8 }]}>
                            {Order.increment_id}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                          let actionBarShow = !this.state.actionBarShow
                          this.setState({ actionBarShow })
                        }
                        }
                          style={{ position: "absolute", right: 10 }}>
                          <Image style={[styles.nowScanningTextView, { textAlign: "center", marginBottom: 8, marginTop: 8 }]} source={toggle ? toggle : ""} />
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
                        {
                          Order &&
                            Order.unscanned_items &&
                            Order.unscanned_items[0] &&
                            Order.unscanned_items[0].product_type === "individual"
                            ?
                            <React.Fragment>
                              <TextInput value={this.props.barcodeState}
                                autoFocus={false}
                                ref={this.props.InputField}
                                onSubmitEditing={this.props.scanBarcode}
                                onChangeText={this.props.stateUpdate}
                                style={{ outline: "none", flex: 15, paddingLeft: 20, padding: 5, backgroundColor: "#cbcbca", fontSize: 15, fontFamily: fontFamily.font700, color: "black", width: "100%", textAlign: "left", borderWidth: 1, borderColor: "#cbcbca", borderRadius: 5 }}
                                placeholder="Ready For Product Scan"
                                placeholderTextColor={"#4c4c4b"}
                              />
                              <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0], "unscan")}
                                onLongPress={this.props.scanAllItem}
                                delayLongPress={1000}
                                style={{ flex: 4, marginLeft: 5, backgroundColor: "#41970f", textTransform: "uppercase", justifyContent: "center", alignItems: "center", padding: 5, borderRadius: 5 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff", textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textAlign: "center", fontSize: 20 }}>Pass</Text>
                              </TouchableOpacity>
                            </React.Fragment>
                            :
                            <React.Fragment>
                              <TextInput value={this.props.barcodeState}
                                autoFocus={false}
                                ref={this.props.InputField}
                                onSubmitEditing={this.props.scanBarcode}
                                onChangeText={this.props.stateUpdate}
                                style={{ flex: 15, paddingLeft: 20, padding: 5, backgroundColor: "#cbcbca", fontSize: 15, fontWeight: "bold", color: "black", width: "100%", textAlign: "left", borderWidth: 1, borderColor: "#cbcbca", borderRadius: 5 }}
                                placeholder="Ready For Product Scan"
                                placeholderTextColor={"#4c4c4b"}
                              />
                              <TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0], "unscan")}
                                onLongPress={this.props.scanAllItem}
                                delayLongPress={1000}
                                style={{ flex: 4, marginLeft: 5, backgroundColor: "#41970f", textTransform: "uppercase", justifyContent: "center", alignItems: "center", padding: 5, borderRadius: 5 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 20, color: "#fff", textShadowColor: '#000', textShadowOffset: { width: 1, height: 1 }, textAlign: "center", fontSize: 20 }}>Pass</Text>
                              </TouchableOpacity>
                            </React.Fragment>
                        }
                      </View>
                    </View>
                    <ScrollView>
                      {
                        props.order && props.order.order && props.order.order.unscanned_items && props.order.order.unscanned_items.length > 0
                          ?
                          props.order.order.unscanned_items && props.order.order.unscanned_items.map((item, index) => {
                            return (
                              <View>
                                {
                                  (item && item.product_type === "single") || (item && item.product_type === "depends")
                                    ?
                                    <View key={index} style={{ flexDirection: "row", margin: 0, borderRadius: 30, borderWidth: 4, backgroundColor: "#336598", borderColor: "black", padding: 10 }}>
                                      <View style={{ flex: 20 }}>
                                        <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(item)}
                                          delayLongPress={1000}
                                          style={{ backgroundColor: "#fff", padding: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                          <Text numberOfLines={2}
                                            style={item.name && item.name.length <= 32
                                              ?
                                              { fontSize: 20, maxWidth: "75%" }
                                              :
                                              { fontSize: 16, maxWidth: "75%" }}
                                          >
                                            {item.name}
                                          </Text>
                                        </TouchableOpacity>
                                        <Text numberOfLines={1}
                                          ellipsizeMode='tail'
                                          style={{ color: "#fff", fontSize: 20, fontWeight: "600", maxWidth: "70%" }}
                                        >
                                          {item.sku}
                                        </Text>
                                        <View style={{ backgroundColor: "#95b0e5", paddingLeft: 3, paddingRight: 3 }}>
                                          <View style={{ maxWidth: "70%", flexDirection: "row" }}>
                                            {
                                              item.location !== null && item.location !== "" && item.location !== undefined &&
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
                                              item.custom_product_1 !== null && item.custom_product_1 !== "" && item.custom_product_1 !== undefined &&
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
                                          <Text style={{ fontSize: 20, maxWidth: "75%" }}
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
                                    <View key={index} style={{ margin: 0, borderRadius: 30, borderWidth: 4, borderColor: "black", backgroundColor: "#3f5163", padding: 10 }}>
                                      <View style={{ flexDirection: "row" }}>
                                        <View style={{ height: 5, flex: 8, backgroundColor: "#fff", borderRadius: 3, position: "relative" }}>
                                          <Text style={{ fontSize: 18, fontWeight: "bold", position: "absolute", left: "50%", top: -7, marginLeft: "auto", marginRight: "auto", backgroundColor: "#3f5163", paddingLeft: 4, paddingRight: 4, color: "#fff" }}>
                                            KIT
                                          </Text>
                                        </View>
                                        <View style={{ flex: 2 }}>
                                          <Text style={{ textAlign: "center", color: "#fff", fontSize: 18, marginTop: -6, fontWeight: "bold" }}>{item.scanned_qty}/{item.qty_remaining + item.scanned_qty}</Text>
                                        </View>
                                      </View>
                                      <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 8 }}>
                                          <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(item)}
                                            delayLongPress={1000}>
                                            <Text numberOfLines={2}
                                              ellipsizeMode='tail'
                                              style={{ fontSize: 16, color: "#fff", fontWeight: "600", paddingRight: 3, paddingLeft: 3 }}
                                            >
                                              {item.name}
                                            </Text>
                                          </TouchableOpacity>
                                          {/*<TouchableOpacity onPress={() => this.props.clickScan(Order.unscanned_items[0].child_items[0]) }>*/}
                                          <Text numberOfLines={1}
                                            ellipsizeMode='tail'
                                            style={{ fontSize: 20, color: "#fff", fontWeight: "600", paddingRight: 3, paddingLeft: 3, marginBottom: 2 }}>{item.sku}</Text>
                                          {/*</TouchableOpacity>*/}
                                        </View>
                                        {
                                          item.images.length > 0 && item.images[0].image &&
                                          <View style={{ flex: 2, borderRadius: 12, borderWidth: 12, maxHeight: 100, borderColor: "#3f5163" }}>
                                            <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                              style={{ height: "100%", width: "100%", resizeMode: 'contain', borderRadius: 12 }} />
                                          </View>
                                        }
                                      </View>
                                      {
                                        item && item.child_items && item.child_items.length > 0 && item.child_items.map((childItem, index) => {
                                          return (
                                            <View key={index} style={{ flexDirection: "row", marginBottom: 5, backgroundColor: "#fff", borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                                              <View style={{ flex: 20 }}>
                                                <View style={{ backgroundColor: "#fff" }}></View>
                                                <TouchableOpacity onLongPress={() => this.props.redirectToItemDetail(childItem)}
                                                  delayLongPress={1000}
                                                  style={{ backgroundColor: "#fff", paddingLeft: 5, paddingTop: 10 }}>
                                                  <Text numberOfLines={2}
                                                    ellipsizeMode='tail'
                                                    style={childItem.name && childItem.name.length <= 32
                                                      ?
                                                      { fontSize: 20, width: "75%" }
                                                      :
                                                      { fontSize: 16, width: "75%" }
                                                    }
                                                  >
                                                    {childItem.name}
                                                  </Text>
                                                </TouchableOpacity>
                                                <Text numberOfLines={1}
                                                  ellipsizeMode='tail'
                                                  style={{ backgroundColor: "#3f5163", color: "#fff", fontSize: 20, fontWeight: "600", width: "75%" }}
                                                >
                                                  {childItem.sku}
                                                </Text>
                                                <View style={{ backgroundColor: "#a4b4c5", height: 25 }}>
                                                  <View style={{ flexDirection: "row", width: "65%" }}>
                                                    {
                                                      childItem.location !== null && childItem.location !== "" &&
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
                                                      childItem.custom_product_1 !== null && childItem.custom_product_1 !== "" &&
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
                                                <View style={{ backgroundColor: "#cdd7e2", borderBottomRightRadius: 20 }}>
                                                  <Text numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{ width: "75%", fontSize: 20 }}>
                                                    {
                                                      childItem &&
                                                      childItem.barcodes.length > 0 &&
                                                      childItem.barcodes[0].barcode
                                                    }
                                                  </Text>
                                                </View>
                                              </View>
                                              <View style={{ flex: 5, borderBottomRightRadius: 12, paddingTop: 10, position: "absolute", width: "25%", right: 0, top: 0, bottom: 0 }}>
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
                    </ScrollView>
                  </View>
                </View>
            }
          </View>
        }
      </React.Fragment>
    )
  }
}
