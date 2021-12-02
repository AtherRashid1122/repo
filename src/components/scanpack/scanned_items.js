import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, Platform, ScrollView } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import { LinearGradient } from 'expo-linear-gradient';
import backImage from "../../../assets/bg_right.png";
import placeholder from "../../../assets/placeholder.png";
import { fontFamily } from '../../helpers/fontFamily';

let count = 0

export default class ScannedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      scannedItemPerPage: 1
    };
  }
  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    let props = this.props;
    let localCount = 0
    this.props.order &&
      this.props.order.order &&
      this.props.order.order.scanned_items &&
      this.props.order.order.scanned_items.length > 0 &&
      this.props.order.order.scanned_items.map((item) => {
        localCount = localCount + item.scanned_qty
      }
      )
    count = localCount
    let perPage = this.state.scannedItemPerPage * 10
    return (
      <View style={Platform.OS === "web" ? styles.scannedItemContainerWeb : styles.scannedItemContainer}>
        {
          Platform.OS === "web"
            ?
            <View style={{ flex: 1 }}>
              {
                windowWidth >= 900
                  ?
                  <ImageBackground source={backImage} style={{ height: "100%" }}>
                    <Text style={[styles.scannedItemTextWeb, { fontFamily: fontFamily.font600 }]}>{count} Scanned Items</Text>
                    {
                      props.order && props.order.order && props.order.order.scanned_items.length > 0
                        ?
                        <View >
                          {
                            props.order.order.scanned_items.slice(0, perPage).map((item, index) => {
                              return (
                                <View key={index + 1}>
                                  {
                                    item.scanned_qty > 0
                                    &&
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
                                              item.location !== null && item.location !== "" && item.location !== undefined &&
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
                                  }
                                </View>
                              )
                            })
                          }
                        </View>
                        :
                        <View style={globalStyles.p_10}>
                          <Text style={styles.scannedItemNameText}>
                            Item not available in the scanned list
                          </Text>
                        </View>
                    }
                    {
                      props.order.order.scanned_items && props.order.order.scanned_items.length >= perPage &&
                      <View>
                        {
                          props.order.order.scanned_items && props.order.order.scanned_items.length >= perPage
                            ?
                            <TouchableOpacity onPress={() => {
                              let perPage = this.state.scannedItemPerPage + 1
                              this.setState({ scannedItemPerPage: perPage })
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
                              this.setState({ scannedItemPerPage: perPage })
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
                    <TouchableOpacity onPress={props.navButton}
                      style={{
                        position: "fixed",
                        top: "35%",
                        backgroundColor: "rgba( 225 ,225 ,225 , 0.7)",
                        writingMode: "vertical-rl",
                        left: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        zIndex: 999,
                        height: 150,
                        textAlign: "center"
                      }}
                    >
                      <Text style={{ color: "#000", padding: 15 }}>Scan & Pack</Text>
                    </TouchableOpacity>
                    <View style={{ height: windowHeight - 90, width: "100%" }}>
                      {
                        props.order && props.order.order && props.order.order.scanned_items.length > 0
                          ?
                          props.order.order.scanned_items.map((item, index) => {
                            return (
                              <React.Fragment key={index}>
                                {
                                  item.scanned_qty > 0
                                  &&
                                  <View key={index} style={{ flexDirection: "row", margin: 1, borderRadius: 20, borderWidth: 4, backgroundColor: "#336598", borderColor: "black", padding: 10 }}>
                                    <View style={{ flex: 20 }}>
                                      <TouchableOpacity style={{ backgroundColor: "#fff", paddingLeft: 5, paddingRight: 5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                        <Text numberOfLines={2}
                                          style={item.name && item.name.length <= 32
                                            ?
                                            { fontSize: 20, maxWidth: "75%", lineHeight: "100%" }
                                            :
                                            { fontSize: 16, maxWidth: "75%", lineHeight: "100%" }}
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
                                        <View style={{ maxWidth: "75%", flexDirection: "row" }}>
                                          {
                                            item.location !== null && item.location !== "" && item.location !== undefined &&
                                            <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                              <Text style={{ fontSize: 12 }}>L1:</Text>
                                              <Text numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={{ fontSize: 15, fontWeight: "bold" }}
                                              >
                                                {item.location}
                                              </Text>
                                            </View>
                                          }
                                          {
                                            item.custom_product_1 !== null && item.custom_product_1 !== "" && item.custom_product_1 !== undefined &&
                                            <View style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
                                              <Text style={{ fontSize: 12 }}>C1:</Text>
                                              <Text numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={{ fontSize: 15, fontWeight: "bold" }}
                                              >
                                                {item.custom_product_1}
                                              </Text>
                                            </View>
                                          }
                                        </View>
                                      </View>
                                      <View style={{ backgroundColor: "#d3def4", paddingRight: 3, paddingLeft: 3, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
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

                                    <View style={{ flex: 5, borderBottomRightRadius: 10, borderTopRightRadius: 10, position: "absolute", right: 4, width: "25%", height: "100%", bottom: 0 }}>
                                      <View style={{ backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10, elevation: 3, borderRadius: 10, borderWidth: 4, borderColor: "#336598", height: "100%" }}>
                                        <Text style={{ position: "absolute", textAlign: "center", fontSize: 18, fontWeight: "600", backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, borderRadius: 10, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                          {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                        </Text>
                                        <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                          style={{ height: "100%", width: "100%", resizeMode: 'contain', borderRadius: 10 }} />
                                      </View>
                                    </View>
                                  </View>
                                }
                              </React.Fragment>
                            )
                          })
                          :
                          <View style={globalStyles.p_10}>
                            <Text style={styles.scannedItemNameText}>
                              Item not available in the scanned list
                            </Text>
                          </View>
                      }
                      {
                        props.order.order.scanned_items && props.order.order.scanned_items.length >= perPage &&
                        <View>
                          {
                            props.order.order.scanned_items && props.order.order.scanned_items.length >= perPage
                              ?
                              <TouchableOpacity onPress={() => {
                                let perPage = this.state.scannedItemPerPage + 1
                                this.setState({ scannedItemPerPage: perPage })
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
                                this.setState({ scannedItemPerPage: perPage })
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
                    </View>
                  </View>
              }
            </View>
            :
            <View style={{ height: windowHeight - 90, width: "100%" }}>
              {
                props.order && props.order.order && props.order.order.scanned_items.length > 0
                  ?
                  props.order.order.scanned_items.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        {
                          item.scanned_qty > 0
                          &&
                          <View key={index} style={{ flexDirection: "row", margin: 0, borderRadius: 30, borderWidth: 4, backgroundColor: "#336598", borderColor: "black", padding: 10 }}>
                            <View style={{ flex: 20 }}>
                              <TouchableOpacity style={{ backgroundColor: "#fff", padding: 5, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <Text numberOfLines={2}
                                  style={item.name && item.name.length <= 32
                                    ?
                                    { fontSize: 20, maxWidth: "75%", lineHeight: "100%" }
                                    :
                                    { fontSize: 16, maxWidth: "75%", lineHeight: "100%" }}
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

                            <View style={{ flex: 5, borderBottomRightRadius: 12, borderTopRightRadius: 12, position: "absolute", right: 6, width: "25%", height: "100%", bottom: 0 }}>
                              <View style={{ backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: -5, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, borderRadius: 12, borderWidth: 8, borderColor: "#336598", height: "100%" }}>
                                <Text style={{ position: "absolute", textAlign: "center", fontSize: 18, fontWeight: "600", backgroundColor: "#fff", opacity: 0.7, bottom: 0, right: 0, left: 0, marginLeft: "auto", marginRight: "auto", zIndex: 999 }}>
                                  {item.scanned_qty}/{item.qty_remaining + item.scanned_qty}
                                </Text>
                                <Image source={{ uri: item.images && item.images.length > 0 ? item.images[0].image : placeholder }}
                                  style={{ height: "100%", width: "100%", resizeMode: 'contain', borderRadius: 12 }} />
                              </View>
                            </View>
                          </View>
                        }
                      </React.Fragment>
                    )
                  })
                  :
                  <View style={globalStyles.p_10}>
                    <Text style={styles.scannedItemNameText}>
                      Item not available in the scanned list
                    </Text>
                  </View>
              }
            </View>
        }
      </View>
    );
  }
}
