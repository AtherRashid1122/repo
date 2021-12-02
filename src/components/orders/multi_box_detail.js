import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../style/global';

export default class MultiBoxDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={globalStyles.m_10}>
        <Text>Multi Box Detail</Text>
      </View>
    );
  }
}
