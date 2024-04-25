import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useCart } from "../../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const groupItemsById = (items) => {
    const groupedItems = {};

    items.forEach((item) => {
      // Verifica se o UID do item já existe no grupo
      if (!groupedItems[item.uid]) {
        // Se não existir, adiciona o item ao grupo
        groupedItems[item.uid] = {
          ...item,
          formattedPrice: item.formattedPrice, // Mantendo o totalPrice
          quantity: item.quantity, // Mantendo a quantity
        };
      } else {
        // Se existir, soma a quantidade e atualiza o totalPrice
        groupedItems[item.uid].quantity += item.quantity;
        groupedItems[item.uid].formattedPrice += item.formattedPrice;
      }
    });

    // Converte o objeto de itens agrupados de volta em um array
    return Object.values(groupedItems);
  };

  const groupedCartItems = groupItemsById(cart);

  return (
    <View style={styles.container}>
      <Text>Itens no Carrinho:</Text>
      {groupedCartItems.length === 0 ? (
        <Text>O carrinho está vazio</Text>
      ) : (
        <FlatList
          data={groupedCartItems}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.urlImage }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.title}>{item.nome}</Text>
                <Text style={styles.price}>Preço: {item.price}</Text>
                <Text style={styles.price}>Quantidade: {item.quantidade}</Text>
                <Text style={styles.price}>Valor Total: {item.totalPrice}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeButton}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <TouchableOpacity
        onPress={() => console.log("Finalizar Compra")}
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    margin: 8,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  geralrow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  topcard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
