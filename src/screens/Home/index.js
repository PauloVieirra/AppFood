import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import styles from "./style";
import AuthContext from "../../../context/AuthContext";
import MenuTop from "../../../Components/TopBar";
import UserComponents from "../../../Components/CunstonDraqer/UserComponents";
import ListFruits from "../../../Components/List";

export default function Home() {
  const navigation = useNavigation();
  const { signOut, alertcadastro, handleAlertCadastro } = useContext(AuthContext);

  const handleCompleteProfile = () =>{
      navigation.navigate('Profilecad')
  }

  const handleCancel = () =>{
    handleAlertCadastro(false)
  }
  
 

  return (
    <View style={styles.container}>
      <MenuTop/>
      <UserComponents/>
      <ListFruits tipo="frutas" /> 
      {alertcadastro === true && (
        <View style={{ width:'100%', height:'100%',position: "absolute", zIndex: 100,top:0, left:0 ,backgroundColor: "white", padding: 20 }}>
          <Text>Você precisa completar seu cadastro para adicionar produtos ao carrinho.</Text>
          <TouchableOpacity onPress={handleCompleteProfile}>
            <Text>Completar cadastro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
