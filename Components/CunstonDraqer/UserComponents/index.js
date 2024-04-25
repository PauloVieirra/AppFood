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
        {user.isValidate === true ? (
             <Image source={{ uri: user.urlImage }}style={styles.userimg}  />
        ) : (
          null
        )}
        <View>
           <Text style={styles.userdata_title}>Oi,{' '}{user.nome}</Text>
           <Text style={styles.userdata_email}>{' '}{user.telefone}</Text>
        </View>
        
       
      </View>
      <View style={styles.userdatasec}>
      
      </View>
    </View>
  ); 
};
