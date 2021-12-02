import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    //inventory style start//
    inventoryContainer:{
      flex:1 ,
      margin: 10 ,
      padding: 10 ,
      backgroundColor: "#dbdada" ,
      borderWidth: 1 ,
      borderRadius: 30
    },
    inventoryHeading: {
      fontWeight: "bold" ,
      fontSize: 18 ,
      margin: 10
    },
    inventoryColumnView: {
      flexDirection: "row",
      alignItems:"center",
      // borderBottomWidth: 1 ,
      borderBottomColor: "#000"
    },
    inventoryColumnViewLabel: {
      flex: 2,
      fontSize: 16,
      fontWeight: "bold",
      backgroundColor: "rgb(51, 101, 153)",
      color:"#fff",
      width: "100%",
      textAlign:"center",
      padding: 10
    },
    inventoryColumnViewValue: {
      flex: 6,
      padding: 10,
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    inventoryColumnMainView:{
      margin: 5,
      backgroundColor: "#ffff" ,
      // borderRadius: 20 ,
      borderWidth: 1,
      borderColor: "black"
      // padding: 10
    },
    //inventory style end//

    // product activity logs start //
    productActivityLogContainer: {
      flex:1 ,
      padding: 10 ,
      margin: 10 ,
      backgroundColor: "#dbdada" ,
      borderWidth: 1 ,
      borderRadius: 30
    },
    productActivityLogHeading:{
      fontWeight: "bold" ,
      fontSize: 18 ,
      margin: 10
    },
    productActivityLogMainView:{
      flexDirection: "row" ,
      margin: 5 ,
      backgroundColor: "#ffff" ,
      borderRadius: 30 ,
      padding: 10
    },
    productActivityLogIndex:{
      flex: 2 ,
      margin: 2 ,
      textAlign: "center"
    },
    productActivityLogView:{
      flex: 19 ,
      margin: 2
    },
    productActivityLogViewActionUser:{
      flex:1 ,
      flexWrap: 'wrap' ,
      marginRight: 10
    },
    productActivityLogViewTime:{
      paddingBottom: 5 ,
      marginRight: 4 ,
      marginRight: 4
    }
    // product activity logs end //

    //product detail start //

    //product detail end //

})
export default styles;
