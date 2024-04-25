import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";


const TabBar = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState("frutas"); // Inicialmente seleciona 'frutas'

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    onSelect(tab); // Callback para informar qual tab foi selecionada
  };

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "frutas" && styles.activeTab]}
        onPress={() => handleTabPress("frutas")}
      >
        <Text>Frutas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "verduras" && styles.activeTab]}
        onPress={() => handleTabPress("verduras")}
      >
        <Text>Vegetais</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(93, 201, 104, 9)",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
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
    backgroundColor: "rgba(129, 237, 151, 9)",
  },
});

export default TabBar;
