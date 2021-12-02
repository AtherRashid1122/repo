import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
        // justifyContent: "center"
    },
    error: {
        color: "red",
        textAlign: "center",
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15
    },
    header: {
        margin:40,
        borderColor: "gray",
        borderWidth: 1,
        alignSelf: "center"
    },
    headerText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 50,
        marginBottom: 50
    },
    m_30: {
        margin: 30
    },
    labelText: {
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 5,
        marginTop: 5
    },
    inputBox: {
        fontSize: 13,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        // lineHeight: 20,
        // justifyContent: "center"
        marginBottom: 2,
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20
    },
    tenentSuffix: {
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 5,
        textAlign: "right"
    },
    inputError: {
        color: "red",
        fontSize: 12
    },
    buttonContainer: {
        flexDirection: "row",
        alignSelf: "flex-end",
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20
    },
    button: {
        height:40,
        marginTop: 14,
        textAlign: "center",
        color:"black",
        fontSize:15,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight:15,
        borderRadius: 20,
        marginRight: 4,
        marginLeft: 4
    }
})
export default styles;
