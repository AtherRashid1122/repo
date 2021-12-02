import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';

export default function ShipmentRecord(props){
  let Ship = props.Shipment
  return (
    <View style={styles.shipContainer}>
      {
        props.errorMessageShow === false
          ?
            <View>
            {
              Ship && Ship.se_all_shipments &&
                <View>
                  <Text style={styles.shipParagraph}>Additional shipments Associated With this order </Text>
                  {
                    Ship.se_all_shipments &&
                      Ship.se_all_shipments.shipments.length > 0 &&
                        Ship.se_all_shipments.shipments.map((order , index) =>{
                          return(
                            <View key={index}>
                              <View style={styles.shipOrderTextContainer}>
                                <TouchableOpacity onPress={() => props.callOrder(order)}>
                                  <Text style={styles.shipOrderLink}>
                                    {order.increment_id}
                                  </Text>
                                </TouchableOpacity>
                                <Text> Contains {order.items_count} items(s)</Text>
                              </View>
                            </View>
                          )
                        })
                  }
                  <TouchableOpacity onPress={props.hideShipment} style={styles.shipCloseButton}>
                    <Text style={styles.shipOrderTextContainer}>
                        Once all unwanted shipments are removed you can click here to acknowledge and continue.
                      </Text>
                  </TouchableOpacity>
                </View>
            }
            {
              Ship && Ship.se_old_combined_shipments &&
                <View>
                  <Text style={styles.shipParagraph}>
                    One of the shipments associated with this order was scanned in GroovePacker and then combined in ShippingEasy. Rather than modifying an order that has been scanned we are letting you know so you can take any action that is required  </Text>
                    {
                      Ship.se_old_combined_shipments &&
                        Ship.se_old_combined_shipments.length > 0 &&
                          Ship.se_old_combined_shipments.map((order , index) =>{
                            return(
                              <View key={index}>
                                <View style={styles.shipOrderTextContainer}>
                                  <TouchableOpacity onPress={() => props.callOrder(order)}>
                                    <Text style={styles.shipOrderLink}>
                                      {order.increment_id}
                                    </Text>
                                  </TouchableOpacity>
                                  <Text> {order.status} </Text>
                                </View>
                              </View>
                            )
                          })
                    }
                    <TouchableOpacity onPress={props.hideShipment} style={styles.shipCloseButton}>
                      <Text style={styles.shipOrderTextContainer}>
                        Once all unwanted shipments are removed you can click here to acknowledge and continue.
                      </Text>
                    </TouchableOpacity>
                </View>
            }
            {
              Ship && Ship.se_old_split_shipments &&
                <View>
                  <Text style={styles.shipParagraph}>One of the shipments associated with this order was scanned in GroovePacker and then combined in ShippingEasy. Rather than modifying an order that has been scanned we are letting you know so you can take any action that is required  </Text>
                  {
                    Ship.se_old_split_shipments &&
                      Ship.se_old_split_shipments.length > 0 &&
                        Ship.se_old_split_shipments.map((order , index) =>{
                          return(
                            <View key={index}>
                              <View style={styles.shipOrderTextContainer}>
                                <TouchableOpacity onPress={() => props.callOrder(order)}>
                                  <Text style={styles.shipOrderLink}>
                                    {order.increment_id}
                                  </Text>
                                </TouchableOpacity>
                                <Text>{order.status}</Text>
                              </View>
                            </View>
                          )
                        })
                  }
                  <TouchableOpacity onPress={props.hideShipment} style={styles.shipCloseButton}>
                      <Text style={styles.shipOrderTextContainer}>
                        Once all unwanted shipments are removed you can click here to acknowledge and continue.
                      </Text>
                  </TouchableOpacity>
                </View>
            }
            </View>
          :
            <View>
              <Text style={styles.shipParagraph}>
                {props.errorMessage}
              </Text>
              <TouchableOpacity onPress={props.hideShipment} style={styles.shipCloseButton}>
                <Text style={styles.shipOrderTextContainer}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>

      }

    </View>
  );
}
