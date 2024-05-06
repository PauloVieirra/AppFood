import React,{useRef, useEffect, useContext, useState} from "react";
import { View, Text,TouchableOpacity, Animated, PanResponder, Image } from "react-native";
import AuthContext from "../../../context/AuthContext";
import { useNotification } from "../../../context/NotificationProvider";
import { useNavigation } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
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
  const navigation = useNavigation();
  const { handleAlertNoPayment } = useContext(AuthContext);
  const { clearNotification } = useNotification();
  const [soundPlayed, setSoundPlayed] = useState(false);

  
    // Configura o PanResponder para detectar gestos de arrastar
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Se o gesto for para cima, fecha a notificação
        if (gestureState.dy < -50) {
          closeNotify();
        }
      },
    });

  useEffect(() => {
    if (!soundPlayed) {
      // Reproduzir áudio apenas se ainda não foi reproduzido
      playNotificationSound();
      setSoundPlayed(true);
    }
  }, [soundPlayed]);

  const playNotificationSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../Sounds/notifications/pedido.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir som de notificação:', error);
    }
  };

  const closeNotify = () => {
    setSoundPlayed(false); // Zerar a contagem quando o botão de fechar for clicado
    clearNotification();
  };

  const handleAddPay = () => {
    navigation.navigate("PaymentScreen");
  };

  const handleCancel = () => {
    handleAlertNoPayment(false);
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.cont_into}>
        <View style={styles.cont_top}>
          <TouchableOpacity style={styles.btn_close} onPress={closeNotify}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.cont_body}>
           <Image source={require('../../../assets/delivery.gif')} style={styles.gif}/>
          <View>
          <Text style={styles.notify_title}>OrSheep - Sua compra</Text>
          <Text style={styles.notify_text}>
            Seu pedido saiu para entrega.
          </Text>
          </View>
          
        </View>
      </View>
    </View>
  );
};

const PedidoOn = () => {
  const { clearNotification } = useNotification();
  const [soundPlayed, setSoundPlayed] = useState(false);

    // Configura o PanResponder para detectar gestos de arrastar
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Se o gesto for para cima, fecha a notificação
        if (gestureState.dy < -50) {
          closeNotify();
        }
      },
    });

  useEffect(() => {
    if (!soundPlayed) {
      // Reproduzir áudio apenas se ainda não foi reproduzido
      playNotificationSound();
      setSoundPlayed(true);
    }
  }, [soundPlayed]);

  const playNotificationSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../Sounds/notifications/pedido.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir som de notificação:', error);
    }
  };

  const closeNotify = () => {
    setSoundPlayed(false); // Zerar a contagem quando o botão de fechar for clicado
    clearNotification();
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.cont_into}>
        <View style={styles.cont_top}>
          <TouchableOpacity style={styles.btn_close} onPress={closeNotify}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.cont_body}>
           <Image source={require('../../../assets/acc.gif')} style={styles.gifacc}/>
          <View>
          <Text style={styles.notify_title}>OrSheep - Sua compra</Text>
          <Text style={styles.notify_text}>
            Seu pedido foi aceito e esta em preparação.
          </Text>
          </View>
          
        </View>
      </View>
    </View>
  );
};



  const PagamentoInfo = () => { 
    const navigation = useNavigation();
    const { handleAlertNoPayment  } = useContext(AuthContext);
    const { clearNotification } = useNotification();

    const closeNotify =() =>{
      clearNotification();
    }

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
        <TouchableOpacity style={styles.btn_complite} onPress={closeNotify}>
        <Text style={styles.text_btn}>Adicionar</Text>
        </TouchableOpacity>
        </View>
     
     
     
      </View>
      
    </View>
    );
  };








export {Complite, EntregaOn, PedidoOn,PagamentoInfo};


