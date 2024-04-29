import React,{useRef, useEffect,useContext} from "react";
import { View, Text,TouchableOpacity, Animated, ActivityIndicator } from "react-native";
import AuthContext from "../../context/AuthContext";
import { useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import styles from "./style";
// Components/Alertas/Comunication/index.js



const SnackComplete = () => { 
    const navigation = useNavigation();
    const moveRight = useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(
          moveRight,
          {
            toValue: 0,
            duration: 1000, // Duração da animação em milissegundos
            useNativeDriver: true, // Usa o driver nativo para melhor desempenho
          }
        ).start(); // Inicia a animação
      }, []);

  return (
    <Animated.View
    style={{
      ...styles.container,
      transform: [{ translateX: moveRight }],
    }}
  >
    <View style={styles.container}> 
    <TouchableOpacity onPress={()=> navigation.navigate('ProfileCad')} style={styles.btn_alert}>
      <Text style={{fontSize:16, color:"#000", fontWeight:'400'}}>Complete seu cadastro aqui!!!</Text>
    </TouchableOpacity>
    </View>
    </Animated.View>
  );
};


const ModalComplite = () => { 
    const navigation = useNavigation();
    const {handleAlertCadastro } = useContext(AuthContext);

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

const Loading = () => { 
    return (
      <View style={styles.cont_loader}>
        <ActivityIndicator size="large" color={"#131313"}/>
          <Text style={{ marginTop: 10 }}>Procurando produtos perto de você...</Text>  
      </View>
    );
  };


 


export {SnackComplete, Loading, ModalComplite};


