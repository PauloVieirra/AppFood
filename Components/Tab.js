import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet, TouchableHighlight } from "react-native";
import { AntDesign, MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons';
import CartComponent from "./Carrinho";

const TabBar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home"); // Inicialmente seleciona 'Home'

  const handleNavigateTo = (screen) => {
    navigation.navigate(screen); 
    setActiveTab(screen); 
  };

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "Home" && styles.activeTab]}
        onPress={() => handleNavigateTo("Home")}
      >
       <AntDesign name="home" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabItem, activeTab === "OrdersClient" && styles.activeTab]}
        onPress={() => handleNavigateTo("OrdersClient")}
      >
        <MaterialCommunityIcons name="order-bool-ascending" size={24} color="black" />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "Carrinho" && styles.activeTab]}
        onPress={() => handleNavigateTo("Cart")}
      >
        <CartComponent/>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "Promo" && styles.activeTab]}
        onPress={() => handleNavigateTo("Promo")}
      >
        <Entypo name="ticket" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "ProfileCad" && styles.activeTab]}
        onPress={() => handleNavigateTo("ProfileCad")}
      >
        <Ionicons name="person-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "(rgba(225,225,225,0.9))",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  
  tabItem: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "(rgba(238,238,238,0.8))"
  },
  text: {
    color: "#CCC", // Cinza
  }
});


export default TabBar;
