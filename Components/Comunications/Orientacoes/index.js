import React,{useRef, useEffect, useContext} from "react";
import { View, Text,TouchableOpacity, Animated } from "react-native";
import AuthContext from "../../../context/AuthContext";
import { useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import styles from "./style";

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



  const PagamentoInfo = () => { 
    const navigation = useNavigation();
    const { handleAlertNoPayment  } = useContext(AuthContext);

      const handleAddPay = () => {
      navigation.navigate("PaymentScreen");
    };

    const handleCancel = () => {
      handleAlertNoPayment(false);
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
           Precisa adicionar no minimo um meio de pagamento.
        </Text>
        </View>
        <View style={styles.cont_bottom}>
        <TouchableOpacity style={styles.btn_complite} onPress={handleAddPay}>
        <Text style={styles.text_btn}>Adicionar</Text>
        </TouchableOpacity>
        </View>
     
     
     
      </View>
      
    </View>
    );
  };








export {Complite, EntregaOn, PedidoOn,PagamentoInfo};


