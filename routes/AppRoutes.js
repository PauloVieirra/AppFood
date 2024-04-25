import React,{useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../src/screens/Home/index';
import DetalhesProduto from "../src/screens/Details";
import Cart from "../src/screens/Cart";
import Card from "../Components/Cards";
import { CartProvider } from "../context/CartContext";
import CustomDrawerContent from "../Components/CunstonDraqer";



const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function AppRoutes(){

  return(
      <CartProvider>
         
          <Drawer.Navigator initialRouteName="Home"
           drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
              <Drawer.Screen name="Stack" component={StackNavigator}  options={{
                  headerShown: false,
              }} />
              <Drawer.Screen name="Cart" component={Cart}  options={{
                  headerShown: false,
              }} />
          </Drawer.Navigator>
      </CartProvider>
  );
}


function StackNavigator() {
  return (
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
      </AppStack.Navigator>
  );
}

export default AppRoutes;