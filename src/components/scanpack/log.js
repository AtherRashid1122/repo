import React from 'react';
import { View, Text , ScrollView} from 'react-native';
import moment from 'moment';
import styles from '../../style/scanpack';
import globalStyles from '../../style/global';

export default function LogView(props){
  let activities = props.activities
  let localLogs = props.localLogs
  return (
    <ScrollView style={styles.logContainer}>
      <View style={styles.logBox}>
        <Text style={styles.logHeaderText}>Activity Logs</Text>
        {
          localLogs && localLogs.slice(0).map((log , index)=> {
            return(
                <View key={index} style={[globalStyles.flexDirectionRow, globalStyles.m_5]}>
                  <View style={styles.logIndex}>
                    <Text>{index+1}</Text>
                  </View>
                  <View style={styles.actionBox}>
                    <Text style={styles.logDate}>
                      {moment(log.time).format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                    {
                      log.event === "regular" &&
                      <View>
                        {
                          log.Log_count !== ""
                            ?
                            <View>
                              <Text style={styles.logAction}>
                                {`Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                              </Text>
                              <Text style={styles.logDate}>
                                {`Multibarcode count of ${log.Log_count} scanned for product ${log.SKU} `}
                              </Text>
                            </View>
                            :
                            <Text style={styles.logAction}>
                                {`INVALID SCAN - Product with barcode: ${log.input} and sku: ${log.SKU} scanned - by: ${log.name}`}
                            </Text>
                        }
                      </View>
                    }
                    {
                      log.event === "click_scan" &&
                        <Text style={styles.logAction}>
                          {` Item with SKU: ${log.SKU} has been click scanned - by: ${log.name}`}
                        </Text>
                    }
                    {
                      log.event === "bulk_scan" &&
                        <Text style={styles.logAction}>
                          {`Item ${log.SKU} scanned through Bulk Scan - by: ${log.name}`}
                        </Text>
                    }
                    {
                      log.event === "type_scan" &&
                        <View>
                          <Text style={styles.logAction}>
                            {`Item with SKU: ${log.SKU} has been click scanned for a Type-In count - by: ${log.name}`}
                          </Text>
                          <Text style={styles.logAction}>
                            {`Type-In count of ${log.count} entered for product ${log.SKU}`}
                          </Text>
                        </View>
                    }

                  </View>
                </View>
              )
          })
        }
      </View>
      {/*<ScrollView style={styles.logContainer}>
        <View style={styles.logBox}>
          <Text style={styles.logHeaderText}>Activity Logs</Text>
          {
            activities && activities.slice(0).map((log , index)=> {
              return(
                  <View key={index} style={[globalStyles.flexDirectionRow, globalStyles.m_5]}>
                    <View style={styles.logIndex}>
                      <Text>{index+1}</Text>
                    </View>
                    <View style={styles.actionBox}>
                      <Text style={styles.logDate}>
                        {moment(log.activitytime).format('MMMM Do YYYY, h:mm:ss a')}
                      </Text>
                      <Text style={styles.logAction}>Action: {log.action}</Text>
                    </View>
                  </View>
                )
            })
          }
        </View>
      </ScrollView>*/}
    </ScrollView>
  );
}
