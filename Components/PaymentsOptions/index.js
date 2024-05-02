import React from "react";
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import { FontAwesome6, FontAwesome, Entypo } from '@expo/vector-icons';
import Piximage from '../../assets/pix.png';
import Cardimage from '../../assets/credtcar.png';
import Moneyimage from '../../assets/money.png';
import styles from "./style";

 

const PixPayment = () => {

    const handlePix = () => {
        Alert.alert('Pix', 'Você selecionou Pix como forma de pagamento');
      };

    return(
    
        <TouchableOpacity style={styles.cont_pay} onPress={handlePix}>
        <Image source={Piximage} style={styles.img}/>
        <Text style={styles.text_btnpayments}>Pix</Text>
        </TouchableOpacity>
        
   
    );
}

const MoneyPayment = () => {

    const handleMoney = () => {
        Alert.alert('Dinheiro', 'Você selecionou Dinheiro como forma de pagamento');
      };
    return(
     
        <TouchableOpacity style={styles.cont_pay} onPress={handleMoney}>
       <Image source={Moneyimage} style={styles.img}/>
        <Text style={styles.text_btnpayments}>Dinheiro</Text>
        </TouchableOpacity>
       

    );
}

const CredtPayment = () => {

    const handleCredit = () => {
        Alert.alert('Crédito', 'Você selecionou Crédito como forma de pagamento');
      };
    return(
    
        <TouchableOpacity style={styles.cont_pay} onPress={handleCredit}>
         <Image source={Cardimage} style={styles.img}/>
         <Text style={styles.text_btnpayments}>Credito</Text>
        </TouchableOpacity>
        
     
    );
}

const DebitPayment = () => {

    const handleDebit = () => {
        Alert.alert('Débito', 'Você selecionou Débito como forma de pagamento');
      };
    return(
     
       <TouchableOpacity style={styles.cont_pay} onPress={handleDebit}>
        <Image source={Cardimage} style={styles.img}/>
        <Text style={styles.text_btnpayments}>Debito</Text>
        </TouchableOpacity>
        
    );
}







export  {PixPayment, MoneyPayment, CredtPayment, DebitPayment};