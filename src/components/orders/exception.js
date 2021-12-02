import React, { Component } from 'react';
import { View, Text, TextInput , ScrollView} from 'react-native';
import styles from '../../style/orderdetail';

export default class Exception extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activitiesActive: true,
      exceptionActive: false
    };
  }

  render() {
    let exception = this.props.exception
    return (
      <View>
        <Text style={styles.headerText}>Packing Exceptions</Text>
        <ScrollView style={styles.itemDetailContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.inputBox}
            onChangeText={(text) => this.setState({text})}
            value={exception}/>
        </ScrollView>
      </View>
    );
  }
}
