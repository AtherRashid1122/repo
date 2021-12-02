import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';
import { fontFamily } from '../../helpers/fontFamily';
import { LinearGradient } from 'expo-linear-gradient';


export default class AddBarcode extends Component {
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
					locations={[0, 1]}
					start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
					colors={["#d47d02", "#ffb636"]}
					style={[styles.typeScanBox, { backgroundColor: "#b7b7b7", paddingHorizontal: 10, paddingVertical: 5 }]}>
					<View style={globalStyles.flexDirectionRow}>
						<View style={{ flexDirection: "column" }}>
							<Text style={[styles.scanCountText, { fontFamily: fontFamily.font400, fontSize: 20 }]}>
								Carefully check the item before scanning.
							</Text>
							<Text style={[styles.scanCountText, { fontFamily: fontFamily.font400, fontSize: 20 }]}>
								It will be saved and also marked "scanned".
							</Text>
						</View>
					</View>
					<View style={{ display: "flex", alignItems: "center", flexDirection: 'row' }}>
						<TextInput
							value={this.props.addBarcodeText}
							onChangeText={this.props.addBarcodeChange}
							autoFocus={true}
							ref={this.typeScanFocus}
							onSubmitEditing={this.props.addBarcodeText !== "" ? this.props.addBarcodeSubmit : ""}
							style={[styles.typeScanCountInput, { backgroundColor: "#df8b0f", outline: "none", width: "60%", color: "#000", fontFamily: fontFamily.font500, fontSize: 18 }]}>
						</TextInput>
						<TouchableOpacity onPress={this.props.closeAlert}
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
}