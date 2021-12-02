import React, { Component , useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView , Image } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import cross from "../../../assets/close_black.png";

export default class ConfirmTrackingNumber extends Component{
  constructor(props) {
    super(props);
    this.trackingFocus = React.createRef();
  }

  componentDidUpdate(){
    this.trackingFocus.current.focus()
  }

  render(){
    return (
     <View style={globalStyles.flex1}>
        <View style={globalStyles.flexDirectionRow}>
          {
            this.props.postScanningFieldLabel &&
              <Text style={{ marginLeft: 20 , marginTop: 10 , fontWeight: "bold" , fontSize: 15 }}>
                {this.props.postScanningFieldLabel}
              </Text>
          }
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <TextInput {...this.props}
                       placeholder="Scan"
                       name="trackingOrder"
                       autoFocus={true}
                       ref={this.trackingFocus}
                       value={this.props.trackingOrderInput}
                       onChangeText={this.props.onChangeText}
                       onSubmitEditing={this.props.onSubmitEditing}
                       style={styles.inputBox}/>
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow:1, justifyContent: 'center' }}>
          {
            this.props.postScanningMessageDetail &&
              <Text style={styles.text}>
                {this.props.postScanningMessageDetail} 
              </Text>
          }
          </ScrollView>
        </View>
      </View>
    );
  }
}
