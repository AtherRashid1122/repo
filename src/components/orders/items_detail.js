import React, { Component } from 'react';
import { View, Text , TextInput , Image ,TouchableOpacity , Platform ,ScrollView} from 'react-native';
import styles from '../../style/orderdetail';
import { connect } from 'react-redux';
import { UpdateOrderQuantity } from "../../actions/orderActions"
import restart from "../../../assets/1024x1024.png"

class ItemsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      unTouch: true
    };
  }

  render() {
    let items = this.props.items && this.props.items.items
    return (
      <ScrollView style={styles.itemDetailContainer}>
        {
          Platform.OS === "web"
          ?
            <React.Fragment>
              <View style={{flex: 1 , flexDirection: "row"}}>
                <View style={{flex: 2 , flexDirection: "row" ,justifyContent: "flex-start" , margin: 5 , marginLeft: 10}}>
                  <TouchableOpacity onPress={() => this.props.addOrderItem(items)} style={{marginRight: 10 , borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , borderRadius: 30 , backgroundColor: "#336599"}}>
                    <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Add Item</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.removeItems()} 
                                    style={ this.props.removeIds && this.props.removeIds.length > 0 
                                            ? 
                                            { marginRight: 10 ,
                                              borderWidth: 1 ,
                                              borderStyle: "solid" ,
                                              borderColor: "#336597" ,
                                              borderRadius: 30 ,
                                              backgroundColor: "#961F1F"
                                            }
                                            :
                                            { marginRight: 10 ,
                                              borderWidth: 1 ,
                                              borderStyle: "solid" ,
                                              borderColor: "#336597" ,
                                              borderRadius: 30 ,
                                              backgroundColor: "#c48787"}
                                            }
                                            >
                    <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Remove selected items</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 2 ,flexDirection: "row" , justifyContent: "flex-end" , margin: 5}}>
                  <TouchableOpacity onPress={() => this.props.updateBasicInfo()} style={{marginRight: 10 , borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , borderRadius: 30 , backgroundColor: "#494848" , height: 40}}>
                    <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 10 ,
                                             borderWidth: 1 ,
                                             borderStyle: "solid" ,
                                             borderColor: "#336597" ,
                                             borderRadius: 30 ,
                                             backgroundColor: "#336599" ,
                                             height: 40}}
                                    onPress={() => this.props.updateBasicInfo()}         
                                    >
                    <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Save & Close</Text>
                  </TouchableOpacity>
                </View>
              </View>  
              {
                items && items.length > 0 && items.map((item , index) => {
                  return(
                      <View key={index} style={this.props.removeIds.includes(item.iteminfo.id) ? [styles.itemBox , {backgroundColor: "#799cbf"}] : styles.itemBox}>
                        <View style={styles.labelBox}>
                          <Text style={styles.label}>Name</Text>
                          <TouchableOpacity style={styles.value} onPress={() => this.props.removeOrderItem(item) }>
                            <Text>{item.productinfo.name}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.labelBox}>
                          <Text style={styles.label}>Quantity</Text>
                          <TextInput style={styles.value}
                                     value={item.iteminfo.qty}
                                     onChangeText={(text) => this.props.handleChange(text , item)}
                                     onBlur={() => this.props.updateQuantity(item)}
                                     // onBlur={this.props.updateQuantity(item)}
                          />
                        </View>
                        <View style={styles.labelBox}>
                          <Text style={styles.label}>Status</Text>
                          <Text style={styles.value}>{item.productinfo.status}</Text>
                        </View>
                        <View style={styles.labelBox}>
                          <Text style={styles.label}>Sku</Text>
                          <Text style={styles.value}>{item.sku}</Text>
                        </View>
                        <View style={styles.labelBox}>
                          <Text style={styles.label}>Barcode</Text>
                          <Text style={styles.value}>{item.barcode}</Text>
                        </View>
                      </View>
                    )
                })
              }
            </React.Fragment>
          :
            <React.Fragment>
              <View style={{flex: 1 , flexDirection: "row"}}>
                <View style={{flex: 2 , flexDirection: "row" ,justifyContent: "flex-start" , margin: 5 , marginLeft: 10}}>
                  <TouchableOpacity onPress={() => this.props.addOrderItem(items)} style={{borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , backgroundColor: "#336599", justifyContent: "center"}}>
                    <Text style={{color: "white" , padding: 4 , fontSize: 13 , fontWeight: "bold"}}>Add Item</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.props.removeItems()} 
                                    style={ this.props.removeIds && this.props.removeIds.length > 0 
                                            ? 
                                            { marginRight: 2 ,
                                              borderWidth: 1 ,
                                              borderStyle: "solid" ,
                                              borderColor: "#336597",
                                              backgroundColor: "#961F1F",
                                              justifyContent: "center"
                                            }
                                            :
                                            { marginRight: 2 ,
                                              borderWidth: 1 ,
                                              borderStyle: "solid" ,
                                              borderColor: "#336597" ,
                                              backgroundColor: "#c48787" , 
                                              justifyContent: "center"}
                                            }
                                            >
                    <Text style={{color: "white" , padding: 4 , fontSize: 13 ,fontWeight: "bold"}}>Remove selected</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 2 ,flexDirection: "row" , justifyContent: "flex-end" , margin: 5}}>
                  <TouchableOpacity onPress={() => this.props.updateBasicInfo()} style={{ borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , backgroundColor: "#494848", justifyContent:"center"}}>
                    <Text style={{color: "white" , padding: 4 , fontSize: 13 ,fontWeight: "bold"}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 10 ,
                                             borderWidth: 1 ,
                                             borderStyle: "solid" ,
                                             borderColor: "#336597" ,
                                             backgroundColor: "#336599" ,
                                             justifyContent: "center"
                                           }}
                                    onPress={() => this.props.updateBasicInfo()}         
                                    >
                    <Text style={{color: "white" , padding: 4 , fontSize: 13  ,fontWeight: "bold"}}>Save & Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {
                items && items.length > 0 && items.map((item , index) => {
                  return(
                      <View key={index} style={this.props.removeIds.includes(item.iteminfo.id) && {backgroundColor: "#799cbf"} }>
                        <View style={{flex: 1 , flexDirection: "row" , borderWidth: 1 , borderColor: "#000" , borderRadius: 10 , width: "96%" , marginLeft: "auto" , marginRight: "auto" , padding: 5}}>
                          <View style={{width: "20%"}}>
                            <TouchableOpacity onPress={() => this.props.removeOrderItem(item) }>
                              <Image style={{ position: "relative" , width: "100%" , height: "100%" , resizeMode: 'contain' , marginBottom: 2}} source={{uri: item.image !== null ? item.image : ""}} />
                            </TouchableOpacity>
                          </View>
                          <View style={{width: "80%"}}>
                            <View style={{flex: 1 , flexDirection: "row" , alignItem: "center"}}>
                              <View style={{flex: 2 , flexDirection: "row"}}>
                                <Text style={{padding: 5}}>QTY</Text>
                                <TextInput keyboardType = 'numeric' 
                                           style={{borderWidth: 1 , borderRadius: 10 , width: 50 , paddingLeft: 10 , paddingRight: 5}} 
                                           value={item.iteminfo.qty && JSON.stringify(item.iteminfo.qty)}
                                           onChangeText={(text) => this.props.handleChange(text , item)}
                                           onBlur={() => this.props.updateQuantity(item)}
                                />
                              </View>
                              <View style={{flex: 4 , justifyContent: "center"}}>  
                                <TouchableOpacity style={styles.value} onPress={() => this.props.removeOrderItem(item) }>
                                  <Text numberOfLines={1} ellipsizeMode='tail'> {item.productinfo.name} </Text>
                                </TouchableOpacity>  
                              </View>
                            </View>

                            <TouchableOpacity onPress={() => this.props.removeOrderItem(item) }>  
                              <View style={{flex: 1 , flexDirection: "row" , alignItem: "center"}}>
                                <View style={{flex: 2 , flexDirection: "row"}}>
                                  <Text numberOfLines={1} ellipsizeMode='tail' style={{padding: 5}}>{item.sku}</Text>
                                </View>
                                <View style={{flex: 2 , flexDirection: "row"}}>
                                  {
                                    item.productinfo.custom_product_1 !== "" && 
                                      <Text numberOfLines={1} ellipsizeMode='tail' style={{padding: 5}}>C1: {item.productinfo.custom_product_1}</Text>
                                  }
                                </View>
                                <View style={{flex: 4 , justifyContent: "center"}}>  
                                  <Text numberOfLines={1} ellipsizeMode='tail'> {item.barcode} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>

                          </View>
                        </View>
                      </View>
                    )
                })
              }
            </React.Fragment>
        }  
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = {
  UpdateOrderQuantity
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsDetail)
