import React, { useContext, useEffect } from "react";
import { View, Text, Image } from "react-native";
import AuthContext from "../context/AuthContext";
import Imageplaceholder from "../assets/personimg.png";
import styles from "./style";

export default Userinfo = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <View style={styles.constainer}>
    
        {user.isValidate   ?  (
          <Image
            source={{ uri: user.complemento.urlImage }}
            style={styles.userimg}
          />
        ) : (
          <Image source={Imageplaceholder} style={styles.userimg} />
        )}
      
    </View>
  );
};
