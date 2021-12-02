import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    //Next Item Start//

    mobileLogView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextItemsMain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        width: "100%"
    },
    RFPScreen: {
        flex: 1,
        width: "100%",
        textAlign: "center",
        height: "100%"
    },
    nowScanningMainView: {
        padding: 5,
        backgroundColor: "#252525",
        display: "flex",
        alignItems: "center"
    },
    nowScanningTextView: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
    actionButtonsView: {
        backgroundColor: "#292929",
        borderStyle: "solid",
        borderColor: "#d3dcf3"
    },
    actionButtonInnerView: {
        flexDirection: "row",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    actionButtonText: {
        fontSize: 13,
        // fontWeight: "bold",
        color: "#fff",
        textShadowColor: "#fff",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4
    },
    actionImages: {
        position: "relative",
        width: 30,
        height: 30,
    },
    restartButtonDesign: {
        alignItems: "center",
        marginRight: 15
    },
    noteSaveButtonDesign: {
        alignItems: "center"
    },
    orderItemNameView: {
        padding: 5,
        backgroundColor: "#ccc",
        display: "flex",
        borderTopWidth: 5,
        borderStyle: "solid",
        borderColor: "#aeaeae"
    },
    orderItemNameText: {
        fontWeight: "bold",
        fontSize: 16
    },
    orderItemSKUView: {
        padding: 5,
        backgroundColor: "#3d566d",
        borderTopWidth: 5,
        borderStyle: "solid",
        borderColor: "#7da8d0"
    },
    orderItemSKUText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    orderItemBarcodeView: {
        padding: 5,
        backgroundColor: "#a6b1cb",
        borderTopWidth: 5,
        borderStyle: "solid",
        borderColor: "#7f899f"
    },
    orderItemBarcodeText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16
    },
    customerProductMainView: {
        padding: 5,
        backgroundColor: "#c4d1f0",
        borderTopWidth: 5,
        borderStyle: "solid",
        borderColor: "#7f899f"
    },
    customProductText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 15
    },
    serialNumberNeeded: {
        padding: 5,
        backgroundColor: "#c1c9db",
        borderBottomWidth: 5,
        borderStyle: "solid",
        borderColor: "#3f7ebd"
    },
    serialNumberNeededText: {
        color: "#000",
        fontSize: 16,
        textAlign: "left"
    },
    displayLocationMainView: {
        padding: 5,
        backgroundColor: "#1c1c1c",
        borderTopWidth: 5,
        borderStyle: "solid",
        borderColor: "#7f899f"
    },
    displayLocationText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15
    },
    scanningInputButtonBarMainView: {
        backgroundColor: "#414141",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    scanningInputButtonBarGreenButton: {
        height: 10,
        width: 10,
        backgroundColor: "#cafe33",
        borderRadius: 30,
        marginRight: 10
    },
    scanGreaterThan375: {
        textAlign: "center",
        fontSize: 14
    },
    scanLessThan375: {
        textAlign: "center",
        fontSize: 10
    },
    qtyMoreToScan: {
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        width: "auto",
        paddingLeft: 5,
        paddingRight: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        bottom: 65,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "500",
        color: "#000"
    },
    qtyMoreToScanSecond: {
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        width: "auto",
        paddingLeft: 5,
        paddingRight: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        bottom: 0,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "500",
        color: "#000"
    },
    textX: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#737373"
    },
    textXTIMESMainView: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        bottom: 79,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    textTimes: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        color: "#737373"
    },
    qtyRemainText: {
        fontSize: 50,
        fontWeight: "bold",
        display: "flex",
        color: "#748755"
    },
    instructionContainerSecond: {
        borderTopWidth: 2,
        borderStyle: "solid",
        borderColor: "#fff",
        position: "absolute"
    },
    instructionContainerThree: {
        borderTopWidth: 2,
        borderStyle: "solid",
        borderColor: "#fff"
    },

    //Next Item End//


    inputBox: {
        padding: 10,
        flex: 6,
        lineHeight: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 30
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        margin: 10,
        backgroundColor: "#b4b4b4"
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        paddingRight: 10,
        paddingLeft: 10
    },
    internalNoteBar: {
        flexDirection: "row",
        backgroundColor: "black",
        width: "100%",
        padding: 8,
        marginTop: 3,
        marginBottom: 3
    },
    internalNoteText: {
        flex: 8,
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        alignItems: "center"
    },
    closeButton: {
        flex: 2,
        textAlign: "center",
        color: "black",
        backgroundColor: "white",
        borderRadius: 30,
        fontSize: 12,
        fontWeight: "bold",
        padding: 3
    },
    alertContainer: {
        flex: 1,
        position: "absolute",
        top: 0,
        zIndex: 10,
        backgroundColor: "rgba(14, 14 , 14 , 0.7)",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    alertBox: {
        backgroundColor: "grey",
        opacity: 1,
        width: "80%",
        // height: "50%",
        padding: 20,
        borderRadius: 30,
    },
    alertText: {
        flex: 8,
        color: "black",
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 20
    },
    alertClose: {
        flex: 2,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
    alertInput: {
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 30,
        height: "75%",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        color: "#000",
        margin: 10,
        padding: 5
    },
    alertSubmitBox: {
        backgroundColor: "transparent",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
    },
    alertSubmitBtn: {
        fontWeight: "bold",
        fontSize: 15,
        padding: 10,
        textAlign: "center",
        color: "black"
    },
    logContainer: {
        width: "95%",
        // marginBottom: 20,
        paddingTop: 15,
        height: "100%"
    },
    logBox: {
        margin: 10,
        // width: "100%",
        height: "100%"
    },
    logHeaderText: {
        textAlign: "center",
        padding: 5,
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "black",
        color: "white"
    },
    logIndex: {
        flex: 2,
        margin: 2,
        textAlign: "center"
    },
    actionBox: {
        flex: 19,
        margin: 2
    },
    logDate: {
        paddingBottom: 5,
        marginRight: 4,
        marginRight: 4
    },
    logAction: {
        flexWrap: 'wrap',
        flex: 1,
        marginRight: 10
    },
    nextItemContainer: {
        width: "100%",
        // marginBottom: 20,
        // margin: 10,
        // height: "100%"
    },
    nextProductText: {
        textAlign: "center",
        padding: 10,
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "black",
        color: "white"
    },
    iframe: {
        height: 100,
        width: "100%"
    },
    itemInfo: {
        borderWidth: 1,
        margin: 2
    },
    blueBox: {
        backgroundColor: "#d9edf7",
        borderColor: "#bce8f1",
        borderWidth: 1,
        padding: 3
    },
    blueText: {
        textAlign: "center",
        color: "#31708f",
        fontWeight: "bold"
    },
    unscannedItemName: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    skuBox: {
        flex: 7,
        alignItems: "flex-start",
        margin: 10
    },
    skuTextBox: {
        padding: 10,
        minWidth: 100,
        textAlign: "center"
    },
    skuText: {
        fontWeight: "bold"
    },
    unscannedItemQty: {
        flex: 3,
        alignItems: "flex-end",
        margin: 10
    },
    imageContainer: {
        // height: 250,
        paddingTop: 20,
        width: "100%",
        alignItems: "center",
    },
    imageContainerSectionIpad: {
        marginBottom: 165,
        marginTop: 165
    },
    imageContainerSectionIphone678: {
        marginBottom: -5,
        marginTop: -35
    },
    imageContainerSection823: {
        marginTop: 65,
        marginBottom: 65
    },
    imageContainerSection812: {
        marginTop: 50,
        marginBottom: 50
    },
    imageContainerSection568: {
        marginTop: -50,
        marginBottom: 0
    },
    imageContainerSection736: {
        marginTop: 20,
        marginBottom: 22
    },
    imageContainerSection640: {
        marginTop: -40,
        marginBottom: -20
    },
    paginationBoxStyle: {
        position: "relative",
        bottom: 0,
        padding: 0,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: 0
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        padding: 0,
        margin: 0,
        backgroundColor: "rgba(128, 128, 128, 0.92)"
    },
    ImageComponentStyle: {
        borderRadius: 15,
        alignItems: "center",
        alignSelf: "center",
        padding: 20,
        justifyContent: "center",
        width: '80%',
        marginTop: 5
    },
    instructionContainer: {
        // bottom: 0,
        position: "absolute",
        zIndex: 10,
        backgroundColor: "rgba(28, 43, 116, 0.7)",
        width: "100%",
        height: "auto",
        maxHeight: 300,
        // borderRadius: 30,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        // marginBottom: 5
    },
    instructionContainerWeb: {
        // bottom: 0,
        position: "relative",
        zIndex: 10,
        backgroundColor: "#d61612",
        width: "100%",
        height: "auto",
        maxHeight: 300,
        // borderRadius: 30,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        // marginBottom: 5
    },
    instructionBox: {
        width: "100%",
        // margin: 10,
        // padding: 10
    },
    textBox: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 2,
        marginBottom: 2
    },
    imageContainer2: {
        flex: 2,
        marginRight: 5,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    imageBox: {
        width: 60,
        height: 60,
        backgroundColor: "#808080",
        padding: 5
    },
    image: {
        width: "100%",
        height: "100%"
    },
    barcodeStateInput: {
        flex: 15,
        padding: 5,
        backgroundColor: "#cbcbca",
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
        width: "100%",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#cbcbca",
        borderRadius: 5
    },
    scanAllItem: {
        flex: 4,
        marginLeft: 5,
        backgroundColor: "#6f8f93",
        textTransform: "uppercase",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10
    },
    scanAllItemWeb: {
        flex: 4,
        marginLeft: 5,
        backgroundColor: "#41970f",
        textTransform: "uppercase",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10
    },
    scanBtn: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#fff",
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    productEditLabel: {
        flex: 2,
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "black",
        color: "#fff",
        width: "100%",
        textAlign: "center",
        padding: 10
    },
    productEditVal: {
        flex: 8,
        padding: 10
    },
    responseView: {
        flex: 1,
        // position: "fixed",
        position: "absolute",
        top: 0,
        zIndex: 15,
        backgroundColor: "rgba(14, 14 , 14 , 0.7)",
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight,
        width: windowWidth
    },
    responseBox: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    responseBoxImage: {
        maxHeight: windowWidth > 767 ? 700 : 400,
        maxWidth: windowWidth > 767 ? 700 : 400,
        width: "100%",
        height: "100%"
    },
    scannedItemContainer: {
        width: "100%",
        height: "100%",
        // marginBottom: 20,
        backgroundColor: "#666666"
        // margin: 10
    },
    scannedItemContainerWeb: {
        width: "100%",
        height: "100%",
        // marginBottom: 20,
        backgroundColor: "#414141"
        // margin: 10
    },
    scannedItemBox: {
        width: "100%",
        height: "100%"
    },
    scannedItemText: {
        textAlign: "center",
        padding: 5,
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "black",
        color: "white"
    },
    scannedItemTextWeb: {
        textAlign: "center",
        padding: 5,
        // paddingBottom: 6,
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "#000",
        color: "white"
    },
    scannedItemImg: {
        width: "100%",
        height: 100
    },
    scannedItemName: {
        flex: 7,
        padding: 10
    },
    scannedItemNameText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    scannedItemNameTextWeb: {
        // textAlign: "center",
        fontSize: 12,
        fontWeight: "500",
        paddingBottom: 5,
        // whiteSpace: "nowrap",
        overflow: "hidden",
        // textOverflow: "ellipsis"
    },
    scannedItemLocationTextWeb: {
        fontSize: 12,
        paddingBottom: 5,
        fontWeight: "500",
        width: "100%",
        overflow: "hidden",
        // whiteSpace: "nowrap",
        // textOverflow: "ellipsis"
    },
    scannedItemSkuBox: {
        flex: 7,
        alignItems: "flex-start",
        margin: 10
    },
    scannedItemSkuBoxWeb: {
        flex: 7,
        alignItems: "flex-start",
        // margin: 10
    },
    scannedQtyBox: {
        flex: 3,
        alignItems: "flex-end",
        margin: 10
    },
    scannedQtyBoxWeb: {
        flex: 3,
        alignItems: "flex-end"
    },
    typeScanContainer: {
        position: "absolute",
        top: 0,
        zIndex: 10,
        backgroundColor: "rgba(14, 14 , 14 , 0.7)",
        // justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        shadowColor: "#fff", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 10, shadowRadius: 10
    },
    typeScanBox: {
        backgroundColor: "#d5c732",
        opacity: 1,
        top: "10%",
        // width: "60%",
        // height: 200,
        padding: 5,
        borderRadius: 10,
        // borderWidth: 2,
        // borderColor: "#fff"
    },
    activityContainer: {
        top: 0,
        zIndex: 10,
        backgroundColor: "rgba(14, 14 , 14 , 0.7)",
        alignItems: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        shadowColor: "#fff", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 10, shadowRadius: 10,
        position: "fixed",
        justifyContent: "center"
    },
    aliasBox: {
        backgroundColor: "#d5c732",
        opacity: 1,
        top: "5%",
        width: "80%",
        // height: 200,
        padding: 5,
        borderRadius: 20,
        // borderWidth: 2,
        // borderColor: "#fff"
    },
    aliasTextHeading: {
        flex: 8,
        color: "black",
        textAlign: "center",
        // fontWeight: "bold",
        fontSize: 25,
        marginBottom: 10
    },
    aliasText: {
        flex: 8,
        color: "black",
        // textAlign: "center",
        // fontWeight: "bold",
        fontSize: 14,
        width: "70%",
        alignSelf: "center",
        margin: 5,
        fontWeight: 500
    },
    aliasDescription: {
        flex: 8,
        color: "black",
        // textAlign: "center",
        // fontWeight: "bold",
        fontSize: 14,
        alignSelf: "center",
        margin: 5,
        fontWeight: 500
    },
    scanCountText: {
        flex: 8,
        color: "black",
        textAlign: "left",
        // fontWeight: "bold",
        fontSize: 30
    },
    scanCountInnerText: {
        flex: 8,
        color: "black",
        textAlign: "left",
        // fontWeight: "bold",
        fontSize: 20
    },
    scanCountCloseBtn: {
        flex: 2,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
    typeScanCountInput: {
        borderWidth: 2,
        borderColor: "#000",
        borderRadius: 10,
        justifyContent: "flex-start",
        backgroundColor: "#d5c732",
        color: "#000",
        // margin: 10,
        // padding: 8,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    scanCountSubmitBtnBox: {
        backgroundColor: "transparent",
        textAlign: "right",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        width: "auto",
        paddingHorizontal: 10,
    },
    scanCountSubmitBtn: {
        fontSize: 20,
        color: "black",

    },
    unscannedItemContainer: {
        width: "100%",
        padding: 10,
        // marginBottom: 20,
        // margin: 10,
        height: "100%",
        backgroundColor: "#cccccc"
    },
    unscannedItemContainerWeb: {
        width: "100%",
        // marginBottom: 20,
        // margin: 10,
        height: "100%",
        backgroundColor: "#000"
    },
    unscannedItemBox: {
        paddingBottom: 20,
        width: "100%",
        height: "auto"
    },
    unscannedItemTitle: {
        textAlign: "center",
        padding: 5,
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "black",
        color: "white"
    },
    unscannedItemTitleWeb: {
        textAlign: "center",
        padding: 5,
        // paddingBottom: 6,
        fontSize: 15,
        fontWeight: "bold",
        backgroundColor: "#000",
        color: "white"
    },
    //shipment section start
    shipContainer: {
        backgroundColor: "#fff",
        padding: 20,
        width: "100%",
        alignItems: "center",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#00968838",
        marginTop: 10
    },
    shipParagraph: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 10,
        textAlign: "center"
    },
    shipCloseButton: {
        marginTop: 10,
        backgroundColor: "#00968838",
        padding: 10,
        borderRadius: 30,
        alignItems: "center"
    },
    shipOrderLink: {
        color: "#009688",
        fontWeight: "bold",
        margin: 2,
        textAlign: "center"
    },
    shipOrderTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        margin: 2,
        alignSelf: "center"
    }
    //shipment secton end
})

export default styles;
