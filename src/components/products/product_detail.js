import React, { Component } from 'react';
import { View, Text, TextInput , ActivityIndicator , TouchableOpacity ,Image  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { GetProductDetail , UpdateProductInfo , updateProductList , updateProductAlias } from "../../actions/productAction";
import {SearchScanpackOrder} from "../../actions/scanpackAction";
import { SetItem } from "../../actions/updateAsyncAction";
import ProductInfo from "./product_info";
import ScanpackOptions from "./scanpack_options";
import InventoryKitOptions from "./inventory_kit_options";
import ProductActivityLog from "./product_activity_log";
import PopUpModel from "../scanpack/pop_up_model";
import globalStyles from '../../style/global';
import styles from '../../style/scanpack';
import cross from "../../../assets/close_black.png";
import shared_barcode from "../../../assets/shared_barcode.png";
import ProductAlias from "../Alias/productAlias";

let updateProductInfoSuccess = false
let searchOrderSuccess = false
let orderID = 0
let buttonClick = false
let aliasValid = false
let saveClose = false
let updateProductAliasFlag = false
let updateProductSkuValue = false

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfoActive : true ,
      scanPackOptionsActive:  false,
      inventoryKitOptionsActive: false,
      productActivityLogActive: false,
      Product: [],
      loading: false,
      alias: false,
      shareBarcodeShow: false,
      updateBarcodeLocal: false,
      removefromLocal: "",
      loadingText: "Loading",
      from: "",
      pickerSelectedOptions:[
        {
          label: "On",
          value: "on"
        },
        {
          label: "Off",
          value: "off"
        },
        {
          label: "On with confirmation",
          value: "on_with_confirmation"
        }
      ],
      localBarcodes: [],
      popUpModelShow: false
    };
  }

  componentDidMount(){
    this.props.SearchScanpackOrder("" , false)
    this.apiCall("Loading...")
  }

  // static getDerivedStateFromProps(nextProps){
  //   if(nextProps.product){
  //     return {Product: nextProps.product}
  //   }
  //   return null
  // }

  componentDidUpdate(){    
    if(this.props && this.props.product && this.state.Product !== this.props.product && this.state.Product.show_alias_popup !== true){
      this.setState({Product: this.props.product , loading: false , localBarcodes: this.props.product.barcodes })
      // this.props.UpdateProductInfo(0)
    }

    if(aliasValid 
        && this.props 
          && this.props.updateProduct && this.props.updateProduct.data 
            && this.props.updateProduct.data.show_alias_popup 
              && this.props.updateProduct.time > this.state.updateProductApiCall){
        setTimeout( () => this.setState({alias: true , Product: this.props.updateProduct ,loading: false}) , 500);
        aliasValid = false
        // this.props.UpdateProductInfo(0)
    }

    if(this.props && 
        this.props.updateProduct && 
          this.props.updateProduct.data && 
            this.props.updateProduct.data.scan_pack_product && 
              this.props.updateProduct.time >  this.state.updateProductApiCall){
      if(saveClose === true){
        this.props.navigation.navigate("ScanPackItem" , {data: {from: "productDetailPage" , time: new Date() , increment_id: this.props.route.params.increment_id} } )
      }else{
        if(this.props.updateProduct.data.show_alias_popup !== true){
          if(this.props.updateProduct.data.status === false){
            this.setState({Product: this.props.updateProduct.data.scan_pack_product, popUpModelShow: true ,updateProductApiCall: this.props.updateProduct.time ,loading: false})
            this.alertBox(this.props.updateProduct.data.message, true , false)
          }else{
            this.setState({Product: this.props.updateProduct.data.scan_pack_product, updateProductApiCall: this.props.updateProduct.time ,loading: false})
          }
          this.apiCall("Title")

          updateProductInfoSuccess = false
        }
      }
    }

    if(updateProductAliasFlag && this.props && this.props.updateProductAliasSuccess){
      if(this.props.updateProductAliasSuccess.status){
        this.setState({loading: false , alias: false, Product: this.props.product})
        this.props.navigation.navigate("ScanPackItem" , {data: {from: "productDetailPage" , time: new Date() , increment_id: this.props.route.params.increment_id} } )
        updateProductAliasFlag = false
      }
    }



    // if(updateProductSkuValue && this.props && this.props.updateProductListData && this.props.updateProductListData.time > this.state.updateSkuTime){
    //   if(this.props.updateProductListData.data && this.props.updateProductListData.data.status === false){
    //     this.alertBox(this.props.updateProductListData.data.error_msg[0], true , false)
    //   }
    //   this.setState({loading: false, updateSkuTime: this.props.updateProductListData.time})
    //   this.apiCall()
    //   updateProductSkuValue = false
    // }

    // if(updateProductInfoSuccess === true && this.props && this.props.updateProduct && this.props.updateProduct.scan_pack_product){
    //   if(aliasValid && this.props.updateProduct.show_alias_popup){
    //     setTimeout( () => this.setState({alias: true , Product: this.props.updateProduct ,loading: false}) , 500);
    //     aliasValid = false
    //   }else{
    //     setTimeout( () => this.setState({Product: this.props.updateProduct.scan_pack_product ,loading: false}) , 500);
    //     this.props.navigation.navigate("ScanPackItem" , {data: {from: "productDetailPage" , time: new Date() , increment_id: this.props.route.params.increment_id} } )
    //   }
    //   updateProductInfoSuccess = false
    // }
  
  }

  alertBox = (message , skip , messageTypeSuccess) => {
    if(messageTypeSuccess === true){
      this.setState({popUpModelShow: true , message: message, messageTypeSuccess: true})
    }else{
      this.setState({popUpModelShow: true , message: message})
    }
    setTimeout(function(){
      this.setState({popUpModelShow: false , message: "" , messageTypeSuccess: false});
    }.bind(this),4000);
    // try {
    //   this.barcode.current.focus()
    // } catch (error) {
    // }
  }

  closeAlert = () => {
    this.setState({ popUpModelShow: false,
                    message: ""
                  })
  }


  apiCall = (title) =>{
    this.setState({loading: true , loaderTitle: title})
    let id = this.props.route && this.props.route.params && this.props.route.params.productInfo
    orderID = this.props.route && this.props.route.params && this.props.route.params.orderID
    if(id){
      this.props.GetProductDetail(id)
    }
  }

  changeState = (state) => {
    if(state === "productInfoActive"){
      this.setState({ productInfoActive: true, scanPackOptionsActive: false, inventoryKitOptionsActive: false,
                      productActivityLogActive: false
                    })
    }
    if(state === "scanPackOptionsActive"){
      this.setState({ productInfoActive: false, scanPackOptionsActive: true, inventoryKitOptionsActive: false,
                      productActivityLogActive: false
                    })
    }
    if(state === "inventoryKitOptionsActive"){
      this.setState({ productInfoActive: false, scanPackOptionsActive: false, inventoryKitOptionsActive: true,
                      productActivityLogActive: false
                    })
    }
    if(state === "productActivityLogActive"){
      this.setState({ productInfoActive: false, scanPackOptionsActive: false, inventoryKitOptionsActive: false,
                      productActivityLogActive: true
                    })
    }
  }

  multiBarcode = (value , name , index) => {
    let basicinfo = this.state.Product.basicinfo
    let Product = this.state.Product
    if(name === "is_skippable"){
      basicinfo[name] = value
    }
    if(name === "barcode" || name === "packing_count"){
      if(name === "barcode"){
        Product.barcodes[index].barcode = value
      }
      if(name === "packing_count"){
        Product.barcodes[index].packing_count = value 
      }
    }
    this.setState({Product})
    // setTimeout(this.updateProductSBC(Product.barcodes,"barcode",false), 6000);
  }

  productInfoHandleChange = (value , name ) => {
    let Product = this.state.Product
    let basicinfo = Product && Product.basicinfo
    if(basicinfo){
      basicinfo[name] = value
    }
    this.setState({Product})
  }

  addMultiBarcode = () => {
    let Product = this.props.product.barcodes
    let newHash = {
          id: "TEMP",
          barcode: "",
          packing_count: "1",
          product_id: this.props.product.basicinfo.id,
        }
    Product.push(newHash)
    this.setState({Product})
  }

  updateProductSBC = (details , type , remove) => {
    let data = this.state.Product
    if(type === "barcode"){
      data.barcodes = details
      // if(remove !== true){
        // if(data.barcodes && data.barcodes.length > 0){
          this.updateProduct("barcode")
        // }
      // } 
    }
    if(type === "sku"){
      data.skus = details
      // if(remove !== true){
        // if(data.skus && data.skus.length > 0){
          // this.updateProductSku("sku")
          this.updateProduct("sku")
        // }
      // }
    }
    if(type === "cats"){
      data.cats = details
      this.updateProduct("cats")
    }
    this.setState({data})
  }

  inventoryWarehousesHandleChange = (value , name ) => {
    let Product = this.state.Product.inventory_warehouses[0].info
    Product[name] = value
    this.setState({Product})
  }

  updateProduct = (from) => {
    this.setState({loading: true , loaderTitle: "Saving Changes..."} , () => {
      console.log("loading" , this.state.loading )
    })
    let Product = this.state.Product
    if(Product){
      let id = Product.basicinfo && Product.basicinfo.id
      if(id){
        Product["app"] = "app"
        let data = Product
        if(from === "save&close"){
          Product.barcodes.length > 0 && Product.barcodes.map((bar) => { 
            if(bar.id === "TEMP"){
              bar["skip_check"] = true
            } 
          })
          Product.skus.length > 0 && Product.skus.map((sku) => { 
            if(sku.id === "TEMP"){
              sku["skip_check"] = true
            } 
          })
          Product.cats.length > 0 && Product.cats.map((cat) => { 
            if(cat.id === "TEMP"){
              cat["skip_check"] = true
            } 
          })
        }
        this.props.UpdateProductInfo(id , Product)
        if(from === "barcode"){
          setTimeout( () => this.setState({loading: false, from: "barcode" , updateProductApiCall: new Date()}) , 300);
          updateProductInfoSuccess = false
          aliasValid = true
        }else{
          updateProductInfoSuccess = true
        }
        if(from === 'save&close'){
          saveClose = true
          this.setState({updateProductApiCall: new Date()})
        }else{
          saveClose = false
        }
        buttonClick = true
      }
      this.setState({ updateProductApiCall: new Date()})
    }
  }

  // updateProductSku = () => {
  //   this.setState({loading: true , loaderTitle: "Updating..." , updateSkuTime: new Date()} , () => {
  //     console.log("loading" , this.state.loading )
  //   })
  //   let Product = this.state.Product
  //   let id = Product.basicinfo && Product.basicinfo.id
  //   let skuLength = this.props.product && this.props.product.skus && this.props.product.skus.length
  //   if(skuLength > 0){
  //     let index = skuLength - 1
  //     let value = this.props.product && this.props.product.skus[index]
  //     let newHash = {
  //               value: value.sku,
  //               var: "sku",
  //               id: id,
  //               app:"app"
  //             }
  //     this.props.updateProductList(newHash)
  //     updateProductSkuValue = true
  //   }
  // }

  componentWillUnmount(){
    this.setState({data: {} , Product: {}})
    this.props.GetProductDetail(0)
  }

  proceedAliasing = () => {
    let alias_product_data_id = this.props.updateProduct.data.alias_product_data.id
    let current_product_data_id = []
    current_product_data_id.push(this.props.updateProduct.data.current_product_data.id)
    let details = {
      product_alias_ids: current_product_data_id
    }
    this.props.updateProductAlias(alias_product_data_id , details)
    updateProductInfoSuccess = true
    updateProductAliasFlag = true 
  }

  assignUniquebarcode = () => {
    let data = this.state.data
    let lastItem = data.length
    let removefromLocal = ""
    data && data.barcodes.length > 0 && data.barcodes.map((barcode) => {
      if(barcode.id === "TEMP"){
        data.barcodes.pop()
        removefromLocal = barcode.barcode
      }
    })
    this.setState({data , shareBarcodeShow: false, alias: false,  updateBarcodeLocal: true , removefromLocal})
  }

  sameBarcode = () => {
    let data = this.state.Product
    let lastItem = data.barcodes.length > 0 && data.barcodes.length - 1
    let id = data.basicinfo.id
    data && data.barcodes.length > 0 && data.barcodes.map((barcode,index) => {
      if(index === lastItem){
        barcode["permit_same_barcode"] = true
      }
    })
    this.props.UpdateProductInfo(id , data)
    this.setState({data , shareBarcodeShow: false, alias: false})
  }

  render() {
    let Product = this.state && this.props.product
    return (
      <React.Fragment>
        {
           <View style={globalStyles.flex1}>
              { 
                this.state.loading &&
                  <View style={styles.activityContainer}>  
                    <ActivityIndicator size="large"  color="#fff" />
                    <View>
                      <Text style={{textAlign: "center" , color: "#fff" , fontSize: 16}}>{this.state.loaderTitle}</Text>
                    </View>
                  </View>
              }  
              { // Notification Pop Up for messages
                this.state.popUpModelShow &&
                  <PopUpModel closeAlert={this.closeAlert.bind(this)}
                              message={this.state.message}
                              messageTypeSuccess={this.state.messageTypeSuccess ? true : false}
                              />
              }
              <ProductAlias alias={this.state.alias}
                            Product={this.state.Product}
                            updateProduct={this.props.updateProduct && this.props.updateProduct.data}
                            assignUniquebarcode={() => this.assignUniquebarcode()}
                            shareBarcodeMethod={() => {this.setState({shareBarcodeShow: true , alias: false}) }} 
                            proceedAliasing={() => this.proceedAliasing()}
                            shareBarcodeShow={this.state.shareBarcodeShow}
                            sameBarcode={() => this.sameBarcode()}/>
              {
                this.props && Product && this.state.Product !== [] &&
                  <View style={globalStyles.flex1}>
                    <View style={{flexDirection: "row" , margin: 10 , borderWidth: 1 }}>
                      <TouchableOpacity onPress={this.changeState.bind(this , "productInfoActive")} style={[globalStyles.flex2 , {backgroundColor: this.state.productInfoActive ? "white" : "rgb(51, 101, 153)" , justifyContent: "center"}]}>
                        <Text style={{color: this.state.productInfoActive ? "black" : "white" , padding: 10 , textAlign: "center"}}>
                          Product Info
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.changeState.bind(this , "scanPackOptionsActive")} style={{flex:2 , backgroundColor: this.state.scanPackOptionsActive ? "white" : "rgb(51, 101, 153)" , justifyContent: "center"}}>
                        <Text style={{ color: this.state.scanPackOptionsActive ? "black" : "white" , padding: 10 , textAlign: "center"}}>
                          Scan & Pack Options
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.changeState.bind(this , "inventoryKitOptionsActive")} style={{flex:2 , backgroundColor: this.state.inventoryKitOptionsActive ? "white" : "rgb(51, 101, 153)" , justifyContent: "center"}}>
                        <Text style={{color: this.state.inventoryKitOptionsActive ? "black" : "white" , padding: 10 , textAlign: "center"}}>
                          Inventory/Kit Options
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.changeState.bind(this , "productActivityLogActive")} style={{flex:2 , backgroundColor: this.state.productActivityLogActive ? "white" : "rgb(51, 101, 153)" , justifyContent: "center"}}>
                        <Text style={{color: this.state.productActivityLogActive ? "black" : "white" , padding: 10 , textAlign: "center"}}>
                          Product Activity Log
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", alignSelf: "flex-end" , marginRight: 10 , marginLeft: 10 , padding: 10}}>
                      <TouchableOpacity onPress={() => this.updateProduct("save&close")}><Text style={{padding: 10 , backgroundColor: "rgb(51, 101, 153)" , color: "#fff" , fontWeight: "bold" , borderRadius: 20 , marginRight: 10 }}>Save & Close</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{padding: 10 , backgroundColor: "rgb(73, 72, 72)" , color: "#fff" , fontWeight: "bold" , borderRadius: 20 }}>Close </Text></TouchableOpacity>
                    </View>
                    {
                      this.state.productInfoActive &&
                        <ProductInfo basicinfo={Product.basicinfo}
                                     images={Product.images}
                                     navigation={this.props.navigation}
                                     productInfoHandleChange={(value , name) => this.productInfoHandleChange(value , name)}
                                     updateProductSBC ={(details , type , remove) => this.updateProductSBC(details, type, remove)}
                                     updateProduct={() => this.updateProduct() }
                                     updateBarcodeLocal={this.state.updateBarcodeLocal}
                                     removefromLocal={this.state.removefromLocal}
                                     updateLocalBarcode={() => this.setState({removefromLocal: ""})}
                                     updatedProduct={this.state.Product}
                                     {...this.props}
                                     />
                    }
                    {
                      this.state.scanPackOptionsActive &&
                        <ScanpackOptions barcodes={Product.barcodes}
                                         basicinfo={Product.basicinfo}
                                         productInfoHandleChange={(value , name) => this.productInfoHandleChange(value , name)}
                                         multiBarcode={(value , name , index) => this.multiBarcode(value , name , index)}
                                         navigation={this.props.navigation}
                                         updateProductSBC ={(details , type , remove) => this.updateProductSBC(details, type, remove)}
                                         addMultiBarcode={() => this.addMultiBarcode()}
                                         pickerSelectedOptions={this.state.pickerSelectedOptions}
                                         />
                    }
                    {
                      this.state.inventoryKitOptionsActive &&
                        <InventoryKitOptions inventoryWarehouses={Product.inventory_warehouses}
                                             navigation={this.props.navigation}
                                             inventoryWarehousesHandleChange={(value , name) => this.inventoryWarehousesHandleChange(value , name)}
                                             />
                    }
                    {
                      this.state.productActivityLogActive &&
                        <ProductActivityLog activities={Product.activities}
                                            navigation={this.props.navigation}
                                            />
                    }
                    <View style={{flexDirection: "row", alignSelf: "flex-end" , marginRight: 10 , marginLeft: 10 , padding: 10}}>
                      <TouchableOpacity onPress={() => this.updateProduct("save&close")}><Text style={{padding: 10 , backgroundColor: "rgb(51, 101, 153)" , color: "#fff" , fontWeight: "bold" , borderRadius: 20 , marginRight: 10 }}>Save & Close</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Text style={{padding: 10 , backgroundColor: "rgb(73, 72, 72)" , color: "#fff" , fontWeight: "bold" , borderRadius: 20 }}>Close </Text></TouchableOpacity>
                    </View>
                  </View>
              }
            </View>
        }
      </React.Fragment>      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    updateProduct: state.product.updateProduct,
    searchOrder: state.scanpack,
    updateProductAliasSuccess: state.product.updateProductAlias,
    updateProductListData: state.product.updateProductList
  }
};

const mapDispatchToProps = {
  GetProductDetail,
  UpdateProductInfo,
  SetItem,
  SearchScanpackOrder,
  updateProductAlias,
  updateProductList
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)

