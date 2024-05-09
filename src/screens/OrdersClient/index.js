import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import firebase from '../../../Servers/FirebaseConect';
import { useNotification } from '../../../context/NotificationProvider';
import styles from './style';

export default function PageClientOrder() {
    const { user } = useContext(AuthContext);
    const { uidLoja } = useCart();
    const { triggerNotification } = useNotification();
    const [orders, setOrders] = useState([]);
    const [userCity, setUserCity] = useState('');
    const [storeUid, setStoreUid] = useState('');
    const [loading, setLoading] = useState(true); // Adiciona estado para controlar o carregamento
    const [error, setError] = useState(null); // Adiciona estado para armazenar erros
    console.log(uidLoja, user.complemento.cidade);
    
    useEffect(() => {
        const fetchUserCityAndStoreUid = async () => {
            try {
                if (user && uidLoja) {
                    setUserCity(user.complemento.cidade);
                    setStoreUid(uidLoja);
                }
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                setError(error); // Define o erro no estado de erro
            }
        };

        fetchUserCityAndStoreUid();
    }, [user, uidLoja]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                if (userCity ) {
                    const userOrdersRef = firebase.database().ref(`lojas/${userCity}/k1MQRLk1UkOzNW5trrvfumWODyG3/pedidos/${user.uid}`);

                    userOrdersRef.on('value', async (snapshot) => {
                        if (snapshot.exists()) {
                            const ordersData = snapshot.val();
                            const ordersList = Object.values(ordersData);

                            const updatedOrdersList = ordersList.map(order => ({
                                ...order,
                                total: order.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
                            }));

                            setOrders(updatedOrdersList);
                            setLoading(false); // Define o carregamento como completo
                            setError(null); // Limpa o estado de erro
                            // Verificar e acionar notificações para cada pedido
                            updatedOrdersList.forEach(order => {
                                const newStatus = order.status?.trim().toLowerCase();
                                const newCode = order.codigo;
                                if ((newStatus === 'foi aceito' || newStatus === 'saiu para entrega') && newCode) {
                                    triggerNotification(newStatus, newCode);
                                }
                            });

                            await AsyncStorage.setItem('userOrders', JSON.stringify(updatedOrdersList));
                        } else {
                            // Define um erro personalizado se não houver pedidos encontrados
                            setError('Nenhum pedido encontrado.');
                            setLoading(false); // Define o carregamento como completo
                        }
                    });
                }
            } catch (error) {
                console.error('Erro ao buscar os pedidos:', error);
                setError(error); // Define o erro no estado de erro
            }
        };

        fetchUserOrders();

        return () => {
            const userOrdersRef = firebase.database().ref(`pedidos/${user.uid}`);
            userOrdersRef.off();
        };
    }, [userCity, storeUid, triggerNotification]);



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

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    if (error) {
        return <Text>Ocorreu um erro: {error}</Text>;
    }

    if (orders.length === 0) {
        return <Text>Nenhum pedido encontrado.</Text>;
    }

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
