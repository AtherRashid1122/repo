import React, { Component } from 'react';
import { View, Text, TextInput , ScrollView} from 'react-native';
import moment from 'moment';
import globalStyles from '../../style/global';
import styles from '../../style/productdetail';

export default class ProductActivityLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let activities = this.props.activities
    return (
      <View style={styles.productActivityLogContainer}>
        <Text style={styles.productActivityLogHeading}>Product Activity Log</Text>
        <ScrollView style={globalStyles.fullWidth}>
        {
          activities && activities.slice(0).reverse().map((log , index)=> {
            return(
                <View key={index} style={styles.productActivityLogMainView}>
                  <View style={styles.productActivityLogIndex}>
                    <Text>{index+1}</Text>
                  </View>
                  <View style={styles.productActivityLogView}>
                    <Text style={styles.productActivityLogViewActionUser}>Action: {log.action}</Text>
                    <Text style={styles.productActivityLogViewActionUser}>User: {log.username}</Text>
                    <Text style={styles.productActivityLogViewTime}>
                      {moment(log.activitytime).format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
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
