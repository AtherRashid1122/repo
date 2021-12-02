import React, { Component , useRef } from 'react';
import { View, Text, TextInput , Image , TouchableOpacity , ScrollView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { UpdateProduct } from '../../actions/scanpackAction';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProducts: [],
      token: ""
    };
    this.updateDetail =  this.updateDetail.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  }

  componentDidMount(){
    if(this.props.route && this.props.route.params && this.props.route.params.data){
      this.setState({newProducts: this.props.route.params.data.inactive_or_new_products})
    }
    this.retrieveData()
  }

  retrieveData = async () => {
    try{
      const token = await AsyncStorage.getItem("access_token")
      const url = await AsyncStorage.getItem("url")
      if (token !== null) {
        this.setState({ token: token , url: url })
      }
    }catch(e){
    }
  }

  updateDetail = (text , type) => {
    let newProducts = this.state.newProducts[0]
    if(type === "barcode"){
      newProducts["barcode"] = text
    }
    if(type === "sku"){
      newProducts["sku"] = text
    }
    let temp = []
    temp.push(newProducts)
    this.setState({newProducts: temp})
  }

  updateProduct = (field) => {
    let name = field
    let product = this.state.newProducts[0]
    let access_token = this.state.token
    let data = {
        id: product.id,
        name: name,
        value: name === "barcode" ? product.barcode : product.sku
    }
    if(access_token !== ""){
      this.props.UpdateProduct( data )
    }
  }

  render() {
    return (
      <View>
        {
          this.props.route && this.props.route.params.data && this.state.newProducts.map((product , index) => {
            return(
                <View key={index}>
                  <View style={[globalStyles.border_1, globalStyles.m_10]}>
                    <View >
                      <View style={[globalStyles.flexDirectionRow, globalStyles.alignItmCntr]}>
                        <Text style={styles.productEditLabel}>
                          S.No.
                        </Text>
                        <Text style={styles.productEditVal}>{index+1}</Text>
                      </View>
                      <View style={[globalStyles.flexDirectionRow, globalStyles.alignItmCntr]}>
                        <Text style={styles.productEditLabel}>
                          Item Name
                        </Text>
                        <Text style={styles.productEditVal}>{product.name}</Text>
                      </View>
                      <View style={[globalStyles.flexDirectionRow, globalStyles.alignItmCntr]}>
                        <Text style={styles.productEditLabel}>
                          status
                        </Text>
                        <Text style={styles.productEditVal}>{product.status}</Text>
                      </View>
                      <View style={[globalStyles.flexDirectionRow, globalStyles.alignItmCntr]}>
                        <Text style={styles.productEditLabel}>
                          SKU
                        </Text>
                        <TextInput value={product.sku !== null ? product.sku : ""}
                           // ref={this.props.barcode}
                           onSubmitEditing={this.updateProduct.bind(this , "sku")}
                           onBlur={this.updateProduct.bind(this , "sku")}
                           onChangeText={(text) => this.updateDetail(text ,"sku")}
                           style={styles.productEditVal}
                           placeholder="SKU"
                          />
                      </View>
                      <View style={[globalStyles.flexDirectionRow, globalStyles.alignItmCntr]}>
                        <Text style={styles.productEditLabel}>
                          Barcode
                        </Text>
                        <TextInput value={product.barcode !== null ? product.barcode : ""}
                           // ref={this.props.barcode}
                           onSubmitEditing={this.updateProduct.bind(this , "barcode")}
                           onBlur={this.updateProduct.bind(this , "barcode")}
                           onChangeText={(text) => this.updateDetail(text ,"barcode")}
                           style={styles.productEditVal}
                           placeholder="Barcode"
                          />
                      </View>
                    </View>
                  </View>
                </View>
              )
          })
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = {
  UpdateProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)

