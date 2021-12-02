import React, { Component  , useRef} from 'react';
import { View, SafeAreaView , Text, ActivityIndicator, TextInput , TouchableOpacity , ScrollView, Alert ,ListView , Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { SearchScanpackOrder } from "../../actions/scanpackAction";
import NetInfo from "@react-native-community/netinfo";
import { GetOrderList , SearchOrder } from "../../actions/orderActions";
import { SetItem , GetItem } from "../../actions/updateAsyncAction";
import { GetGeneralSetting } from "../../actions/userAction";
import globalStyles from '../../style/global';
import styles from '../../style/orderlist';
// import jsondata from "../../../data.json"

let ordersListSuccess = true ;
let searchOrderSuccess = false;
let searchOrderCheck = false;
let generalSettingsCheck = false;
let saveData = false;
let updateComponent = true;

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{
        "filter": "awaiting",
        "order": "DESC",
        "limit": "1",
        "offset": "0",
        "app": "app",
        "count": 0
      },
      scanpack:{
        "input": "",
        "state": "scanpack.rfo",
        "id": null,
        "box_id": null,
        "store_order_id": null,
        "app": "app"
      },
      connection_Status : "",
      updateData: [],
      searchOrdersCheck: [],
      errorMessage: "No Record Found",
      loading: false,
      loaderTitle: "Loading..."

    };
    this.searchField = React.createRef();
  }

  componentDidMount = async() => {
    this.setState({loading: true})
    this.hitApi()
  }

  //According to platform call the function
  hitApi = () => {
    if(Platform.OS === "ios" || Platform.OS === "android"){
      this.CheckConnection()
    }else{
      this.apiCall()
    }
  }

  //Check the connection for the ios and android
  CheckConnection = async() => {
    const connectionInfo = await NetInfo.fetch();
    if(connectionInfo.isConnected){
      this.apiCall();
    }else{
      this.setState({errorMessage: "Please check your internet connection"})
    }
  }

  //Call the api to fetch the data from backend
  apiCall = () => {
    this.props.GetOrderList(this.state.data);
    ordersListSuccess = false
  }

  //Set focus on the field
  setFocusField = () => {
    this.state.loading === false &&  this.searchField.current.focus();
  }

  //Logout function
  logout = async() =>{
    try {
      await AsyncStorage.removeItem("access_token")
      this.props.navigation.reset({index: 0, routes: [{ name: 'SignIn' }] })
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  //Handle the input for the search order field
  handleChange = (name , value) => {
    let scanpack =  this.state.scanpack;
    if(name === "searchOrder")
    {
      scanpack["input"] = value
    }
    this.setState({scanpack})
  }

  componentDidUpdate (){
    let nextProps = this.props
    let scanpack = this.state.scanpack
    let searchOrder =  this.props.SearchScanPackOrder;
    let searchData = searchOrder && searchOrder.data
    let upList =  false
    
    // Update the order list  
    if(this.props && this.props.ordersList && this.state.searchOrdersCheck !== this.props.ordersList){
      ordersListSuccess = true
      scanpack["input"] = ""
      upList = true
      this.setState({ searchOrdersCheck: nextProps.ordersList ,
                      orders: nextProps.ordersList.orders ,
                      scanpack,
                      loading: false
                    })
      this.setFocusField()
    }

    //update the search order in state
    if(updateComponent === true && this.props && this.props.SearchScanPackOrder && this.props.SearchScanPackOrder !== this.state.searchOrder){
      searchOrderSuccess = true
      updateComponent = false
      scanpack["input"] = ""
      this.setState({orders: nextProps.SearchScanPackOrder.data.order , scanpack , seaarchOrder: this.props.SearchScanPackOrder})
      this.setFocusField()
    }

  }

  //Redirect ot the scanpack Item page 
  searchProduct = (item) =>{
    if(item.scan_hash !== null){
      updateComponent = true
      this.props.navigation.navigate("ScanPackItem" , {data: item.scan_hash.data})
    }
  }

  //Search the order when useer hit the enter on the field
  searchOrder = () => {
    let scanpack = this.state.scanpack
    this.props.SearchScanpackOrder(scanpack)
    searchOrderSuccess = false
  }

  
  itemDetail = (item) => {
    if(item){
      console.log("item detail", item)
      this.props.navigation.navigate("OrderDetail" , {item})
    }
  }

  componentWillUnmount(){
    ordersListSuccess = false;
    searchOrderSuccess = false;
    saveData = false;
  }

  render() {
    return (
      <SafeAreaView style={globalStyles.flex1}>
        {
          this.state.loading
            ?
            <View style={{flex: 1 , justifyContent: "center"}}>
              <ActivityIndicator size="large" color="#336599"/>
              <Text style={{fontSize: 13 , fontWeight: 500 , textAlign: "center"}}>{this.state.loaderTitle}</Text>
            </View>
            :
            <>        
              <View style={globalStyles.flexDirectionRow}>
                <View style={[globalStyles.flexDirectionRow, globalStyles.flex7]}>
                  <TextInput placeholder="Type order to search "
                             name="searchOrder"
                             autoFocus={true}
                             ref={this.searchField}
                             value={this.state.scanpack.input}
                             onChangeText={(text) => {this.handleChange("searchOrder", text)}}
                             onSubmitEditing={this.searchOrder.bind(this)}
                             style={styles.inputBox}/>
                </View>
              </View>
              { 
              	this.props.ordersList && this.state.orders &&
              	<View>
      		        {
      		        	this.state.orders.length > 0
      		        	?
      				        <ScrollView style={styles.listContainer}>
      				          {
      				            this.state.orders && this.state.orders.map((item, index) => {
      				              return(
      				                <TouchableOpacity key={index}
      				                                  onPress={this.itemDetail.bind(this, item)}
      				                                  onLongPress={this.searchProduct.bind(this, item)}
      				                                  delayLongPress={1000}
      				                                >
      				                  <View style={styles.orderRow}>
      				                    <View style={[globalStyles.flex2, styles.orderColumn]}>
      				                      <Text style={styles.text}>S.No.</Text>
      				                      <Text style={styles.text}>{index+1}</Text>
      				                    </View>
      				                    <View style={[globalStyles.flex3, styles.orderColumn]}>
      				                      <Text style={styles.text}>Order #</Text>
      				                        <Text style={styles.text}>{item.order_info.ordernum}</Text>
      				                    </View>
      				                    <View style={[globalStyles.flex3, styles.orderColumn]}>
      				                      <Text style={styles.text}>Store</Text>
      				                      <Text style={styles.text}>{item.order_info.store_name}</Text>
      				                    </View>
      				                    <View style={[globalStyles.flex2, styles.orderColumn]}>
      				                      <Text style={styles.text}>Item</Text>
      				                      <Text style={styles.text}>{item.order_info.itemslength}</Text>
      				                    </View>
      				                    <View style={[globalStyles.flex3, styles.orderColumn]}>
      				                      <Text style={styles.text}>Status</Text>
      				                      <Text style={styles.text}>{item.order_info.status}</Text>
      				                    </View>
      				                  </View>
      				                </TouchableOpacity>
      				              )
      				            })
      				          }
      				        </ScrollView>
      				    :
      		        		<View style={{alignItems: "center"}}>
      							<Text style={{ fontSize: 16 , fontWeight: 500 }}>{this.state.errorMessage}</Text>
      						</View>
      		        }
          		    </View>
          		}
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.hitApi()}>
                  <Text style={[styles.button]}>
                    All Orders
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logout.bind(this)}>
                  <Text style={[styles.button, globalStyles.m_10]}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </>
        }      
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ordersList: state.order.list,
    searchOrder: state.order.searchResult,
    SearchScanPackOrder: state.scanpack.searchOrder,
    generalSettings: state.user.settings,
    saveData: state.updateAsync.retriveData
  }
};

const mapDispatchToProps = {
  GetOrderList,
  SearchOrder,
  SearchScanpackOrder,
  GetGeneralSetting,
  SetItem,
  GetItem
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
