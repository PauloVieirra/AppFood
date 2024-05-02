import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import CartContext from '../../context/CartContext';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import styles from './style';

const CardCarrinho = ({ image, nome, price, uid, unidade, selectedOption }) => {
    const { cart, removeFromCart, updateCartItem } = useContext(CartContext);

    // Encontra o item correspondente no carrinho com base no uid
    const cartItem = cart.find(item => item.uid === uid);

    // Estado local para a quantidade do item
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
    
    // Atualiza a quantidade local sempre que o item no carrinho mudar
    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [cartItem]);

    // Função para incrementar a quantidade
    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateCartItem(uid, newQuantity); // Atualiza a quantidade no carrinho
    };

    // Função para decrementar a quantidade
    const handleDecrement = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCartItem(uid, newQuantity); // Atualiza a quantidade no carrinho
        }
    };

    // Função para calcular o valor total do item
    const calculateTotalPrice = () => {
        if (cartItem) {
            return (cartItem.price * quantity).toFixed(2); // Calcula o novo valor total com base na nova quantidade
        } else {
            return 0;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cont_img}>
                <Image source={{ uri: image }} style={styles.img} />
            </View>
            <View style={styles.cont_data}>
                <View style={styles.data_a}>
                    <Text style={styles.text_nome}>{nome}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(uid)} style={styles.btn_remover} >
                    <Feather name="x" size={16} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.data_a}>
                    <Text style={styles.text_price}>R$ {price}{' '}por{' '}{unidade}{' '}{selectedOption}</Text>
                    <Text style={styles.text_quantidade}></Text>
                </View>
                <View style={styles.data_a}>
                    <View style={{ minWidth: '30%' }}>
                        <Text style={styles.vt}><Text style={{ fontSize: 20, fontWeight: '300', color: "green" }}>R$</Text> {calculateTotalPrice()}</Text>
                    </View>
                    <View>
                        <View style={styles.cont_btncount}>
                            <TouchableOpacity style={styles.btn} onPress={handleDecrement}>
                                <Text style={{fontSize:16}}> - </Text>
                            </TouchableOpacity>
                            <View style={styles.cont_quanty}>
                             <Text style={styles.quantity}>{quantity}</Text>   
                            </View>
                            
                            <TouchableOpacity style={styles.btn} onPress={handleIncrement}>
                                <Text style={{fontSize:16}}> + </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CardCarrinho;
