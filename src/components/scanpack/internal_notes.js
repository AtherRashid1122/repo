import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../style/scanpack';

export default function Notes(props){
  return (
    <View style={{width: "100%"}}>
     
     {
        props.show_internal_notes && props.order.order.notes_internal !== "" &&
          <View style={styles.internalNoteBar}>
            <Text style={styles.internalNoteText}> {props.order.order.notes_internal}</Text>
            <TouchableOpacity onPress={() => props.close("show_internal_notes")}>
              <Text style={styles.closeButton}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
      }
      {
        props.show_customer_comments && props.order.order.customer_comments !== "" &&
          <View style={styles.internalNoteBar}>
            <Text style={styles.internalNoteText}>{props.order.order.customer_comments}</Text>
            <TouchableOpacity onPress={() => props.close("show_customer_notes")}>
              <Text style={styles.closeButton}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
      }
      {
        props.notes_toPacker && props.order.order.notes_toPacker !== "" &&
          <View style={styles.internalNoteBar}>
            <Text style={styles.internalNoteText}>{props.order.order.notes_toPacker}</Text>
            <TouchableOpacity onPress={() => props.close("notes_toPacker")}>
              <Text style={styles.closeButton}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
      }
    </View>
  );
}
