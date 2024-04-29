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
import CardCarrinho from "../../../Components/Cards/index";
import Goback from "../../../Components/Comunications/Controles";

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
      {groupedCartItems.length === 0 ? (
        <View style={styles.container}>
          <View style={{ width:'100%',height:50}}>
            <Goback/>
          </View>
           <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center' }}>
              <Text>Carrinho Vazio</Text>
           </View>
        </View>
      ) : (
        <View style={{ width:'100%',height:'90%'}}>
           <View style={{ width:'100%',height:50}}>
            <Goback/>
            </View>
        <FlatList
          data={groupedCartItems}
          renderItem={({ item }) => (
            
            <View style={styles.card}>
              <CardCarrinho
              descricao={item.descricao}
              id={item.id}
              image={item.urlImage}
              nome={item.nome}
              price={item.price}
              totalprice={item.totalprice}
              curtadescricao={item.curtadescricao}
              uid={item.uid}
              />
            </View>

          )}
          keyExtractor={(item) => item.uid.toString()}
        />
        
        </View>
      )}
       <View>
      <TouchableOpacity
        onPress={() => console.log("Finalizar Compra")}
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutText}>Finalizar Compra</Text>
      </TouchableOpacity>
      </View>
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
