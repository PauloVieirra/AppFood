import React,{useContext} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from '../src/screens/Home/index';
import DetalhesProduto from "../src/screens/Details";
import Register from "../src/screens/Register";
import ProfileAdm from "../src/screens/Admcomplite";
import HomeAgentePage from "../src/screens/HomeAgente";
import CadStore from "../src/screens/NewStore";
import { Complite } from "../Components/Comunications/Orientacoes";
import ProductEditScreen from "../src/screens/ProctEditScreen";
import { CartProvider } from "../context/CartContext";
import CustomDrawerContent from "../Components/CunstonDraqer";



const AppStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function AgenteRoutes(){

  return(
      <CartProvider>
         
          <Drawer.Navigator initialRouteName="Home"
           drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
              <Drawer.Screen name="Stack" component={StackNavigator}  options={{
                  headerShown: false,
              }} />
              <Drawer.Screen name="Register" component={Register}  options={{
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
              name="Register" 
              component={Register}
              options={{
                  headerShown: false,
              }}
          />
            <AppStack.Screen 
              name="ProfileAdm" 
              component={ProfileAdm}
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
              name="HomeAgentePage" 
              component={HomeAgentePage}
              options={{
                  headerShown: false,
              }}
          />
      </AppStack.Navigator>
  );
}

export default AgenteRoutes;