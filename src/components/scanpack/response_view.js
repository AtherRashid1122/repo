import React, { useLayoutEffect, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import orderComplete from "../../../assets/_order_complete.png";
import scanFail from "../../../assets/_scan_fail_whoops.png";
import scanSuccess from "../../../assets/_scan_success.png";
import styles from '../../style/scanpack';

export default function ResponseView(props) {

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width)
  
  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <View style={styles.responseView}>
      <View style={styles.responseBox}>
        {
          props.orderCompleteAction &&
          <Image
            name="IMAGE_SUCCESS"
            style={[styles.responseBoxImage, { maxWidth: windowWidth > 767 ? 700 : 400 }]}
            source={orderComplete}
          />
        }
        {
          props.scanSuccessAction &&
          <Image
            name="IMAGE_SUCCESS"
            style={[styles.responseBoxImage, { maxWidth: windowWidth > 767 ? 700 : 400 }]}
            source={scanSuccess}
          />
        }
        {
          props.scanFailAction &&
          <Image
            name="IMAGE_SUCCESS"
            style={[styles.responseBoxImage, { maxWidth: windowWidth > 767 ? 700 : 400 }]}
            source={scanFail}
          />
        }
      </View>
    </View>
  );
}
