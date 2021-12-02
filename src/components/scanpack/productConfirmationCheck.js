import React, { Component , useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions , Image } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import cross from "../../../assets/close_black.png";
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native-webview';

export default class ProductConfirmationCheck extends Component{
  constructor(props) {
    super(props);
    this.typeScanFocus = React.createRef();
  }

  componentDidUpdate(){
    this.typeScanFocus.current.focus()
  }

  render(){
    let htmlProps = this.props.instruction.instruction.replace("" , '')
    return (
      <View style={styles.typeScanContainer}>
        <View style={styles.typeScanBox}>
          <View style={globalStyles.flexDirectionRow}>
            <Text style={styles.scanCountText}>
              Please acknowledge with your confirmation code to continue
            </Text>
            <TouchableOpacity onPress={this.props.closeAlert}>
              <Image style={{height: 30 , width: 30}} source={cross} /> 
            </TouchableOpacity>
          </View>
          <HTML html={`${htmlProps}`} imagesMaxWidth={Dimensions.get('window').width} />
          <View style={{display: "flex" , alignItems: "center"}}>
            <TextInput value={this.props.ProductConfirmationCheckInput}
                       onChangeText={this.props.handleProductConfirmationCheckInput}
                       placeholder="Enter Confirmation Code to Continue"
                       autoFocus={true}
                       ref={this.typeScanFocus}
                       onSubmitEditing={this.props.ProductConfirmationCheckFun}
                       style={styles.typeScanCountInput}>
            </TextInput>
            {
              this.props.errorMessageClickScanConfirmation &&
              <Text style={{padding: 5 , fontSize: 16 , color: "#000" , textAlign: "center"}}>
                Enter or scan your confirmation code to continue
              </Text>
            }
            {/*<TouchableOpacity onPress={this.props.clickScanConfirmFun}
                              style={styles.scanCountSubmitBtnBox}>
              <Text style={styles.scanCountSubmitBtn}>
                Submit
              </Text>
            </TouchableOpacity>*/}
          </View>
        </View>
      </View>
    );
  }
}
