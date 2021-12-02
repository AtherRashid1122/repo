import React, { Component } from 'react';
import { View, Text, Picker ,TextInput , Switch , TouchableOpacity ,Platform , ScrollView} from 'react-native';

export default class ScanpackOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  callBarcode = () => {
    this.props.updateProductSBC(this.props.barcodes , "barcode", false)
  }

  render() {
    let {barcodes , basicinfo} =  this.props
    return (
      <ScrollView style={{width: "100%" , marginBottom: 0 }}>
      {
        basicinfo &&
        <>
        {
          Platform.OS === "web"
          ?
            <React.Fragment>
              <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
                <View style={{margin: 10}}>
                  <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                    Packing options
                  </Text>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Packing placement
                        </Text>
                        <TextInput style={{flex: 2 , color: "black" , backgroundColor: "white" , padding: 10 , borderRadius: 20 , borderWidth: 1 }}
                                   value={basicinfo.packing_placement}
                                   keyboardType={'numeric'}
                                   onChangeText={(text, name) => this.props.productInfoHandleChange(text , "packing_placement")}
                                   />
                      </View>
                      <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 1 ,padding: 10}}>
                          Packing Instructions Confirmation
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Text>{basicinfo.packing_instructions_conf}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Special instructions for Packer
                        </Text>
                        <TextInput style={{flex: 2 , marginLeft: 10 , marginRight: 10 ,color: "black" ,
                                           backgroundColor: "white" , padding: 10 , borderRadius: 20 , borderWidth: 1
                                          }}
                                   value={basicinfo.packing_instructions}
                                   onChangeText={(text, name) => this.props.productInfoHandleChange(text , "packing_instructions")}
                                   />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Product can be skipped
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center" }}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.is_skippable ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{ borderWidth: 1 , borderRadius: 20 }}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "is_skippable")}
                            value={basicinfo.is_skippable}
                          />
                        </View>
                      </View>
                      <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 1 ,padding: 10}}>
                          Add to any order
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.add_to_any_order ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "add_to_any_order")}
                            value={basicinfo.add_to_any_order}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Record Serial Number 1
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.record_serial ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "record_serial")}
                            value={basicinfo.record_serial}
                          />
                        </View>
                      </View>
                      <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 1 ,padding: 10}}>
                          Intangible Item
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.is_intangible ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "is_intangible")}
                            value={basicinfo.is_intangible}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Record Serial Number 2
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.second_record_serial ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "second_record_serial")}
                            value={basicinfo.second_record_serial}
                          />
                        </View>
                      </View>
                      <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 1 ,padding: 10}}>
                          Type-In Count Setting
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Picker
                            selectedValue={basicinfo.type_scan_enabled}
                            style={{ height: 30, width: "auto" }}
                            onValueChange={(itemValue, itemIndex) => this.props.productInfoHandleChange(itemValue , "type_scan_enabled")}
                          >
                            {
                              this.props.pickerSelectedOptions.map((option , index) => {
                                return(
                                    <Picker.Item label={option.label} value={option.value} />
                                  )
                              })
                            }  
                          </Picker>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 , width: "50%" }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                        Click Scanning Setting
                      </Text>
                      <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                        <Picker
                          selectedValue={basicinfo.click_scan_enabled}
                          style={{ height: 30, width: "auto" }}
                          onValueChange={(itemValue, itemIndex) => this.props.productInfoHandleChange(itemValue , "click_scan_enabled")}
                        >
                          {
                            this.props.pickerSelectedOptions.map((option , index) => {
                              return(
                                  <Picker.Item label={option.label} value={option.value} />
                                )
                            })
                          }  
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
                <View style={{margin: 10}}>
                  <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                    Multi-pack Barcodes
                  </Text>
                  {
                    barcodes.length > 0 && barcodes.map((code , index) => {
                      return(
                          <View key={index} style={{margin: 10 , justifyContent: "center"}}>
                            <View style={{flexDirection: "row"}}>
                              <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                                <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>Multi-pack Barcode {index+1}</Text>
                                <TextInput style={{flex: 2 , color: "black" , backgroundColor: "white" , padding: 10 , borderRadius: 20 , borderWidth: 1 }}
                                           value={code.barcode}
                                           onChangeText={(text) => this.props.multiBarcode(text, "barcode" , index)} 
                                           onBlur={(e) => this.callBarcode(e)} 
                                         />
                              </View>
                              <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                                <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 ,padding: 10}}>Pack Count </Text>
                                <TextInput style={{flex: 2 , color: "black" , backgroundColor: "white" , padding: 10 , borderRadius: 20 , borderWidth: 1 }}
                                           value={code.packing_count}
                                           keyboardType="numeric"
                                           onChangeText={(text) => this.props.multiBarcode(text, "packing_count" , index )} 
                                           onBlur={(e) => this.callBarcode(e)}                                 
                                           />
                              </View>
                            </View>
                          </View>
                        )
                    })
                  }
                  <View>
                    <TouchableOpacity style={{flexDirection: "row", marginLeft: 20 , marginRight: 20 }} onPress={() => {this.props.addMultiBarcode()}}>
                      <View style={{backgroundColor: "gray" , paddingTop: 2 , paddingBottom: 2 , paddingLeft: 5 , paddingRight: 5 , borderRadius: 2 , justifyContent: "center"}}>
                        <Text style={{fontWeight: "900" , fontSize: 15 , color: "#fff"}}>+</Text>
                      </View>
                      <View style={{justifyContent: "center"}}>
                        <Text style={{marginLeft: 10}}>Add another</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
                <View style={{margin: 10}}>
                  <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                    Custom Product Fields
                  </Text>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Custom Product Data 1
                        </Text>
                        <TextInput style={{flex: 2 , color: "black" , backgroundColor: "white" , padding: 10 , borderRadius: 20 , borderWidth: 1 }}
                                   value={basicinfo.custom_product_1}
                                   onChangeText={(text, name) => this.props.productInfoHandleChange(text, "custom_product_1" )}
                                   />
                      </View>
                      <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 1 ,padding: 10}}>
                          Display During Packing
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.custom_product_display_1 ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "custom_product_display_1")}
                            value={basicinfo.custom_product_display_1}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Custom Product Data 2
                        </Text>
                        <TextInput style={{flex: 2 , color: "black" , backgroundColor: "white" , padding: 10 ,borderRadius: 20 , borderWidth: 1 }}
                                   value={basicinfo.custom_product_2}
                                   onChangeText={(text, name) => this.props.productInfoHandleChange(text, "custom_product_2" )}
                                   />
                      </View>
                      <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 1 ,padding: 10}}>
                          Display During Packing
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.custom_product_display_2 ? "#17C017" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "custom_product_display_2")}
                            value={basicinfo.custom_product_display_2}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row" , flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Custom Product Data 3
                        </Text>
                        <TextInput style={{flex: 2 , color: "black" , backgroundColor: "white" , padding: 10 ,borderRadius: 20 , borderWidth: 1 }}
                                   value={basicinfo.custom_product_3}
                                   onChangeText={(text, name) => this.props.productInfoHandleChange(text, "custom_product_3" )}
                                   />
                      </View>
                      <View style={{flexDirection: "row" , flex: 2 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 1 ,padding: 10}}>
                          Display During Packing
                        </Text>
                        <View style={{flex: 1 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.custom_product_display_3 ? "#17C017" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "custom_product_display_3")}
                            value={basicinfo.custom_product_display_3}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </React.Fragment>
          :  
            <React.Fragment>
              <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
                <View style={{margin: 10}}>
                  <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                    Packing options
                  </Text>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 ,  margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                        Packing placement
                      </Text>
                      <TextInput style={{flex: 2 , color: "black" , backgroundColor: "white" , padding: 10 , borderRadius: 20 , borderWidth: 1 }}
                                 value={basicinfo.packing_placement}
                                 keyboardType={'numeric'}
                                 onChangeText={(text, name) => this.props.productInfoHandleChange(text , "packing_placement")}
                                 />
                    </View>
                    <View style={{flexDirection: "row" , flex: 1 , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 ,padding: 10}}>
                        Packing Instructions Confirmation
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center"}}>
                        <Text>{basicinfo.packing_instructions_conf}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flex: 2 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 2 , padding: 10}}>
                          Special instructions for Packer
                        </Text>
                        <TextInput style={{flex: 2 , marginLeft: 10 , marginRight: 10 ,color: "black" ,
                                           backgroundColor: "white" , padding: 10 , borderRadius: 20 , borderWidth: 1
                                          }}
                                   value={basicinfo.packing_instructions}
                                   onChangeText={(text, name) => this.props.productInfoHandleChange(text , "packing_instructions")}
                                   />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 , flexDirection: "row" , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 , padding: 10}}>
                        Product can be skipped
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center" }}>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={basicinfo.is_skippable ? "#f5dd4b" : "#f4f3f4"}
                          backgroundColor="#3e3e3e"
                          style={{ borderWidth: 1 , borderRadius: 20 }}
                          onValueChange={(value, name) => this.props.productInfoHandleChange(value , "is_skippable")}
                          value={basicinfo.is_skippable}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 , flexDirection: "row" , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 , padding: 10}}>
                        Add to any order
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center" }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.add_to_any_order ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "add_to_any_order")}
                            value={basicinfo.add_to_any_order}
                          />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 , flexDirection: "row" , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 , padding: 10}}>
                        Record Serial Number 1
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center" }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.record_serial ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "record_serial")}
                            value={basicinfo.record_serial}
                          />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 , flexDirection: "row" , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 , padding: 10}}>
                        Record Serial Number 2
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center" }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.record_serial ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "second_record_serial")}
                            value={basicinfo.second_record_serial}
                          />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 , flexDirection: "row" , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 , padding: 10}}>
                        Intangible Item
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center" }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.record_serial ? "#f5dd4b" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "is_intangible")}
                            value={basicinfo.is_intangible}
                          />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 , padding: 10}}>
                        Type-In Count Setting
                      </Text>
                      <Picker
                        selectedValue={basicinfo.type_scan_enabled}
                        style={{ height: 30, width: "auto" }}
                        onValueChange={(itemValue, itemIndex) => this.props.productInfoHandleChange(itemValue , "type_scan_enabled")}
                      >
                        {
                          this.props.pickerSelectedOptions.map((option , index) => {
                            return(
                                <Picker.Item label={option.label} value={option.value} />
                              )
                          })
                        }  
                      </Picker>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flex: 1 , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 , padding: 10}}>
                        Click Scanning Setting
                      </Text>
                      <Picker
                        selectedValue={basicinfo.click_scan_enabled}
                        style={{ height: 30, width: "auto" }}
                        onValueChange={(itemValue, itemIndex) => this.props.productInfoHandleChange(itemValue , "click_scan_enabled")}
                      >
                        {
                          this.props.pickerSelectedOptions.map((option , index) => {
                            return(
                                <Picker.Item label={option.label} value={option.value} />
                              )
                          })
                        }  
                      </Picker>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
                <View style={{margin: 10}}>
                  <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                    Multi-pack Barcodes
                  </Text>
                  {
                    barcodes.length > 0 && barcodes.map((code , index) => {
                      return(
                          <View key={index} style={{margin: 10 , justifyContent: "center"}}>
                              <View style={{flexDirection: "row" , flex: 1 ,  margin: 5 }}>
                                <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 7 , padding: 5}}>Multi-pack Barcode {index+1}</Text>
                                <TextInput style={{flex: 4 , color: "black" , backgroundColor: "white" , padding: 5 , borderRadius: 20 , borderWidth: 1 }}
                                           value={code.barcode}
                                           onChangeText={(text) => this.props.multiBarcode(text, "barcode" , index)}
                                           onBlur={(e) => this.callBarcode(e)}                                 
                                         />
                              </View>
                              <View style={{flexDirection: "row" , flex: 1 , margin: 5 }}>
                                <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 7 ,padding: 5}}>Pack Count </Text>
                                <TextInput style={{flex: 4 , color: "black" , backgroundColor: "white" , padding: 5 , borderRadius: 20 , borderWidth: 1 }}
                                           value={code.packing_count}
                                           keyboardType="numeric"
                                           onChangeText={(text) => this.props.multiBarcode(text, "packing_count" , index )} 
                                           onBlur={(e) => this.callBarcode(e)}                                 
                                           />
                              </View>
                          </View>
                        )
                    })
                  }
                  <View>
                    <TouchableOpacity style={{flexDirection: "row", marginLeft: 20 , marginRight: 20 }} onPress={() => {this.props.addMultiBarcode()}}>
                      <View style={{backgroundColor: "gray" , paddingTop: 2 , paddingBottom: 2 , paddingLeft: 5 , paddingRight: 5 , borderRadius: 2 , justifyContent: "center"}}>
                        <Text style={{fontWeight: "900" , fontSize: 15 , color: "#fff"}}>+</Text>
                      </View>
                      <View style={{justifyContent: "center"}}>
                        <Text style={{marginLeft: 10}}>Add another</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
                <View style={{margin: 10}}>
                  <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                    Custom Product Fields
                  </Text>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row" , flex: 1 ,  margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 7 , padding: 10}}>
                        Custom Product Data 1
                      </Text>
                      <TextInput style={{flex: 4 , color: "black" , backgroundColor: "white" , padding: 5 , borderRadius: 20 , borderWidth: 1 }}
                                 value={basicinfo.custom_product_1}
                                 onChangeText={(text, name) => this.props.productInfoHandleChange(text, "custom_product_1" )}
                                 />
                    </View>
                    <View style={{flexDirection: "row" , flex: 1 , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 ,padding: 10}}>
                        Display During Packing
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center"}}>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={basicinfo.custom_product_display_1 ? "#f5dd4b" : "#f4f3f4"}
                          backgroundColor="#3e3e3e"
                          style={{borderWidth: 1 , borderRadius: 20}}
                          onValueChange={(value, name) => this.props.productInfoHandleChange(value , "custom_product_display_1")}
                          value={basicinfo.custom_product_display_1}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                      <View style={{flexDirection: "row" , flex: 1 ,  margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 7 , padding: 10}}>
                          Custom Product Data 2
                        </Text>
                        <TextInput style={{flex: 4 , color: "black" , backgroundColor: "white" , padding: 5 ,borderRadius: 20 , borderWidth: 1 }}
                                   value={basicinfo.custom_product_2}
                                   onChangeText={(text, name) => this.props.productInfoHandleChange(text, "custom_product_2" )}
                                   />
                      </View>
                      <View style={{flexDirection: "row" , flex: 1 , margin: 5 }}>
                        <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 ,padding: 10}}>
                          Display During Packing
                        </Text>
                        <View style={{flex: 2 , alignItems: "center", justifyContent: "center"}}>
                          <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={basicinfo.custom_product_display_2 ? "#17C017" : "#f4f3f4"}
                            backgroundColor="#3e3e3e"
                            style={{borderWidth: 1 , borderRadius: 20}}
                            onValueChange={(value, name) => this.props.productInfoHandleChange(value , "custom_product_display_2")}
                            value={basicinfo.custom_product_display_2}
                          />
                        </View>
                      </View>
                  </View>
                  <View style={{margin: 10 , justifyContent: "center"}}>
                    <View style={{flexDirection: "row" , flex: 1 ,  margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 7 , padding: 10}}>
                        Custom Product Data 3
                      </Text>
                      <TextInput style={{flex: 4 , color: "black" , backgroundColor: "white" , padding: 5 ,borderRadius: 20 , borderWidth: 1 }}
                                 value={basicinfo.custom_product_3}
                                 onChangeText={(text, name) => this.props.productInfoHandleChange(text, "custom_product_3" )}
                                 />
                    </View>
                    <View style={{flexDirection: "row" , flex: 1 , margin: 5 }}>
                      <Text style={{fontWeight: "bold" , fontSize: 15 , flex: 8 ,padding: 10}}>
                        Display During Packing
                      </Text>
                      <View style={{flex: 2 , alignItems: "center", justifyContent: "center"}}>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={basicinfo.custom_product_display_3 ? "#17C017" : "#f4f3f4"}
                          backgroundColor="#3e3e3e"
                          style={{borderWidth: 1 , borderRadius: 20}}
                          onValueChange={(value, name) => this.props.productInfoHandleChange(value , "custom_product_display_3")}
                          value={basicinfo.custom_product_display_3}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </React.Fragment>
        }
        </>
      }
      </ScrollView>
    );
  }
}
