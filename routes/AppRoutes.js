import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../src/screens/Home/index';
import DetalhesProduto from "../src/screens/Details";
import OrdersClient from "../src/screens/OrdersClient";
import PaymentScreen from "../src/screens/PaymentsTypes";
import Promo from "../src/screens/Promo";
import Cart from "../src/screens/Cart";
import Card from "../Components/Cards";
import TabBar from "../Components/Tab";
import { Complite } from "../Components/Comunications/Orientacoes";
import ProfileCad from "../src/screens/Complite";
import { CartProvider } from "../context/CartContext";
import CustomDrawerContent from "../Components/CunstonDraqer";
import { EntregaOn, PedidoOn } from "../Components/Comunications/Orientacoes";
import { useNotification } from "../context/NotificationProvider";

const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <CartProvider>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Stack"
          component={StackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </CartProvider>
  );
}

function StackNavigator() {
  const { loadingDelivery, lastNotifiedStatus, clearNotification } = useNotification();
  
  return (
    <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 100, bottom: 0, left: 0, backgroundColor: "#fff",}}>
      <AppStack.Navigator> 
        <AppStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="DetalhesProduto"
          path="/detalhes/:id"
          component={DetalhesProduto}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Card"
          component={Card}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="ProfileCad"
          component={ProfileCad}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="Complite"
          component={Complite}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="OrdersClient"
          component={OrdersClient}
          options={{
              headerShown:false,
          }}
        />
         <AppStack.Screen
          name="Promo"
          component={Promo}
          options={{
              headerShown:false,
          }}
        />
         <AppStack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
              headerShown:false,
          }}
        />
        
      </AppStack.Navigator>
      
      {loadingDelivery && lastNotifiedStatus.some(item => item.status === "aceito") && <PedidoOn/>}
      {loadingDelivery && lastNotifiedStatus.some(item => item.status === "entrega") && <EntregaOn/>}

      
      <TabBar/>
    </View>
  );
}

export default AppRoutes;
