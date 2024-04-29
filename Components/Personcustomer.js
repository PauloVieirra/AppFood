import React, { useContext, useEffect } from "react";
import { View, Text, Image } from "react-native";
import AuthContext from "../context/AuthContext";
import Imageplaceholder from "../assets/personimg.png";
import styles from "./style";

export default Userinfo = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <View style={styles.constainer}>
      <View style={styles.userdata}>
        {user.isValidate &&  user.complemento.urlImage ?  (
          <Image
            source={{ uri: user.complemento.urlImage }}
            style={styles.userimg}
          />
        ) : (
          <Image source={Imageplaceholder} style={styles.userimg} />
        )}

        <View>
          <Text style={styles.userdata_title}>Oi, {user.nome}</Text>
          <Text style={styles.userdata_email}>
            {" "}
            {user.complemento.telefone && ` ${user.complemento.telefone}`}
          </Text>
        </View>
      </View>
      <View style={styles.userdatasec}></View>
    </View>
  );
};
