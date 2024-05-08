import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../../../context/AuthContext";
import firebase from '../../../Servers/FirebaseConect';
import { useNotification } from '../../../context/NotificationProvider';
import styles from './style';

export default function PageClientOrder() {
    const { user } = useContext(AuthContext);
    const { triggerNotification } = useNotification();
    const [orders, setOrders] = useState([]);
    console.log(user.complemento.nome);
    
    // No arquivo PageClientOrder.js

// No arquivo PageClientOrder.js

useEffect(() => {
    const fetchUserOrders = async () => {
        try {
            if (user) {
                const userOrdersRef = firebase.database().ref(`pedidos/${user.uid}`);
                userOrdersRef.on('value', async (snapshot) => {
                    if (snapshot.exists()) {
                        const ordersData = snapshot.val();
                        const ordersList = Object.values(ordersData);

                        const updatedOrdersList = ordersList.map(order => ({
                            ...order,
                            total: order.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
                        }));

                        setOrders(updatedOrdersList);

                        // Verificar e acionar notificações para cada pedido
                        updatedOrdersList.forEach(order => {
                            const newStatus = order.status?.trim().toLowerCase();
                            const newCode = order.codigo; 
                            if ((newStatus === 'foi aceito' || newStatus === 'saiu para entrega') && newCode) { 
                                triggerNotification(newStatus, newCode);
                            }
                        });

                        await AsyncStorage.setItem('userOrders', JSON.stringify(updatedOrdersList));
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
}, [user, triggerNotification]);



    const CardOrders = ({ order }) => {
        const formattedTotal = order.total?.toString().substring(0, 4) ?? ''; // Tratamento de undefined

        return (
            <>
            <View style={styles.card}>
                <Text>{user.complemento.nome }</Text>
                <Text>Codigo: {order.codigo}</Text>
                <Text>{user.complemento.telefone}</Text>
                <Text>{order.cidade}{','} {order.bairro}{','} {order.numero}</Text>
               
            </View>
            <View style={styles.carddown}>
                <Text>Valor R${formattedTotal}</Text>
                <Text>Seu pedido {order.status}</Text>
            </View>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text_top}>Meus Pedidos</Text>
                <Text style={styles.text_top}></Text>
            </View>
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
