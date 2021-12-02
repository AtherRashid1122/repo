import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../style/scanpack';
import { LinearGradient } from 'expo-linear-gradient';
import { fontFamily } from '../../helpers/fontFamily';

export default class OrderConfirmationPopUp extends Component {
  constructor(props) {
    super(props);
    this.typeScanFocus = React.createRef();
  }

  componentDidUpdate() {
    this.typeScanFocus.current.focus()
  }

  render() {
    return (
      <View style={styles.typeScanContainer}>
        <LinearGradient
          locations={[0, 0.13, 1]}
          colors={["#000000", "#fdf359", "#d2c609"]}
          style={[styles.typeScanBox, { backgroundColor: "#d3dfea", paddingHorizontal: 10, paddingVertical: 5, width: '70%' }]}>
          <Text style={[styles.scanCountText, { fontFamily: fontFamily.font400, fontSize: 20, marginTop: 10 }]}>
            Confirmation is required for this note. Other elements are
            darkened until it has been submitted.
          </Text>
          <View style={{ display: "flex", alignItems: "center", flexDirection: 'column', marginTop: 10 }}>
            <TextInput
              value={this.props.OrderConfirmationCheckInput}
              onChangeText={this.props.handleOrderConfirmationCheckInput}
              autoFocus={true}
              ref={this.typeScanFocus}
              onSubmitEditing={this.props.OrderConfirmationCheckFun}
              style={[styles.typeScanCountInput, { backgroundColor: "#f2e730", outline: "none", width: "60%", color: "#000", fontFamily: fontFamily.font500, fontSize: 18 }]}>
            </TextInput>
            <Text style={{ fontFamily: fontFamily.font500, marginTop: 5, textAlign: "center" }}>Enter or scan your confirmation code to continue.</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={this.props.closeAlert}
              style={[styles.scanCountSubmitBtnBox, { marginTop: 20 }]}
            >
              <Text style={[styles.scanCountSubmitBtn, { fontFamily: fontFamily.font400 }]}>
                SKIP
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
