// DetalhesProduto.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCart } from "../../../context/CartContext";
import MenuTop from "../../../Components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import Goback from "../../../Components/Comunications/Controles";
import CartComponent from "../../../Components/Carrinho";

export default function DetalhesProduto() {
  const tagColors = [
    "#FF5733",
    "#009100",
    "#3357FF",
    "#ad6200",
    "#FF33FF",
    "#6300a6",
    "#FF5733",
    "#ff3bde",
  ];
  const navigation = useNavigation();
  const route = useRoute();
  const produto = route.params.produto;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
 

  const formattedPrice = parseFloat(totalPrice).toFixed(2).slice(0, 6);

  const handleAddToCart = () => {
    if (quantity < 1) {
      Alert.alert(
        "Quantidade Inválida",
        "Informe a quantidade de itens desejados."
      );
      return;
    }

    addToCart({
      image: produto.image,
      nome: produto.nome,
      descricao: produto.descricao,
      id: produto.id,
      uid: produto.uid,
      price: produto.price,
      quantity: quantity,
      totalPrice: formattedPrice, // Corrigindo aqui para passar o novo totalPrice calculado
    });

    // Exibir mensagem de item adicionado ao carrinho
    Alert.alert("Sucesso", "Item adicionado ao carrinho.");

    setQuantity(0); // Reset quantity after adding to cart
  };

  const handleClear = () => {
    setQuantity(0);
    setTotalPrice(0);
    navigation.navigate("Home");
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setTotalPrice(produto.formattedPrice * (quantity + 1));
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setTotalPrice(produto.formattedPrice * (quantity - 1));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{width:'100%', height:50,flexDirection:'row'}}>
      <Goback/>
       <CartComponent/>
      </View>
      <View style={styles.cont_img}>
        <Image
          source={{ uri: produto.image }}
          style={{
            resizeMode: 'contain',
            height: "100%",
            width: "100%",
          }}
        />
      </View>
      <View style={styles.cont_rating}>
        <View style={styles.cont_btncount}>
          <TouchableOpacity style={styles.btn} onPress={handleIncrement}>
            <Text> + </Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.btn} onPress={handleDecrement}>
            <Text> - </Text>
          </TouchableOpacity>
        </View>
        <View style={{height:38}}><Text style={styles.total_price}>R$ {formattedPrice}</Text></View>
      </View>
      <View style={{width:'100%',flexDirection:'row', paddingHorizontal:20}}>
        <Text>Avaliacao do produto</Text>
      </View>
      <View style={styles.cont_rating}>
        <Text style={styles.title}>{produto.nome}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 16 }}>R$:</Text>
          <Text style={styles.price}>{produto.formattedPrice}</Text>
          <Text style={{ fontSize: 10 }}> kg</Text>
        </View>
      </View>
      <View style={styles.cont_datas}>
        <Text style={styles.description}>{produto.descricao}</Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            maxWidth: "100%",
            alignContent: "center",
          }}
        >
          <Text>Nutricional:</Text>
          <View style={[styles.tag, { backgroundColor: tagColors[0] }]}>
            <Text style={styles.tagText}>Proteínas</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: tagColors[1] }]}>
            <Text style={styles.tagText}>Aminoácidos</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: tagColors[2] }]}>
            <Text style={styles.tagText}>Lisina</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: tagColors[3] }]}>
            <Text style={styles.tagText}>Magnesio</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: tagColors[4] }]}>
            <Text style={styles.tagText}>Leucina</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: tagColors[5] }]}>
            <Text style={styles.tagText}>Vitamina B6</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: tagColors[6] }]}>
            <Text style={styles.tagText}>Vitamina K</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: tagColors[7] }]}>
            <Text style={styles.tagText}>Ácido Fólico</Text>
          </View>
        </View>

        <View style={styles.cont_count}>
          <View style={styles.cont_btnadd}>
            
            <TouchableOpacity style={styles.btn_add} onPress={handleAddToCart}>
              <Text style={styles.text_btn_add}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  cont_img: {
    flex: 1,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  cont_datas: {
    flex: 1,
    width: "100%",
    height: "60%",
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#5e5e5e",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5e5e5e",
  },
  total_price: {
    fontSize: 20,
    fontWeight: "500",
    color: "#575757",
    marginBottom: 10,
  },
  quantity: {
    width: 40,
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#5e5e5e",
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
  description: {
    fontSize: 16,
    textAlign: "justify",
    letterSpacing: 1,
  },
  cont_btncount: {
    flexDirection: "row",
    height: 38,
    borderRadius: 100,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  cont_count: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cont_btnadd: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  btn_add: {
    width: "100%",
    height: 48,
    backgroundColor: "#5ea84f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text_btn_add: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },
  cont_rating: {
    display: "flex",
    width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "linear-gradient(to right, #ff8a00, #da1b60)",
  },
  tag: {
    width: "auto",
    height: "auto",
    margin: 2,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 100,
    backgroundColor: "#dedede",
  },
  tagText: {
    fontSize: 10,
    color: "white",
  },
});
