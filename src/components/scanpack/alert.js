import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import { fontFamily } from '../../helpers/fontFamily';
import { LinearGradient } from 'expo-linear-gradient';

export default function Alert(props) {
  const addNoteFocus = useRef(null)
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    addNoteFocus.current.focus()
  })
  return (
    <View style={styles.typeScanContainer}>
      <LinearGradient
        locations={[0, 1]}
        colors={["#fdf359", "#d2c609"]}
        style={[styles.typeScanBox, { backgroundColor: "#d3dfea", paddingHorizontal: 10, paddingVertical: 5, width: windowWidth >= 900 ? "70%" : "100%" }]}>
        <View style={[globalStyles.flexDirectionRow], { marginTop: 10, alignItems: "center" }}>
          <Text style={[styles.scanCountText, { fontFamily: fontFamily.font400, fontSize: 20 }]}>
            Add a Note
          </Text>
        </View>
        <View style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
          <TextInput
            value={props.notes_fromPacker}
            onChangeText={props.noteUpdate}
            autoFocus={true}
            onSubmitEditing={props.notes_fromPacker !== "" ? props.submitAlert : ""}
            ref={addNoteFocus}
            multiline={true}
            blurOnSubmit={true}
            numberOfLines={3}
            style={[styles.typeScanCountInput, { backgroundColor: "#f2e730", outline: "none", width: "90%", color: "#000", fontFamily: fontFamily.font500, fontSize: 18, textAlign: "left", padding: 5 }]}>
          </TextInput>
          <TouchableOpacity onPress={props.closeAlert}
            style={[styles.scanCountSubmitBtnBox, { marginTop: 20 }]}
          >
            <Text style={[styles.scanCountSubmitBtn, { fontFamily: fontFamily.font400 }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={this.props.serialRecordInput !== "" ? this.props.serialRecordFun :  ""}
                            style={styles.scanCountSubmitBtnBox}
                            >
            <Text style={styles.scanCountSubmitBtn}>
              Submit
            </Text>
          </TouchableOpacity>*/}
        </View>
      </LinearGradient>
    </View>
  );
}
