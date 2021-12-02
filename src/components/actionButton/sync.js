import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import sync from "../../../assets/sync.png";
import { SubmitLog } from "../../actions/saveLogAction";
import { fontFamily } from '../../helpers/fontFamily';

let submitLogSuccess = false

class SyncButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: Dimensions.get('window').width
		};
	}

	syncSubmit = async () => {
		let getItem = await AsyncStorage.getItem("logsArray")
		let count = getItem !== null && JSON.parse(getItem)
		if (count && count.length > 0) {
			this.props.SubmitLog(count)
			submitLogSuccess = true
		}
	}

	componentDidUpdate() {
		if (this.props && this.props.saveLog && submitLogSuccess) {
			submitLogSuccess = false
			this.props.syncButtonHandle()
		}
	}
	updateDimensions = () => {
		this.setState({
			windowWidth: window.innerWidth
		})
	}
	componentDidMount() {
		window.addEventListener('resize',this.updateDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions)
	}

	render() {
		return (
			<>
				{
					this.props.alertShow === false && this.state.windowWidth >= 900 &&
					<TouchableOpacity onClick={() => this.syncSubmit()}>
						<View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 20 }}>
							<Image style={this.state.windowWidth > 1024 ? { width: 35, height: 30 } : { width: 30, height: 30 }}
								source={sync ? sync : ""} />
							<View style={{ flexDirection: "column" }}>
								<Text style={this.state.windowWidth > 1024 ? { color: "#fff", fontSize: 18, textShadowColor: "#fff", fontFamily: fontFamily.font500, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 } : { color: "#fff", fontSize: 16, textShadowColor: "#fff", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }}>Sync</Text>
								<Text style={this.state.windowWidth > 1024 ? { color: "#fff", fontSize: 12, textShadowColor: "#fff", fontFamily: fontFamily.font400, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 } : { color: "#fff", fontSize: 10, textShadowColor: "#fff", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }}>Changes</Text>
							</View>
						</View>
					</TouchableOpacity>
				}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		saveLog: state.saveLog
	}
};

const mapDispatchToProps = {
	SubmitLog
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncButton)
