import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import styles from "./style";
import AuthContext from "../../../context/AuthContext";
import MenuTop from "../../../Components/TopBar";
import Modalcomplite from "../../../Components/Modals/Complite";
import UserComponents from "../../../Components/CunstonDraqer/UserComponents";
import ListFruits from "../../../Components/List";

export default function Home() {
  const navigation = useNavigation();
  const { user, alertcadastro, handleAlertCadastro } = useContext(AuthContext);


 

  return (
    <View style={styles.container}>
      <MenuTop/>
      {user.isValidate &&
       <UserComponents/>
      }
      <ListFruits tipo="frutas" /> 
      {alertcadastro === true && (
      <Modalcomplite/>
      )}
    </View>
  );
}
