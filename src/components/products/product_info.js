import React, { Component } from 'react';
import { View, Text, TextInput , Image, TouchableOpacity , ScrollView } from 'react-native';



export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiInput: "",
      skusMultiInput: "",
      categoriesMultiInput: "",
      barcodesLocal: [],
      skusLocal: [],
      categoriesLocal: []
    };
  }

  updateTagState = (state , type) => {
  };

  componentDidMount(){
    if(this.props && this.props.basicinfo && this.props.basicinfo.multibarcode){
      let barcodes = this.props.product.barcodes
      let codes = []
      barcodes && barcodes.length > 0 && barcodes.map((barcode , index) => {
        codes.push(barcode.barcode)
      })
      this.setState({barcodesLocal: codes})
    }
    if(this.props && this.props.product && this.props.product.skus){
      let skus = []
      this.props.product.skus && this.props.product.skus.length > 0 && this.props.product.skus.map((sku , index) => {
        skus.push(sku.sku)
      })
      this.setState({skusLocal: skus})
    }
    if(this.props && this.props.product && this.props.product.cats){
      let cats = []
      this.props.product.cats && this.props.product.cats.length > 0 && this.props.product.cats.map((cat , index) => {
        cats.push(cat.category)
      })
      this.setState({categoriesLocal: cats})
    }
  }

  componentDidUpdate(){
    if(this.props.removefromLocal !== ""){
      this.removeByName(this.props.removefromLocal)
    }
    // let barcodesLocal = this.state.barcodesLocal
    // if(this.props.updateBarcodeLocal === true){
    //   this.props.product.barcodes && this.props.product.barcodes.length > 0 && this.props.product.barcodes.map((barcode, index) => {
    //     barcodesLocal.push(barcode.barcode)  
    //   })
    //   this.setState({barcodesLocal})
    // }
  }

  removeByName = (barcodeName) => {
    let arr = this.state.barcodesLocal
    arr && arr.length && arr.map((barcode,index) => {
                                                      if(barcode === this.props.removefromLocal){
                                                        arr.splice(index , 1)
                                                      }
                                                    })
    this.setState({arr})
    this.props.updateLocalBarcode()
  }

  updateMultiTag = (type , remove) => {
    if(type === "barcode"){
      let barcodesLocal = this.state.barcodesLocal
      let barcode = this.state.multiInput
      let previousData = this.props.product.barcodes
      let finalArray = []
      let newHash = {}
      let NewArray = []
      barcodesLocal.includes(barcode) ? null : barcodesLocal.push(barcode)
      if(barcode !== " " || remove === true){
        previousData.map((previousDataBarcode) => {
          if(barcodesLocal.includes(previousDataBarcode.barcode)){
            finalArray.push(previousDataBarcode)
            NewArray.push(previousDataBarcode.barcode)
          }
        })
        barcodesLocal.map((barcode) => {
          if(barcode !== "" && NewArray.includes(barcode) === false){
            newHash = {
              barcode: barcode,
              // created_at: "",
              id: "TEMP",
              // is_multipack_barcode: true,
              // lot_number: null,
              // order: 0,
              packing_count: "1",
              product_id: this.props.basicinfo.id,

              // updated_at: "",
            }
            finalArray.push(newHash)
          }
        })
        this.setState({barcodesLocal , multiInput: ""})
        let checkRemove = remove === true ? true : false
        if(finalArray.length > 0){
          this.props.updateProductSBC(finalArray , "barcode", checkRemove)
        }else{
          if(finalArray.length === 0){
            this.props.updateProductSBC([] , "barcode")
          }
        }
      }
    }

    if(type === "skus"){
      let sku = this.state.skusMultiInput
      let skusLocal = this.state.skusLocal
      let previousDataSku = this.props.product.skus
      let finalArraySku = []
      let newHashSku = {}
      let NewArraySku = []
      skusLocal.includes(sku) ? null : skusLocal.push(sku)
      if(sku !== " " || remove === true){
        previousDataSku.map((previousSkus) => {
          if(skusLocal.includes(previousSkus.sku)){
            finalArraySku.push(previousSkus)
            NewArraySku.push(previousSkus.sku)
          }
        })
        skusLocal.map((sku) => {
          if(sku !== "" && NewArraySku.includes(sku) === false){
            newHashSku = {
              id: "TEMP",
              product_id: this.props.basicinfo.id,
              sku: sku
            }
            finalArraySku.push(newHashSku)
          }
        })
        this.setState({skusLocal , skusMultiInput: ""})
        let checkRemove = remove === true ? true : false
        if(finalArraySku.length > 0){
          this.props.updateProductSBC(finalArraySku , "sku" , checkRemove)
        }else{
          if(finalArraySku.length === 0){
            this.props.updateProductSBC([] , "sku")
          }
        }
      }
    }

    if(type === "cats"){
      let cat = this.state.categoriesMultiInput
      let categoriesLocal = this.state.categoriesLocal
      let previousDataCat = this.props.product.cats
      let finalArrayCat = []
      let newHashCat = {}
      let NewArrayCat = []
      categoriesLocal.includes(cat) ? null : categoriesLocal.push(cat)
      if(cat !== " " || remove === true){
        previousDataCat.map((previousCat) => {
          if(categoriesLocal.includes(previousCat.category)){
            finalArrayCat.push(previousCat)
            NewArrayCat.push(previousCat.category)
          }
        })
        categoriesLocal.map((cat) => {
          if(cat !== "" && NewArrayCat.includes(cat) === false){
            newHashCat = {
              id: "TEMP",
              product_id: this.props.basicinfo.id,
              category: cat
            }
            finalArrayCat.push(newHashCat)
          }
        })
        this.setState({categoriesLocal , categoriesMultiInput: ""})
        let checkRemove = remove === true ? true : false
        if(finalArrayCat.length > 0){
          this.props.updateProductSBC(finalArrayCat , "cats" , checkRemove)
        }else{
          if(finalArrayCat.length === 0){
            this.props.updateProductSBC([] , "cats")
          }
        }
      }
    }

    // if(type === "cats"){
    //   let categoriesLocal = this.state.categoriesLocal
    //   let cats = this.state.categoriesMultiInput
    //   let previousDataCat = this.props.product.cats
    //   let finalArrayCat = []
    //   let newHashCat = {}
    //   let NewArrayCat = []
    //   categoriesLocal.includes(cats) ? null : categoriesLocal.push(cats)
    //   if(cats !== "" || remove === true){
    //     previousDataCat.map((previousCats) => {
    //       if(categoriesLocal.includes(previousCats.category)){
    //         finalArrayCat.push(previousCats)
    //         NewArrayCat.push(previousCats.category)
    //       }
    //     })
    //     categoriesLocal.map((cats) => {
    //       if(cats !== "" && NewArrayCat.includes(cats) === false){
    //         newHashCat = {
    //           id: "TEMP",
    //           product_id: this.props.basicinfo.id,
    //           category: cats
    //         }
    //         finalArrayCat.push(newHashCat)
    //       }
    //     })
    //     this.setState({categoriesLocal , categoriesMultiInput: ""})
    //     let checkRemove = remove === true ? true : false
    //       if(finalArrayCat.length > 0){
    //         this.props.updateProductSBC(finalArrayCat , "cats" , checkRemove)
    //       }else{
    //         if(finalArrayCat.length === 0){
    //           this.props.updateProductSBC([] , "cats")
    //         }
    //       }
    //   }
    // }

  }

  removeMultiTag = (type , index) => {
    if(type === "barcode"){
      let barcodes = this.state.barcodesLocal
      if(barcodes.length > 0){
        barcodes.splice(index, 1);
        this.updateMultiTag( "barcode" , true)
      }
      this.setState({barcodes})
    }
    if(type === "sku"){
      let skus = this.state.skusLocal
      if(skus.length > 0){
        skus.splice(index, 1);
        this.updateMultiTag( "skus" , true)
      }
      this.setState({skus})
    }
    if(type === "cats"){
      let cats = this.state.categoriesLocal
      if(cats.length > 0){
        cats.splice(index, 1);
        this.updateMultiTag( "cats" , true)
      }
      this.setState({cats})
    }
  }

  render() {
    let {basicinfo , images} = this.props
    return (
      <ScrollView style={{width: "100%" , marginBottom: 0 }}>
        {
          basicinfo &&
          <>
            <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
              <View style={{margin: 10}}>
                <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                  {basicinfo.name}
                </Text>
                <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                  SKU # Q
                </Text>
              </View>
            </View>
            <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
              <View style={{margin: 10}}>
                <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                  Product Images
                </Text>
                <View style={{flexDirection: "row" , margin: 5}}>
                  {
                    images.length > 0 && images.map((img , index) => {
                       return(
                          <Image
                              style={{width: 80 , height: 80 , margin: 10 , borderRadius: 30}}
                              source={{uri: img.image ?  img.image : ""}}
                              key={index}
                            />
                        )
                    })
                  }
                </View>
              </View>
            </View>
            <View style={{ margin: 10 , backgroundColor: "#dbdada" , borderWidth: 1 , borderRadius: 20 , padding: 10 }}>
              <View style={{margin: 10}}>
                <Text style={{fontWeight: "bold" , fontSize: 18 , marginTop: 10 , marginBottom: 10}}>
                  Product Details
                </Text>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>Name</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "name" )}
                      value={basicinfo.name}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>SKUs</Text>
                  <TextInput style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                             onChangeText={(text) => { this.setState({skusMultiInput: text}) }}
                             value={this.state.skusMultiInput}
                             onSubmitEditing={() => this.updateMultiTag("skus") }
                             />
                  <View style={{flexDirection: "row" , marginLeft: 10 , marginRight: 10 }}>
                    {
                      this.state.skusLocal.length > 0 && this.state.skusLocal.map((sku , index) => {
                        return(
                          sku !== "" &&
                          <View key={index} style={{backgroundColor: "gray" , padding: 5 , borderRadius: 20 , borderWidth: 1, marginRight: 8 , flexDirection: "row"}}>
                            <Text style={{marginRight: 4}}>{sku}</Text>
                            <TouchableOpacity key={index} onPress={() => this.removeMultiTag("sku" , index )}>
                              <Text style={{backgroundColor: "#4c4c4c" , color: "#fff" , fontWeight: "900" , borderRadius: 10}}> X </Text>
                            </TouchableOpacity>
                          </View>  
                          )
                      })
                    }
                  </View>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>Barcodes</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text) => { this.setState({multiInput: text}) }}
                      value={this.state.multiInput}
                      onSubmitEditing={() => this.updateMultiTag("barcode") }
                      />
                  <View style={{flexDirection: "row" , marginLeft: 10 , marginRight: 10 }}>
                    {
                      this.state.barcodesLocal.length > 0 && this.state.barcodesLocal.map((barcode , index) => {
                        return(
                          barcode !== "" &&
                          <View key={index} style={{backgroundColor: "gray" , padding: 5 , borderRadius: 20 , borderWidth: 1, marginRight: 8 , flexDirection: "row"}}>
                            <Text style={{marginRight: 4}}>{barcode}</Text>
                            <TouchableOpacity key={index} onPress={() => this.removeMultiTag("barcode" , index )}>
                              <Text style={{backgroundColor: "#4c4c4c" , color: "#fff" , fontWeight: "900" , borderRadius: 10}}> X </Text>
                            </TouchableOpacity>
                          </View>  
                          )
                      })
                    }
                  </View>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>Categories</Text>
                   <TextInput style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                             onChangeText={(text) => { this.setState({categoriesMultiInput: text}) }}
                             value={this.state.categoriesMultiInput}
                             onSubmitEditing={() => this.updateMultiTag("cats") }
                             />
                  <View style={{flexDirection: "row" , marginLeft: 10 , marginRight: 10 }}>
                    {
                      this.state.categoriesLocal.length > 0 && this.state.categoriesLocal.map((cats , index) => {
                        return(
                          cats !== "" &&
                          <View key={index} style={{backgroundColor: "gray" , padding: 5 , borderRadius: 20 , borderWidth: 1, marginRight: 8 , flexDirection: "row"}}>
                            <Text style={{marginRight: 4}}>{cats}</Text>
                            <TouchableOpacity key={index} onPress={() => this.removeMultiTag("cats" , index )}>
                              <Text style={{backgroundColor: "#4c4c4c" , color: "#fff" , fontWeight: "900" , borderRadius: 10}}> X </Text>
                            </TouchableOpacity>
                          </View>  
                          )
                      })
                    }
                  </View>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>FNSKU</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "fnsku" )}
                      value={basicinfo.fnsku}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>ASIN</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "asin" )}
                      value={basicinfo.asin}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>FBA-UPC</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "fba_upc" )}
                      value={basicinfo.fba_upc}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>ISBN</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "isbn" )}
                      value={basicinfo.isbn}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>EAN</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "ean" )}
                      value={basicinfo.ean}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>Supplier SKU</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "supplier_sku" )}
                      value={basicinfo.supplier_sku}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>AVG Cost</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "avg_cost" )}
                      value={basicinfo.avg_cost}
                      keyboardType={'numeric'}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>Count Group</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "count_group" )}
                      value={basicinfo.count_group}/>
                </View>
                <View>
                  <Text style={{paddingLeft: 10 , paddingRight: 10}}>Product Weight</Text>
                  <TextInput
                      style={{margin: 10 , borderWidth: 1 , borderRadius: 20 , padding: 10 , backgroundColor: "#ffff"}}
                      onChangeText={(text, name) => this.props.productInfoHandleChange(text, "weight" )}
                      value={basicinfo.weight}
                      keyboardType={'numeric'}
                      />
                </View>
              </View>
            </View>
          </>
        }
      </ScrollView>
    );
  }
}
