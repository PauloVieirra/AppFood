import React,{useState, useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";


const MenuTop = () => {
  const navigation = useNavigation();
  const { user, location, address } = useContext(AuthContext);
  const { cart } = useCart();


  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
      {address && (
          <Text>
            {address.city},{" "}{address.road}
          </Text>
        )}
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Feather name="shopping-cart" size={24} color="black" />
        <View style={[styles.cartContainer, { backgroundColor: cart.length > 0 ? '#48c400' : '#878787' }]}>
          <Text style={{color:'#fff'}}>{cart.length}</Text>
        </View>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cartContainer:{
    width:24,
    height:24,
    position:'absolute',
    top:12,
    right:15,
    borderRadius:40,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
  }
});

export default MenuTop;

