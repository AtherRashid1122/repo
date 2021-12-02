import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './login/signin';
import OrderList from './orders/orderlist';
import OrderDetail from './orders/orderdetail';
import ItemsDetail from './orders/items_detail';
import AddItemToOrder from './orders/add_item_to_order';
import ScanPack from './scanpack/scanpack';
import ScanPackItem from './scanpack/scanpack_item';
import ProductEdit from './scanpack/product_edit';
import ProductDetail from "./products/product_detail";
import PutWall from "./putwall/put_wall";
import Drawer from "./drawer/drawer";
import SyncButton from "./actionButton/sync";
import toggle from "../../assets/toggle1.png"
import { navigationRef } from './root_navigation';
import Close from "../../assets/closeicon.png";
import { LinearGradient } from 'expo-linear-gradient';
import { fontFamily } from '../helpers/fontFamily';
import * as RootNavigation from './root_navigation';

const Stack = createStackNavigator();
let name = "Next Item";

// const prefix = Linking.makeUrl('https://23a7badd6881.ngrok.io')

export default function Main({ navigation }) {
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width)
  let [navShow, setNavShow] = useState(true)
  let [openDrawer, handelDrawer] = useState(false)
  let [restartFlag, restartHandel] = useState(false)
  let [alertShow, alertShowHandle] = useState(false)
  let restartButtonRef = React.createRef();

  useEffect(() => {
    /*RETRIVE THE USER INFO FROM LOCAL*/
    const getUserInfo = async () => {
      let info = await AsyncStorage.getItem("userInfo")
      let userInfo = info && JSON.parse(info)
      setUserInfo(userInfo)
    }

    getUserInfo()
  }, [])

  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  AsyncStorage.getItem('access_token').then((keyValue) => {
    setToken(keyValue)
    setShow(true)
    return keyValue
  });
  // const linking = {
  //   prefixes: [prefix],
  //    config: {
  //     screens: {
  //       OrderList: "/OrderList",
  //       OrderDetail: "/OrderDetail",
  //       ScanPack: "/ScanPack",
  //       ScanPackItem: "/ScanPackItem",
  //       ProductEdit: "/ProductEdit",
  //       ProductDetail: "/ProductDetail",
  //       ItemsDetail: "/ItemsDetail",
  //       // PutWall: "",
  //     }
  //   }
  // };



  function DrawerButton() {
    return (
      <TouchableOpacity onPress={() => { handelDrawer(openDrawer = true) }}
        style={{ flex: 1, marginLeft: 20, justifyContent: "center", width: "100%" }}
      >
        <Image
          style={{ width: 39, height: 31, color: "#fff" }}
          source={toggle ? toggle : ""}
        />
      </TouchableOpacity>
    );
  }

  function closeDrawer() {
    handelDrawer(openDrawer = false)
  }

  function navBarShow(position) {
    setNavShow(navShow = position)
  }

  function restartButton() {
    restartHandel(restartFlag = !restartFlag)
  }

  function restartButtonReset() {
    restartHandel(restartFlag = false)
  }

  function nav() {
    navigation.canGoBack;
  }

  function changeHeading(num) {
    if (num === 0) {
      name = "Scanned Item"
    }
    if (num === 1) {
      name = "Next Item"
    }
    if (num === 2) {
      name = "Unscanned Item"
    }
  }

  function syncButtonHandle() {
    alertShowHandle(true)
    // setTimeout(() => alertShowHandle(false) , 3000);
  }

  return (
    show &&
    (
      <React.Fragment>
        {/*<NavigationContainer linking={linking} ref={navigationRef}>*/}
        <NavigationContainer ref={navigationRef} style={{ zIndex: -1 }}>
          <Stack.Navigator initialRouteName={token ? "ScanPack" : "SignIn"} style={{ zIndex: -1 }}>
            <Stack.Screen name="SignIn"
              component={SignIn}
              options={{
                title: 'Sign In',
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                // headerLeft: null,
                // headerLeft: () => (<DrawerButton/>)
              }}
            />
            <Stack.Screen name="OrderList"
              component={OrderList}
              path="/123"
              options={{
                title: 'List',
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                headerLeft: null,
                headerLeft: () => (<DrawerButton />)
              }}
            />
            <Stack.Screen name="OrderDetail"
              component={OrderDetail}
              options={{
                title: 'Order Detail',
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                headerLeft: null
                // headerLeft: (navigation) => (<HeaderBackButton  onPress={() => nav(navigation) } />)
              }}
            />
            <Stack.Screen name="ScanPack"
              component={ScanPack}
              options={{
                title: alertShow === false ? <TouchableOpacity onPress={() => RootNavigation.navigate("ScanPack")}><Text>Scan & Verify</Text></TouchableOpacity> : (
                  <LinearGradient
                    colors={['#5bbc31', '#479523', '#3f851d']}
                    style={{
                      position: "fixed",
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      top: 0,
                      left: 0,
                      right: 0,
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: 4,
                      marginTop: 12,
                      shadowOffset: { width: 0, height: 0, },
                      shadowRadius: 3.84,
                      shadowColor: '#000',
                      shadowOpacity: 0.9,
                      zIndex: 9,
                      width: "80%",
                      borderRadius: 5
                    }}
                  >
                    <Text style={windowWidth > 1024 ? { fontSize: 16 } : { fontSize: 13 }}>Changes Successfully Saved</Text>
                    <TouchableOpacity onClick={() => alertShowHandle(false)} style={{ position: "absolute", right: 11 }}>
                      <Image style={windowWidth > 1024 ? { width: 22, height: 22 } : { width: 18, height: 18 }} source={Close ? Close : ""} />
                    </TouchableOpacity>
                  </LinearGradient>
                ),
                headerTitleStyle: {
                  fontFamily: fontFamily.font700,
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 22
                },
                headerBackground: () => (
                  <LinearGradient
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                    colors={["#142130", "#304454"]}
                    style={{ backgroundColor: "#707070", width: "100%", height: "100%" }}
                  />
                ),
                headerLeft: () => (
                  <View style={{ flexDirection: "row" }}>
                    <DrawerButton />
                    {windowWidth >= 900 &&
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontFamily: fontFamily.font500, color: "#fff", fontSize: 16, textTransform: "uppercase", lineHeight: 15, marginTop: 4 }}>{userInfo && userInfo.name}</Text>
                        <Text style={{ fontFamily: fontFamily.font700, color: "#fff", fontSize: 16, textTransform: "uppercase" }}>{userInfo && userInfo.current_tenant}</Text>
                      </View>
                    }
                  </View>
                ),
                headerRight: () => (<SyncButton syncButtonHandle={() => syncButtonHandle()} alertShow={alertShow} />)
              }}
 
            />
            <Stack.Screen name="ScanPackItem"
              component={ScanPackItem}
              initialParams={{ item: navBarShow, restart: restartFlag, restartButton: restartButton, changeHeading: changeHeading }}
              options={{
                title: alertShow === false ? <TouchableOpacity onPress={() => RootNavigation.navigate("ScanPack")}><Text>Scan & Verify</Text></TouchableOpacity> : (
                  <LinearGradient
                    colors={['#5bbc31', '#479523', '#3f851d']}
                    style={{
                      position: "fixed",
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      top: 0,
                      left: 0,
                      right: 0,
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: 4,
                      marginTop: 12,
                      shadowOffset: { width: 0, height: 0, },
                      shadowRadius: 3.84,
                      shadowColor: '#000',
                      shadowOpacity: 0.9,
                      zIndex: 9,
                      width: "80%",
                      borderRadius: 5
                    }}
                  >
                    <Text style={windowWidth > 1024 ? { fontSize: 16 } : { fontSize: 13 }}>Changes Successfully Saved</Text>
                    <TouchableOpacity onClick={() => alertShowHandle(false)} style={{ position: "absolute", right: 11 }}>
                      <Image style={windowWidth > 1024 ? { width: 22, height: 22 } : { width: 18, height: 18 }} source={Close ? Close : ""} />
                    </TouchableOpacity>
                  </LinearGradient>
                ),
                headerTitleStyle: {
                  fontFamily: fontFamily.font700,
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 22
                },
                headerBackground: () => (
                  <LinearGradient
                    start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                    colors={["#142130", "#304454"]}
                    style={{ backgroundColor: "#707070", width: "100%", height: "100%" }}
                  />
                ),
                headerLeft: () => (
                  <View style={{ flexDirection: "row" }}>
                    <DrawerButton />
                    {windowWidth >= 900 &&
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontFamily: fontFamily.font500, color: "#fff", fontSize: 16, textTransform: "uppercase", lineHeight: 15, marginTop: 4 }}>{userInfo && userInfo.name}</Text>
                        <Text style={{ fontFamily: fontFamily.font700, color: "#fff", fontSize: 16, textTransform: "uppercase" }}>{userInfo && userInfo.current_tenant}</Text>
                      </View>
                    }
                  </View>
                ),
                headerRight: () => (<SyncButton syncButtonHandle={() => syncButtonHandle()} alertShow={alertShow} />)
              }}
 
            />
            <Stack.Screen name="ProductEdit"
              component={ProductEdit}
              options={{
                title: 'Edit Product',
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                // headerLeft: null,
                // headerLeft: () => (<DrawerButton/>)
              }}
            />
            <Stack.Screen name="ProductDetail"
              component={ProductDetail}
              options={{
                title: 'Product Detail',
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                // headerLeft: null,
                // headerLeft: () => (<DrawerButton/>)
              }}
            />
            <Stack.Screen name="ItemsDetail"
              component={ItemsDetail}
              options={{
                title: 'Items Detail',
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                // headerLeft: null,
                // headerLeft: () => (<DrawerButton/>)
              }}
            />
            <Stack.Screen name="PutWall"
              component={PutWall}
              options={{
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                // headerLeft: null,
                // headerLeft: () => (<DrawerButton/>)
              }}
            />
            <Stack.Screen name="Select Product to add to Order"
              component={AddItemToOrder}
              options={{
                headerStyle: {
                  backgroundColor: '#336599',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textAlign: "center",
                  fontSize: 22
                },
                // headerLeft: null,
                // headerLeft: () => (<DrawerButton/>)
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {
          openDrawer &&
          <Drawer closeDrawer={closeDrawer} />
        }
      </React.Fragment>
    )
  );
};

// const mapStateToProps = (state) => {
//   return {
//     userInfo: state.user.userInfo
//   }
// };

// const mapDispatchToProps = {
//   Login,
//   UserInfo
// };

