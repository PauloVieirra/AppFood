import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../../../context/AuthContext";
import firebase from '../../../Servers/FirebaseConect';
import { useNotification } from '../../../context/NotificationProvider';
import { Audio } from 'expo-av';

export default PageClientOrder = () => {
    const { user } = useContext(AuthContext);
    const { triggerNotification } = useNotification();
    const [orders, setOrders] = useState([]);
    const [notificationPlayed, setNotificationPlayed] = useState(''); 
    console.log(notificationPlayed);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                if (user) {
                    const userOrdersRef = firebase.database().ref(`pedidos/${user.uid}`);
                    userOrdersRef.on('value', async (snapshot) => {
                        if (snapshot.exists()) {
                            const ordersData = snapshot.val();
                            const ordersList = Object.values(ordersData);
                            setOrders(ordersList);

                            ordersList.forEach(order => {
                                if (order.status !== notificationPlayed && order.status !== '') {
                                    triggerNotification(); // Aciona a notificação
                                    setNotificationPlayed(order.status); // Atualiza o estado para indicar que a notificação foi reproduzida
                                    Alert.alert('Pedido Atualizado', 'Seu pedido foi alterado.');
                                }
                            });

                            await AsyncStorage.setItem('userOrders', JSON.stringify(ordersList));
                        }
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar os pedidos:', error);
            }
        };

        fetchUserOrders();

        return () => {
            const userOrdersRef = firebase.database().ref(`pedidos/${user.uid}`);
            userOrdersRef.off();
        };
    }, [user, triggerNotification, notificationPlayed]);

    const CardOrders = ({ order }) => {
        return (
            <View style={styles.card}>
                <Text>Detalhes do Pedido:</Text>
                <Text>ID do Pedido: {order.id}</Text>
                <Text>Endereço: {order.bairro}</Text>
                <Text>Endereço: {order.status}</Text>
                <Text>Itens do Carrinho:</Text>
                {order.cart.map((cartItem, index) => (
                    <View key={index}>
                        <Text>Nome do Item: {cartItem.nome}</Text>
                        <Text>Preço: R${cartItem.price}</Text>
                        <Text>Quantidade: {cartItem.quantity}</Text>
                        <Image source={{ uri: cartItem.image }} style={styles.image} />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View>
            <Text>Lista de Pedidos:</Text>
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <CardOrders order={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image:{
        width: 100,
        height: 100,
    }
});
