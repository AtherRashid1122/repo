import React, { Component } from 'react';
import { View, Text, TextInput , ActivityIndicator , TouchableOpacity ,Image  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import globalStyles from '../../style/global';
import styles from '../../style/scanpack';
import cross from "../../../assets/close_black.png";
import shared_barcode from "../../../assets/shared_barcode.png";

class ProductAlias extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     	<React.Fragment>
     	{
        this.props.alias && this.props.Product &&  this.props.updateProduct.current_product_data && this.props.updateProduct.alias_product_data.barcode && 
          <View style={styles.typeScanContainer}>
            <View style={styles.aliasBox}>
              <View style={globalStyles.flexDirectionRow}>
                <Text style={styles.aliasTextHeading}>
                  Duplicate barcode identified. An alias may be required.
                </Text>
                <TouchableOpacity onPress={() => {this.props.assignUniquebarcode()} }>
                  <Image style={{height: 20 , width: 20}} source={cross} /> 
                </TouchableOpacity>
              </View>
              
              <Text style={styles.aliasText}>
                You have tried to add a barcode that already exists on another item. Aliasing is often used in this situation to combine multiple SKUs in the same item record.
              </Text>
              
              <Text style={styles.aliasText}>
                If both of these SKUs, refer to the same physical product, we can add the new sku to the existing item.
              </Text>

              <View style={{flexDirection: "row" , justifyContent: "center"}}>
                <View style={{borderWidth: 1 , padding: 6 , backgroundColor: "#dbeaf7" , borderRadius: 10 , marginLeft: 4 , marginRight: 4 , width: "20%"}}>
                  <h3>This new item</h3>
                  <Text style={{fontWeight: 500}}>Name: {this.props.updateProduct && this.props.updateProduct.current_product_data && this.props.updateProduct.current_product_data.name}</Text>
                  <Text style={{fontWeight: 500}}>SKU: {this.props.updateProduct && this.props.updateProduct.current_product_data && this.props.updateProduct.current_product_data.sku}</Text>
                  <Text style={{fontWeight: 500}}>Barcode: {this.props.updateProduct && this.props.updateProduct.current_product_data && this.props.updateProduct.current_product_data.barcode}</Text>
                </View>
                <View style={{padding: 6 , marginLeft: 4 , marginRight: 4 , justifyContent: "center"}}>
                  <h3> + </h3>
                </View>
                <View style={{borderWidth: 1 , padding: 6 , backgroundColor: "#c0e7c3" , borderRadius: 10 , marginLeft: 4 , marginRight: 4 , width: "20%"}}>
                  <h3>Will be added to this existing item</h3>
                  <Text style={{fontWeight: 500}}>Name: {this.props.updateProduct && this.props.updateProduct.alias_product_data && this.props.updateProduct.alias_product_data.name}</Text>
                  <Text style={{fontWeight: 500}}>SKU: {this.props.updateProduct && this.props.updateProduct.alias_product_data && this.props.updateProduct.alias_product_data.sku}</Text>
                  <Text style={{fontWeight: 500}}>Barcode: {this.props.updateProduct && this.props.updateProduct.alias_product_data && this.props.updateProduct.alias_product_data.barcode}</Text>
                </View>
                <View style={{padding: 6 , marginLeft: 4 , marginRight: 4, justifyContent: "center"}}>
                  <h3> = </h3>
                </View>
                <View style={{borderWidth: 1 , padding: 6 , backgroundColor: "#009e0f" , borderRadius: 10 , marginLeft: 4 , marginRight: 4, width: "20%"}}>
                  <h3 style={{color: "#fff"}}>Resulting in this item</h3>
                  <Text style={{color: "#fff", fontWeight: 500}}>Name: {this.props.updateProduct && this.props.updateProduct.after_alias_product_data && this.props.updateProduct.after_alias_product_data.name}</Text>
                  <Text style={{color: "#fff", fontWeight: 500}}>SKU: {this.props.updateProduct && this.props.updateProduct.after_alias_product_data && this.props.updateProduct.after_alias_product_data.sku}</Text>
                  <Text style={{color: "#fff", fontWeight: 500}}>Barcode: {this.props.updateProduct && this.props.updateProduct.after_alias_product_data && this.props.updateProduct.after_alias_product_data.barcode}</Text>
                </View>
              </View>

              <View style={{alignItems: "center" , marginTop: 10 , marginBottom: 10}}>
                <Text>
                  Not to sound ominous but....
                </Text>
                <Text>
                  This can not be undone.
                </Text>
              </View>

              <View style={{flexDirection: "row", justifyContent: "center" , marginTop: 10 , marginBottom: 10}}>
                <TouchableOpacity onPress={this.props.shareBarcodeMethod}>
                  <Text style={{fontWeight: 600, borderWidth: 1 , backgroundColor: "#d7a549" , color: "#fff" , padding: 8 , borderRadius: 10 , marginLeft: 4 , marginRight: 4 }}> No Thanks. These Items are different </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.proceedAliasing()}}>
                  <Text style={{fontWeight: 600, borderWidth: 1 , backgroundColor: "green" , color: "#fff" , padding: 8 , borderRadius: 10 , marginLeft: 4 , marginRight: 4 }}> Proceed With Aliasing </Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
      }
      {
        this.props.shareBarcodeShow && this.props.Product && this.props.updateProduct && this.props.updateProduct.current_product_data &&
          <View style={styles.typeScanContainer}>
            <View style={styles.aliasBox}>
              <View style={globalStyles.flexDirectionRow}>
                <Text style={styles.aliasTextHeading}>
                  Permit a Shared Barcode to be used across multiple items?
                </Text>
                <TouchableOpacity onPress={() => {this.props.assignUniquebarcode()} }>
                  <Image style={{height: 20 , width: 20}} source={cross} /> 
                </TouchableOpacity>
              </View>
              
              <View style={{alignItems: "center"}}>
                <Image style={{height: 60 , width: 60}} source={shared_barcode} />
                <Text style={{fontWeight: 500, marginTop: 10 , marginBottom: 10}}>Barcode: {this.props.updateProduct && this.props.updateProduct.matching_barcode}</Text>
              </View>

              <Text style={styles.aliasText}>
                Since the items are different it is recommended to assign unique barcodes so that Groovepacker will be able to distinguish between them.
              </Text>
              
              <Text style={styles.aliasText}>
                There are some special cases when you might decide to have the same barcode used for two or more unique items. This is not a recommended practice since GroovepPacker and other apps that use the barcode will not be able to tell them apart.
              </Text>

              <View style={{flexDirection: "row", justifyContent: "center" , marginTop: 10 , marginBottom: 10}}>
                <TouchableOpacity onPress={() => {this.props.sameBarcode() }}>
                  <Text style={{fontWeight: 600, borderWidth: 1 , backgroundColor: "#d7a549" , color: "#fff" , padding: 8 , borderRadius: 10 , marginLeft: 4 , marginRight: 4 }}> 
                    Yes, I want to permit these separate items to have the same barcode
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(fromButton) => {this.props.assignUniquebarcode("fromButton")}}>
                  <Text style={{fontWeight: 600, borderWidth: 1 , backgroundColor: "green" , color: "#fff" , padding: 8 , borderRadius: 10 , marginLeft: 4 , marginRight: 4 }}> 
                    No I will assign unique barcode to this item 
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{alignItems: "center" , marginTop: 10 , marginBottom: 10}}>
                <View style={{padding: 6 , marginLeft: 4 , marginRight: 4 , width: "60%"}}>
                  <Text style={{fontWeight: 500}}>Name: {this.props.updateProduct && this.props.updateProduct.current_product_data && this.props.updateProduct.current_product_data.name}</Text>
                  <Text style={{fontWeight: 500}}>SKU: {this.props.updateProduct && this.props.updateProduct.current_product_data && this.props.updateProduct.current_product_data.sku}</Text>
                </View>
                {
                  this.props.updateProduct && 
                      this.props.updateProduct.shared_bacode_products && 
                        this.props.updateProduct.shared_bacode_products.length > 0 &&
                          this.props.updateProduct.shared_bacode_products.map((product, index) => {
                            return(
                                <View style={{padding: 6 , marginLeft: 4 , marginRight: 4 , width: "60%"}} key={index}>
                                  <Text style={{fontWeight: 500}}>Name: {product.name}</Text>
                                  <Text style={{fontWeight: 500}}>SKU: {product.sku}</Text>
                                </View>
                              )
                          })
                }

              </View>

              <View style={{alignItems: "center" , marginTop: 10 , marginBottom: 10}}>
                <View style={{padding: 6 , marginLeft: 4 , marginRight: 4 , width: "80%"}}>
                  <Text style={styles.aliasDescription}>
                      An example of when this might be used would be where a manufacturer has used the same barcode on 3 variants of an item. Perhaps the item is the same but the packaging differs slighly. It is not practical to re-barcode items since their would be no cost incurred if the wrong variant was shipped.
                  </Text>
                </View>  

                <View style={{padding: 6 , marginLeft: 4 , marginRight: 4 , width: "80%"}}>
                  <Text style={styles.aliasDescription}>
                    Another scenario would be a regular item and a "tester" version. Both share the same barcode and are the same item, but they have differing SKUs for inventory tracking purposes. Here it would be possible to alias the items but by keeping them separate it is possible to show the packer instructions that are specific to one of the SKUs.
                  </Text>
                </View>

              </View>

              
            </View>
          </View> 
      }
      </React.Fragment> 
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAlias)

