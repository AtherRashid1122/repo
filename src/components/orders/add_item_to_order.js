import React, { Component } from 'react';
import { View, Text , TextInput , TouchableOpacity , ScrollView} from 'react-native';
// import styles from '../../style/orderdetail';
import { connect } from 'react-redux';
import { GetAllProduct , GetSearchProduct } from "../../actions/productAction"
import { AddOrderItems } from "../../actions/orderActions"
import globalStyles from '../../style/global';
import styles from '../../style/orderlist';

let addItemSuccess = true
let update = true
let updateSearch  = false

class AddItemToOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAllItem: {
        filter: "all",
        sort: "",
        order: "",
        is_kit: -1,
        limit: 1,
        offset: 0
      },
      searchData:{
        search: "",
        sort: "",
        order: "DESC",
        is_kit: -1,
        limit: 1,
        offset: 0
      },
      allProduct: [],
      selected: [],
      searchProduct: [],
      existingItems: []
    };
  }

  componentDidMount(){
    let orderID = this.props.route && this.props.route.params && this.props.route.params.length > 0 && this.props.route.params[0].iteminfo.order_id
    if(orderID){
      let existingItems = []
      this.props.route.params.map((item, index) => {
        existingItems.push(item.productinfo.id)        
      })
      update = true 
      this.setState({existingItems})
      this.props.GetAllProduct(this.state.getAllItem)
    } 
  }

  componentDidUpdate(){
    if(update && this.state.allProduct !== this.props.allProduct){
      let updated = []
      let indexLength = 0
      if(this.props.allProduct && this.props.allProduct.length > 0){
        let existing = this.state.existingItems
        // let filterArray = []
        this.props.allProduct.filter((arrayItem , index) => {
          existing.includes(arrayItem.id)
          ?
            null
          :
            updated.push(arrayItem)
            indexLength = index
        })
        if(this.props.allProduct && this.props.allProduct.length === indexLength+1){
          this.setState({allProduct: updated})
          update = false
        } 
      }
    }
    if(addItemSuccess && this.props.addOrderItems){
      let id = this.props.route.params[0].iteminfo.order_id
      this.props.navigation.navigate("OrderDetail" , {data: id , from : "UpdateOrder"})
      addItemSuccess = false
    }
    if(updateSearch === false && this.props.searchProduct && this.state.searchProduct !== this.props.searchProduct){
      let temp = this.state.searchData
      temp["search"] = ""
      this.setState({allProduct: this.props.searchProduct , searchProduct: this.props.searchProduct , temp})
      update = false
      updateSearch = true
    }
  }

  submitItems(){
    let orderID = this.props.route && this.props.route.params && this.props.route.params[0].iteminfo.order_id
    if(orderID && this.state.selected.length > 0){
      let qty = this.props.route.params[0].iteminfo.qty
      let data = {
                  productids: this.state.selected,
                  qty: 1
                  // qty: qty
                }
      this.props.AddOrderItems(orderID , data)
      addItemSuccess = true
    }
  }

  itemSelect(item){
    let selected = this.state.selected
    var check = selected.includes(item.id)
    if(check){
      const index = selected.findIndex(selected => selected === item.id);
      selected.splice(index, 1)
    }else{
      selected.push(item.id)
    }
    this.setState({selected})
  }

  searchItem(){
    let search = this.state.searchData
    if(search.search !== ""){
      this.props.GetSearchProduct(search)
      updateSearch = false
    }
  }

  handleChange(text){
    let searchData = this.state.searchData
    searchData["search"] = text
    this.setState({searchData})
  }

  componentWillUnmount(){
    update = true
    this.setState({allProduct : [] , searchProduct: []})
  }

  render() {
    let items = this.state.allProduct
    return (
      <View style={{position: "relative"}}>
        <View style={{height: "100%"}}>
          <View style={globalStyles.flexDirectionRow}>
            <View style={[globalStyles.flexDirectionRow, globalStyles.flex7]}>
              <TextInput placeholder="Type order to search"
                         name="searchOrder"
                         autoFocus={true}
                         // ref={this.searchField}
                         value={this.state.searchData && this.state.searchData.search}
                         onChangeText={(text) => this.handleChange(text) }
                         onSubmitEditing={(e) => this.searchItem(e)}
                         style={styles.inputBox}/>
            </View>
          </View>
          <View style={{flexDirection: "row" , alignSelf: "flex-end" , margin: 5 }}>
            <TouchableOpacity onPress={() => this.submitItems() } 
                              style={this.state.selected.length > 0 
                                      ? 
                                        { marginRight: 10 ,
                                          borderWidth: 1 ,
                                          borderStyle: "solid" ,
                                          borderColor: "#336597" ,
                                          borderRadius: 30 ,
                                          backgroundColor: "#336599" ,
                                          height: 40
                                        }
                                      :
                                        { marginRight: 10 ,
                                          borderWidth: 1 ,
                                          borderStyle: "solid" ,
                                          borderColor: "#336597" ,
                                          borderRadius: 30 ,
                                          backgroundColor: "#90aac4" ,
                                          height: 40
                                        }
                                      }>
              <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Save & Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginRight: 10 , borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , borderRadius: 30 , backgroundColor: "#494848" , height: 40}}>
              <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.listContainer}>
            {
              this.state.allProduct && this.state.allProduct.length > 0 && this.state.allProduct.map((item, index) => {
                return(
                  <TouchableOpacity key={index}
                                    onPress={() => this.itemSelect(item)}
                                    delayLongPress={1000}
                                    style={this.state.selected.includes(item.id) && { backgroundColor: "#799cbf" }}
                                  >
                    <View style={styles.orderRow}>
                      <View style={[globalStyles.flex2, styles.orderColumn]}>
                        <Text style={styles.text}>S.No.</Text>
                        <Text style={styles.text}>{index+1}</Text>
                      </View>
                      <View style={[globalStyles.flex3, styles.orderColumn]}>
                        <Text style={styles.text}>Item Name</Text>
                          <Text style={styles.text}>{item.name}</Text>
                      </View>
                      <View style={[globalStyles.flex3, styles.orderColumn]}>
                        <Text style={styles.text}>Sku</Text>
                        <Text style={styles.text}>{item.sku}</Text>
                      </View>
                      <View style={[globalStyles.flex2, styles.orderColumn]}>
                        <Text style={styles.text}>Status</Text>
                        <Text style={styles.text}>{item.status}</Text>
                      </View>
                      <View style={[globalStyles.flex3, styles.orderColumn]}>
                        <Text style={styles.text}>Barcode</Text>
                        <Text style={styles.text}>{item.barcode}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
          <View style={{position: "absolute" , bottom: 10 , backgroundColor: "transparent" ,flexDirection: "row" , alignSelf: "flex-end" , margin: 5 }}>
            <TouchableOpacity onPress={() => this.submitItems() }
                              style={this.state.selected.length > 0 
                                      ? 
                                        { marginRight: 10 ,
                                          borderWidth: 1 ,
                                          borderStyle: "solid" ,
                                          borderColor: "#336597" ,
                                          borderRadius: 30 ,
                                          backgroundColor: "#336599"
                                        }
                                      :
                                        { marginRight: 10 ,
                                          borderWidth: 1 ,
                                          borderStyle: "solid" ,
                                          borderColor: "#336597" ,
                                          borderRadius: 30 ,
                                          backgroundColor: "#90aac4"
                                        }
                                      }>
              <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Save & Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{marginRight: 10 , borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , borderRadius: 30 , backgroundColor: "#494848" , height: 40}}>
              <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProduct: state.product.allProduct,
    addOrderItems: state.order.addOrderItems,
    searchProduct: state.product.searchProduct
  }
};

const mapDispatchToProps = {
  GetAllProduct,
  AddOrderItems,
  GetSearchProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemToOrder)
