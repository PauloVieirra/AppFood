import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../src/app/styles";

const Card = ({ image, nome, descricao, id, price ,uid, curtadescricao, unidade, selectedOption }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { user, handleAlertCadastro } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      image,
      nome,
      descricao,
      id,
      quantity,
      uid,
      totalPrice,
      curtadescricao,
      price,
      unidade,
      selectedOption,
    });
  };

  const handlePressAdd = () => {
    if (user.tipo === "ADM") {
      // Se o usuário for do tipo ADM, chama a função para navegar para a tela de edição de produto
      navigateToProductEditScreen();
    } else {
      // Se o usuário for válido, adiciona ao carrinho
      handleAddToCart();
    } 
  };



  const navigateToProductEditScreen = () => {
    navigation.navigate("ProductEditScreen", {
      produto: {
        image,
        nome,
        descricao,
        id,
        formattedPrice,
        curtadescricao,
        uid,
        quantity,
        price,
        unidade,
        selectedOption,
      },
    });
  }

  const handleCardPress = () => {
    // Navegue para a tela de detalhes, passando os dados do produto como parâmetro
    navigation.navigate("DetalhesProduto", {
      produto: {
        image,
        nome,
        descricao,
        id,
        formattedPrice,
        curtadescricao,
        uid,
        quantity,
        price,
        unidade,
        selectedOption,
      },
    });
  };

  const formattedPrice = parseFloat(price).toFixed(2).slice(0, 6);
  const totalPrice = formattedPrice;

  return (
    <>
      <TouchableOpacity onPress={handleCardPress} style={styles.touche_view}>
        <View style={styles.card}>
          <View style={styles.topcard}>
            <TouchableOpacity />
          </View>
          <View style={styles.geralrow}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title}>{nome}</Text>
              <Text style={styles.curt_descricao}>{curtadescricao}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>
                  <Text style={{ color: "#969799", fontWeight: "300" }}>
                    R$
                  </Text>{" "}
                  {formattedPrice}
                </Text>
                <Text>{unidade}{''}{selectedOption !== null && selectedOption !== undefined ? `(${selectedOption})` : ''}</Text>

                <TouchableOpacity
                  style={styles.btn_add_cart}
                  onPress={handlePressAdd}
                >
                  <Text style={{ fontWeight: "500", color: "#454545" }}>
                    {user.tipo === "ADM" ? "Editar" : "Add Carrinho"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
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
    width: "96%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  image: {
    width: 100,
    height: "100%",
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
    color: "#50ad7a",
  },
  row: {
    width: "100%",
    height: 38,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cont_count: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  cont_btnadd: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_add: {
    width: "100%",
    height: 48,
    backgroundColor: "#dedede",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btn_add_cart: {
    width: "auto",
    height: 38,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ffc157",
  },
  touche_view: {
    flex: 1,
    padding: 10,
    width: "100%",
    height: "100%",
  },
});

export default Card;
