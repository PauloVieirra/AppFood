import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from "../../../context/AuthContext";
import firebase from '../../../Servers/FirebaseConect';

export default PageClientOrder = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

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
                            // Salvar os pedidos localmente usando AsyncStorage
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
            userOrdersRef.off(); // Remove o ouvinte
        };
    }, [user]);

    const renderCartItem = (item) => {
        return (
            <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.nome}</Text>
                    <Text style={styles.itemPrice}>Preço: R${item.price}</Text>
                    <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
                </View>
            </View>
        );
    };

    return (
        <View>
            <Text>Lista de Pedidos: {user ? user.uid : ''}</Text>
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <View>
                        <Text>Detalhes do Pedido:</Text>
                        <Text>ID do Pedido: {item.uid}</Text>
                        <Text>Endereço: {item.bairro}</Text>
                        <Text>Itens do Carrinho:</Text>
                        {item.cart.map((cartItem, index) => (
                            <View key={index}>
                                {renderCartItem(cartItem)}
                            </View>
                        ))}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#888',
    },
});
