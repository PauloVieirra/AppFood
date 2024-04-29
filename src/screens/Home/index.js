import React, { useContext } from "react";
import { View } from "react-native";
import { useNavigation } from "expo-router";
import styles from "./style";
import AuthContext from "../../../context/AuthContext";
import MenuTop from "../../../Components/TopBar";
import { ModalComplite } from "../../../Components/Modals";
import Personcustomer from "../../../Components/Personcustomer";
import { Complite } from "../../../Components/Comunications/Orientacoes";
import ListFruits from "../../../Components/List";

export default function Home() {
  const navigation = useNavigation();
  const { user, alertcadastro, loading } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <MenuTop />
      {user.isValidate ? <Personcustomer /> : <Complite />}

      <ListFruits tipo="frutas" />
      {alertcadastro === true && <ModalComplite />}
    </View>
  );
}
