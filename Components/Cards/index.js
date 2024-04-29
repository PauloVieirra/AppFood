import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import CartContext from '../../context/CartContext';
import styles from './style';

const CardCarrinho = ({ image, nome, descricao, id, price, uid, curtadescricao }) => {
    const { cart, removeFromCart, updateCartItem } = useContext(CartContext);
    const groupItemsByUid = cart.reduce((acc, item) => {
      if (!acc[item.uid]) {
        acc[item.uid] = { ...item, quantity: item.quantity, totalPrice: item.totalPrice };
      } else {
        acc[item.uid].quantity += item.quantity;
        acc[item.uid].totalPrice += item.totalPrice;
      }
      return acc;
    }, {});
  
    const totalPrice = Object.values(groupItemsByUid).reduce((acc, item) => acc + item.totalPrice, 0);
  
    return (
      <View style={styles.container}>
        <View style={styles.cont_img}>
          <Image source={{ uri: image }} style={styles.img} />
        </View>
        <View style={styles.cont_data}>
          <Text>{nome}</Text>
          <Text>Preço: R$ {price}</Text>
          <Text>Quantidade: {groupItemsByUid[uid].quantity}</Text>
          <Text>Valor Total: R$ {groupItemsByUid[uid].totalPrice}</Text>
          <TouchableOpacity onPress={() => removeFromCart(uid)}>
            <Text style={styles.removeButton}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const Cart = () => {
    const { cart } = useCart();
  
    const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  
    return (
      <View style={styles.container}>
        {/* Restante do seu código */}
        <Text>Total da Compra: R$ {totalPrice.toFixed(2)}</Text>
      </View>
    );
  };
  

export default CardCarrinho;
