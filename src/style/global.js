import { StyleSheet , Platform } from 'react-native';

const globalStyles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex:3
    },
    flex6: {
        flex:6
    },
    flex7: {
        flex: 7
    },
    flex9:{
        flex: 9
    },
    flexDirectionRow: {
        flexDirection: "row"
    },
    m_2: {
        margin: 2
    },
    m_10: {
        margin: 10
    },
    justifyCenter: {
        justifyContent: "center"
    },
    mt_30: {
        marginTop: 30
    },
    mb_4: {
        marginBottom: 4
    },
    mb_5: {
        marginBottom: 5
    },
    mb_40: {
        marginBottom: 40
    },
    mb_65: {
        marginBottom: 65
    },
    mx_10: {
        marginBottom: 10,
        marginTop: 10
    },
    py_10: {
        paddingLeft: 10,
        paddingRight: 10
    },
    bgWhite: {
        backgroundColor: "#ffff"
    },
    p_10: {
        padding: 10
    },
    p_5: {
        padding: 5
    },
    pb_50: {
        paddingBottom: 50
    },
    border_1: {
        borderWidth: 1
    },
    m_5:{
        margin: 5
    },
    textWhite: {
        color: "white"
    },
    bgBlack: {
        backgroundColor: "black"
    },
    alignItmCntr: {
        alignItems:"center"
    },
    fullWidth:{
        width: "100%"
    },
    displayFlex: {
        display: "flex"
    },
    textAlignCenter: {
        textAlign: "center"
    },
    flexDirectionClm:{
        flexDirection: "column"
    },
    backgroundColorWhite:{
        backgroundColor: "#fff"
    },
    positionRelative:{
        position: "relative"
    },
    positionFixed:{
        ...Platform.select({
            ios: {
                position: "absolute"
            },
            android: {
                position: "absolute"
            },
            default: {
                // other platforms, web for example
                position: "fixed"
            }
        })
    },

})
export default globalStyles;
