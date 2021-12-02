import React, { Component } from 'react';
import { View, Text, ScrollView , Dimensions } from 'react-native';
import moment from 'moment';
import styles from '../../style/orderdetail';
import globalStyles from '../../style/global';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activitiesActive: true,
      exceptionActive: false
    };
  }

  render() {
    let activities = this.props.activities
    return (
      <View>
        <Text style={styles.headerText}>Activity Log</Text>
        <ScrollView style={[ {height: windowHeight - 310} ,styles.itemDetailContainer]}>
          {
            activities && activities.slice(0).reverse().map((log , index)=> {
              return(
                  <View key={index} style={[globalStyles.flexDirectionRow, globalStyles.m_5]}>
                    <View style={styles.activityIndex}>
                      <Text>{index+1}</Text>
                    </View>
                    <View style={styles.activityDateBox}>
                      <Text style={styles.activityDate}>
                        {moment(log.activitytime).format('MMMM Do YYYY, h:mm:ss a')}
                      </Text>
                      <Text style={styles.logText}>Action: {log.action}</Text>
                    </View>
                  </View>
                )
            })
          }
        </ScrollView>
      </View>
    );
  }
}
