import React,{useState, useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Personcustomer from "./Personcustomer";
import { Feather } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";


const MenuTop = () => {
  const navigation = useNavigation();
  const { address } = useContext(AuthContext);
  console.log(address);
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
      <Personcustomer/>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
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

