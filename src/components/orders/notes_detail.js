import React, { Component } from 'react';
import { View, Text, TextInput ,Platform , ScrollView , TouchableOpacity } from 'react-native';
import styles from '../../style/orderdetail';
import globalStyles from '../../style/global';

export default class NotesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let basicinfo = this.props && this.props.basicinfo
    return (
      <ScrollView style={styles.itemDetailContainer}>
        {
          basicinfo &&
            <View style={styles.roundedBox}>
              <View style={[styles.roundedBox, styles.bgGray]}>
                {
                  Platform.OS === "web"
                  ?
                  <View style={{flex: 1 , flexDirection: "row" , alignSelf: "flex-end" , margin: 5 }}>
                    <TouchableOpacity 
                      onPress={this.props.updateBasicInfo} 
                      style={{marginRight: 10 , borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , borderRadius: 30 , backgroundColor: "#494848" , height: 40}}>
                      <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 ,
                                               borderWidth: 1 ,
                                               borderStyle: "solid" ,
                                               borderColor: "#336597" ,
                                               borderRadius: 30 ,
                                               backgroundColor: "#336599" ,
                                               height: 40}}
                                      onPress={this.props.updateBasicInfo}         
                                      >
                      <Text style={{color: "white" , padding: 10 , fontWeight: "bold"}}>Save & Close</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{flexDirection: "row" , position: "absolute" , backgroundColor: "transparent" , alignSelf: "flex-end" , margin: 5}}>
                    <TouchableOpacity onPress={this.props.back} style={{ borderWidth: 1 , borderStyle: "solid" , borderColor: "#336597" , backgroundColor: "#494848", justifyContent:"center"}}>
                      <Text style={{color: "white" , padding: 4 , fontSize: 13 ,fontWeight: "bold"}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 ,
                                               borderWidth: 1 ,
                                               borderStyle: "solid" ,
                                               borderColor: "#336597" ,
                                               backgroundColor: "#336599" ,
                                               justifyContent: "center"
                                             }}
                                      onPress={this.props.updateBasicInfo}         
                                      >
                      <Text style={{color: "white" , padding: 4 , fontSize: 13  ,fontWeight: "bold"}}>Save & Close</Text>
                    </TouchableOpacity>
                  </View>
                }
                <View style={globalStyles.m_10}>
                  <Text style={styles.headerText}>Internal Notes</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputBox}
                    onChangeText={(text) => this.props.handleChange("notes_internal" , text)}
                    value={basicinfo.notes_internal}/>
                </View>
                <View style={globalStyles.m_10}>
                  <Text style={styles.headerText}>Notes to Packer</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputBox}
                    onChangeText={(text) => this.props.handleChange("notes_toPacker" , text)}
                    value={basicinfo.notes_toPacker}/>
                </View>
                <View style={globalStyles.m_10}>
                  <Text style={styles.headerText}>Customer Comments</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputBox}
                    onChangeText={(text) => this.props.handleChange("customer_comments" , text)}
                    value={basicinfo.customer_comments}/>
                </View>
              </View>
              <View style={[styles.roundedBox, styles.bgGray]}>
                <View style={globalStyles.m_10}>
                  <Text style={styles.headerText}>Notes from Packer</Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputBox}
                    onChangeText={(text) => this.props.handleChange("notes_fromPacker" , text)}
                    value={basicinfo.notes_fromPacker}/>
                </View>
              </View>
            </View>
        }
      </ScrollView>
    );
  }
}
