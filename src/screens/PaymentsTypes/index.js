import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from "../../../context/CartContext"; // Importe o contexto do carrinho aqui

const PaymentScreen = () => {
  const route = useRoute();
  const { totalPrice } = useCart(); // Obtenha o totalPrice do contexto do carrinho
  console.log(totalPrice);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelectPayment = (paymentOption) => {
    setSelectedPayment(paymentOption);
  };

  const generatePixKey = () => {
    // Simulando a geração de uma chave PIX com o valor da compra
    const amount = parseFloat(purchaseAmount);
    if (!isNaN(amount) && amount > 0) {
      const generatedKey = `CHAVEPIX${purchaseAmount}`; // Lógica para gerar a chave PIX
      setPixKey(generatedKey);
    } else {
      Alert.alert('Erro', 'Por favor, insira um valor válido para a compra.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a forma de pagamento:</Text>

      <TouchableOpacity
        style={[styles.paymentOption, selectedPayment === 'pix' && styles.selectedOption]}
        onPress={() => handleSelectPayment('pix')}
      >
        <Text>Pix</Text>
        {selectedPayment === 'pix' && <Ionicons name="checkmark-circle" size={24} color="green" />}
      </TouchableOpacity>

      {selectedPayment === 'pix' &&
         <View style={styles.container}>
         <Text style={styles.title}>{totalPrice}</Text>
         <TextInput
           style={styles.input}
           placeholder="Digite o valor da compra"
           keyboardType="numeric"
           value={purchaseAmount}
           onChangeText={setPurchaseAmount}
         />
   
         <TouchableOpacity style={styles.button} onPress={generatePixKey}>
           <Text style={styles.buttonText}>Gerar Chave PIX</Text>
         </TouchableOpacity>
   
         {pixKey !== '' && (
           <View style={styles.pixKeyContainer}>
             <Text style={styles.pixKeyLabel}>Chave PIX:</Text>
             <Text style={styles.pixKey}>{pixKey}</Text>
           </View>
         )}
       </View>
      }
     
      <TouchableOpacity
        style={[styles.paymentOption, selectedPayment === 'dinheiro' && styles.selectedOption]}
        onPress={() => handleSelectPayment('dinheiro')}
      >
        <Text>Dinheiro</Text>
        {selectedPayment === 'dinheiro' && <Ionicons name="checkmark-circle" size={24} color="green" />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.paymentOption, selectedPayment === 'credito' && styles.selectedOption]}
        onPress={() => handleSelectPayment('credito')}
      >
        <Text>Crédito</Text>
        {selectedPayment === 'credito' && <Ionicons name="checkmark-circle" size={24} color="green" />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.paymentOption, selectedPayment === 'debito' && styles.selectedOption]}
        onPress={() => handleSelectPayment('debito')}
      >
        <Text>Débito</Text>
        {selectedPayment === 'debito' && <Ionicons name="checkmark-circle" size={24} color="green" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#e6f7ea',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pixKeyContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  pixKeyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pixKey: {
    fontSize: 16,
  },
});

export default PaymentScreen;
