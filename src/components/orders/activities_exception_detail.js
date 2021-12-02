import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Activities from "./activities";
import Exception from "./exception";
import styles from '../../style/orderdetail';
import globalStyles from '../../style/global';

export default class ActivitiesExceptionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activitiesActive: true,
      exceptionActive: false
    };
  }

  componentDidMount(){
  }

  changeState = (state) => {
    if(state === "activitiesActive"){
      this.setState({activitiesActive: true , exceptionActive: false})
    }
    if(state === "exceptionActive"){
      this.setState({activitiesActive: false , exceptionActive: true})
    }
  }

  render() {
    let exception = this.props.exception
    let activities = this.props.activities
    return (
      <View>
        <View style={styles.activityContainer}>
          <TouchableOpacity onPress={this.changeState.bind(this , "activitiesActive")} style={{flex:2}}>
            <Text style={[styles.activityTab, {backgroundColor: this.state.activitiesActive ? "white" : "black" , color: this.state.activitiesActive ? "black" : "white" }]}>
              Activities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.changeState.bind(this , "exceptionActive")} style={{flex:2}}>
            <Text style={[styles.activityTab, {backgroundColor: this.state.exceptionActive ? "white" : "black" , color: this.state.exceptionActive ? "black" : "white"}]}>
              Exception
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[globalStyles.m_10, globalStyles.p_10, globalStyles.border_1]}>
        {
          this.state.activitiesActive &&
            <Activities activities={activities}/>
        }
        {
          this.state.exceptionActive &&
            <Exception exception={exception}/>
        }
        </View>
      </View>
    );
  }
}
