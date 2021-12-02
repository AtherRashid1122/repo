import React, { Component , useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView , Image } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import cross from "../../../assets/close_black.png";

export default class ClickScanConfirmationPopUp extends Component{
  constructor(props) {
    super(props);
    this.typeScanFocus = React.createRef();
  }

  componentDidUpdate(){
    // this.typeScanFocus.current.focus()
  }

  render(){
    return (
      <View style={styles.typeScanContainer}>
        <View style={styles.typeScanBox}>
          <View style={globalStyles.flexDirectionRow}>
            <Text style={styles.scanCountText}>
              This is a note to packer. Confirmation is reqiuired for this note.
            </Text>
            <TouchableOpacity onPress={this.props.closeAlert}>
              <Image style={{height: 30 , width: 30}} source={cross} /> 
            </TouchableOpacity>
          </View>
          <View style={{display: "flex" , alignItems: "center"}}>
            <TextInput value={this.props.clickScanConfirmInput}
                       onChangeText={this.props.handleClickScanConfirmInput}
                       placeholder="Please acknowledge with your confirmation code to continue"
                       autoFocus={true}
                       ref={this.props.serialFocus}
                       onSubmitEditing={this.props.clickScanConfirmFun}
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
