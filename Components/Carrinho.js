import React,{ useContext} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";


const CartComponent = () => {
  const navigation = useNavigation();
  const { cart } = useCart();
  return (
    <View style={styles.container}>
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
    alignItems: "center",
    justifyContent: "center",
  },
  cartContainer:{
    width:22,
    height:22,
    position:'absolute',
    top:12,
    right:15,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
  }
});

export default CartComponent;

