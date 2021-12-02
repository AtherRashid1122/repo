import { StyleSheet , Platform } from 'react-native';

const styles = StyleSheet.create({
    inputBox: {
        padding: Platform.OS === "ios" ? 15 : 10,
        flex: 5,
        // lineHeight: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 20
    },
    scanButtonContainer: {
        flex: 2,
        justifyContent: "center",
        marginRight: 4,
        marginLeft: 4
    },
    scanButton: {
        padding: 10,
        lineHeight: 20,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: "black",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 17
    },
    listContainer: {
        width: "100%",
        marginBottom: 74
    },
    orderRow: {
        flexDirection:"row",
        borderWidth: 1,
        margin: 10,
        padding: 10
    },
    orderColumn: {
        justifyContent: "center",
        marginLeft:10,
        marginRight: 10
    },
    text: {
        marginBottom: 10,
        textAlign: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingBottom: 8,
        paddingTop: 8
    },
    button: {
        height: 40,
        textAlign: "center",
        // borderWidth: 2,
        color:"black",
        fontSize:15,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20
    },
    orderColumnTouch:{
        position: "absolute",
        zIndex: 999,
        flex: 3
    }

})
export default styles;
