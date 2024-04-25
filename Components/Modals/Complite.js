import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigation } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from "./style";

let Modalcomplite;

export default Modalcomplite = () => {
  const navigation = useNavigation();
  const { user, alertcadastro, handleAlertCadastro } = useContext(AuthContext);


  const handleCompleteProfile = () => {
    navigation.navigate("ProfileCad");
  };

  const handleCancel = () => {
    handleAlertCadastro(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cont_into}>
        <View style={styles.cont_top}>  
        <TouchableOpacity style={styles.btn_close} onPress={handleCancel}>
        <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        </View>
        <View style={styles.cont_body}> 
         <Text style={styles.text_complite}>
           Você precisa completar seu cadastro para adicionar produtos ao carrinho.
        </Text>
        </View>
        <View style={styles.cont_bottom}>
        <TouchableOpacity style={styles.btn_complite} onPress={handleCompleteProfile}>
        <Text style={styles.text_btn}>Completar cadastro</Text>
        </TouchableOpacity>
        </View>
     
     
     
      </View>
      
    </View>
  );
};
