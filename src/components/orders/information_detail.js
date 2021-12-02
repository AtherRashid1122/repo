import React, { Component } from 'react';
import { View, Text, TextInput , ScrollView } from 'react-native';
import moment from 'moment';
import styles from '../../style/orderdetail';
import globalStyles from '../../style/global';

export default class InformationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let basicinfo = this.props && this.props.basicinfo
    return (
      <ScrollView style={styles.itemDetailContainer}>
        {
          basicinfo &&
            <View style={[styles.roundedBox, styles.bgGray]}>
              <View style={globalStyles.m_10}>
                <Text style={[styles.headerText, globalStyles.mx_10]}>
                  Order Detail
                </Text>
                <View>
                  <Text style={globalStyles.py_10}>First Name</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("firstname" , text)}
                      value={basicinfo.firstname}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Last Name</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("lastname" , text)}
                      value={basicinfo.lastname}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Company</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("company" , text)}
                      value={basicinfo.company}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Address line 1</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("address_1" , text)}
                      value={basicinfo.address_1}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Address line 2</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("address_2" , text)}
                      value={basicinfo.address_2}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>City</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("city" , text)}
                      value={basicinfo.city}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>State</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("state" , text)}
                      value={basicinfo.state}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Custome 11</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("custom_field_one" , text)}
                      value={basicinfo.custom_field_one}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Order #</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("increment_id" , text)}
                      value={basicinfo.increment_id}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Buyer Email</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("email" , text)}
                      value={basicinfo.email}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Store Order id</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("store_order_id" , text)}
                      value={basicinfo.store_order_id}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Order Date</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.setState({text})}

                      value={ moment(basicinfo.order_placed_time).format('MMMM Do YYYY, h:mm:ss a')}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Zip</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("postcode" , text)}
                      value={basicinfo.postcode}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Country</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("country" , text)}
                      value={basicinfo.country}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>444</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("custom_field_two" , text)}
                      value={basicinfo.custom_field_two}/>
                </View>
              </View>
              <View style={globalStyles.mx_10}>
                <Text style={[styles.headerText, globalStyles.mx_10]}>
                  Shipping Information
                </Text>
                <View>
                  <Text style={globalStyles.py_10}>Scanned on</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("scanned_on" , text)}
                      value={basicinfo.scanned_on}/>
                </View>
                <View>
                  <Text style={globalStyles.py_10}>Tracking id #</Text>
                  <TextInput
                      style={[styles.roundedBox, globalStyles.bgWhite]}
                      onChangeText={(text) => this.props.handleChange("tracking_num" , text)}
                      value={basicinfo.tracking_num}/>
                </View>
              </View>
            </View>
        }
      </ScrollView>
    );
  }
}
