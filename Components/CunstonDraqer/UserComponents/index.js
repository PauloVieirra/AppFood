import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import AuthContext from "../../../context/AuthContext";
import styles from "./style";


export default Userinfo = () => {
    const {user} = useContext(AuthContext);
     console.log(user.isValidate);


  return (
    <View style={styles.constainer}>
      <View style={styles.userdata}>
        <Text style={styles.userdata_title}>Oi{' '}{user.nome}</Text>
        {user.isValidate === true ? (
           <Text>{user.email}</Text> 
        ) : (
            
             <Text>Complete seu cadastro!!</Text>
        )}
       
      </View>
      <View style={styles.userdatasec}>
        <Image style={styles.userimg} />
      </View>
    </View>
  ); 
};
