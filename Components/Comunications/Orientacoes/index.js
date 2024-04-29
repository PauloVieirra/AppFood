import React,{useRef, useEffect} from "react";
import { View, Text,TouchableOpacity, Animated } from "react-native";
import { useNavigation } from "expo-router";
import styles from "./style";
import { Navigate } from "react-router-native";
// Components/Alertas/Comunication/index.js

const Complite = () => { 
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

const EntregaOn = () => { 
    return (
      <View>
        <Text>Entrega</Text>
      </View>
    );
  };

  const PedidoOn = () => { 
    return (
      <View>
        <Text>Pedido</Text>
      </View>
    );
  };

  const PagamentoOn = () => { 
    return (
      <View>
        <Text>Pagamento</Text>
      </View>
    );
  };








export {Complite, EntregaOn, PedidoOn,PagamentoOn};


