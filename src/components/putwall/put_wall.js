import React, { Component } from 'react';
import { View, Text, TextInput , Image, ScrollView } from 'react-native';

export default class PutWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {basicinfo , images} = this.props
    return (
      <View>
        <Text> Put wall Page </Text>
      </View>
    );
  }
}
