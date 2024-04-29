import React from "react";
import { View, Text } from "react-native";
// Components/Alertas/Comunication/index.js

const Premium = () => { 
  return (
    <View>
      <Text>Complete seu cadastro</Text>
    </View>
  );
};

const Negado = () => { 
    return (
      <View>
        <Text>Entrega</Text>
      </View>
    );
  };

const Pedido = () => {
    return(
        <View>
            <Text>
                Pedido aceito
            </Text>
        </View>
    );
}  

 

export {Premium, Negado, Pedido};


