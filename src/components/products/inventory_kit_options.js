import React, { Component } from 'react';
import { View, Text, TextInput , TouchableOpacity , ScrollView} from 'react-native';
import globalStyles from '../../style/global';
import styles from '../../style/productdetail';

export default class InventoryKitOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let {inventoryWarehouses} = this.props;
    return (
      <View style={styles.inventoryContainer}>
        <ScrollView style={globalStyles.fullWidth}>
          {
            inventoryWarehouses && inventoryWarehouses.length > 0 && inventoryWarehouses.map((item , index) => {
              return(
                  <View key={index} style={styles.inventoryColumnMainView}>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Warehouse Name</Text>
                      <Text style={styles.inventoryColumnViewValue}>{item.warehouse_info.name}</Text>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Status</Text>
                      <Text style={styles.inventoryColumnViewValue}>{item.warehouse_info.status}</Text>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Available Inv</Text>
                      <Text style={styles.inventoryColumnViewValue}>{item.info.available_inv}</Text>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Allocated Inv</Text>
                      <Text style={styles.inventoryColumnViewValue}>{item.info.allocated_inv}</Text>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Solid Inv</Text>
                      <Text style={styles.inventoryColumnViewValue}>{item.info.sold_inv}</Text>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>QoH</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "quantity_on_hand" )}
                                 value={item.info.quantity_on_hand}
                                 keyboardType={'numeric'}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Primary Location</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "location_primary" )}
                                 value={item.info.location_primary}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Primary Location Qty</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "location_primary_qty" )}
                                 value={item.info.location_primary_qty}
                                 keyboardType={'numeric'}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Secondary Location</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "location_secondary" )}
                                 value={item.info.location_secondary}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Secondary Location Qty</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "location_secondary_qty" )}
                                 value={item.info.location_secondary_qty}
                                 keyboardType={'numeric'}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Tertiary Location</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "location_tertiary" )}
                                 value={item.info.location_tertiary}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Tertiary Location Qty</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "location_tertiary_qty" )}
                                 value={item.info.location_tertiary_qty}
                                 keyboardType={'numeric'}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Quaternary Location</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name) => this.props.inventoryWarehousesHandleChange(text, "location_quaternary" )}
                                 value={item.info.location_quaternary}/>
                    </View>
                    <View style={styles.inventoryColumnView}>
                      <Text style={styles.inventoryColumnViewLabel}>Quaternary Location Qty</Text>
                      <TextInput style={styles.inventoryColumnViewValue}
                                 onChangeText={(text, name , item) => this.props.inventoryWarehousesHandleChange(text, "location_quaternary_qty" , item )}
                                 value={item.info.location_quaternary_qty}
                                 keyboardType={'numeric'}/>
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
