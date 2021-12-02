import React, { Component , useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView , Image } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import cross from "../../../assets/close_black.png";

export default class TypeScanAlert extends Component{
  constructor(props) {
    super(props);
    this.typeScanFocus = React.createRef();
  }
  componentDidUpdate(){
    this.typeScanFocus.current.focus()
  }

  render(){
    return (
      <View style={styles.typeScanContainer}>
        <View style={styles.typeScanBox}>
          <View style={globalStyles.flexDirectionRow}>
            <Text style={styles.scanCountText}>
              Type Scan Count
            </Text>
            <TouchableOpacity onPress={this.props.closeAlert}>
              <Image style={{height: 30 , width: 30}} source={cross} /> 
            </TouchableOpacity>
          </View>
          <View style={{display: "flex" , alignItems: "center"}}>
            <TextInput value={this.props.typeScanCount}
                       onChangeText={this.props.typeScanCountUpdate}
                       autoFocus={true}
                       ref={this.typeScanFocus}
                       onSubmitEditing={this.props.typeScanCount !== "" ? this.props.submitTypeScan :  ""}
                       style={styles.typeScanCountInput}>
            </TextInput>
            <TouchableOpacity onPress={this.props.typeScanCount !== "" ? this.props.submitTypeScan :  ""}
                              style={styles.scanCountSubmitBtnBox}>
              <Text style={styles.scanCountSubmitBtn}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>  
        </View>
      </View>
    );
  }
}
