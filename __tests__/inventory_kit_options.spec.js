import React from 'react';
// import OrderList from "../src/components/orders/orderlist";
import InventoryKitOptions from "../src/components/products/inventory_kit_options.js";
import renderer from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-15';
import Enzyme , { mount ,shallow, configure } from 'enzyme';
import configureStore from "../src/store/configureStore";
import { Provider } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";

it("InventoryKitOptions" , () => {
    renderer.create(
                <Provider store={configureStore()}>
                     <InventoryKitOptions/>
                 </Provider>
            )
})