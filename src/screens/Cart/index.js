import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import { useCart } from "../../../context/CartContext";
import AuthContext from "../../../context/AuthContext";
import { useNavigation } from "expo-router";
import CardCarrinho from "../../../Components/Cards/index";
import { PagamentoInfo } from "../../../Components/Comunications/Orientacoes";
import { PixPayment, MoneyPayment, CredtPayment, DebitPayment } from "../../../Components/PaymentsOptions";
import Goback from "../../../Components/Comunications/Controles";

const Cart = () => {
  const navigation = useNavigation();
  const { user, quantity,alertNoPayments ,handleAlertNoPayment } = useContext(AuthContext);
  
  const { cart, updateCartItem,  } = useCart();
  const [groupedCartItems, setGroupedCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
   console.log(cart);


  const handlePayType = () => {
        handleAlertNoPayment(true);
  }

  // Função para agrupar os itens por UID
  const groupItemsById = (items) => {
    const groupedItems = {};

    items.forEach((item) => {
      if (!groupedItems[item.uid]) {
        groupedItems[item.uid] = {
          ...item,
          totalPrice: parseFloat(item.totalPrice), // Convertendo para número
          quantity: item.quantity,
        };
      } else {
        groupedItems[item.uid].quantity += item.quantity;
        groupedItems[item.uid].totalPrice += parseFloat(item.totalPrice); // Convertendo para número e somando
      }
    });

    // Converte o objeto de itens agrupados de volta em um array
    return Object.values(groupedItems);
  };

  // Função para atualizar o carrinho e o preço total sempre que a quantidade de um item é alterada
  const handleUpdateCartItem = (uid, newQuantity) => {
    updateCartItem(uid, newQuantity);
  };

  // Atualiza o preço total sempre que o carrinho mudar
  useEffect(() => {
    const updatedGroupedCartItems = groupItemsById(cart);
    setGroupedCartItems(updatedGroupedCartItems);

    // Calcula o novo preço total
    const newTotalPrice = updatedGroupedCartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    setTotalPrice(newTotalPrice);
   
  }, [cart]); // Atualiza sempre que o carrinho mudar

  const handlePressPay = () => {
    if (user.tipo === "ADM") {
      console.log('Clicou ADM')
    } else if (user.isValidate) {
      navigation.navigate('PaymentScreen', { cart: groupedCartItems, totalPrice: totalPrice });
    } else {
      // Se o usuário não for válido, exibe um alerta de cadastro
      handlePayType();
    }
  };

  return (
    <View style={styles.container}>
      {groupedCartItems.length === 0 ? (
        <View style={styles.container}>
          <View style={{ width: "100%", height: 50 }}>
            <Goback />
          </View>
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Carrinho Vazio</Text>
          </View>
        </View>
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <View style={{ width: "100%", height: 50 }}>
            <Goback />
            
          </View>
          {alertNoPayments === true &&  <PagamentoInfo/>}
          <FlatList
            data={groupedCartItems}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <CardCarrinho
                  descricao={item.descricao}
                  id={item.id}
                  image={item.image}
                  nome={item.nome}
                  price={item.price}
                  unidade={item.unidade}
                  selectedOption={item.selectedOption}
                  totalprice={item.totalprice}
                  curtadescricao={item.curtadescricao}
                  uid={item.uid}
                  onUpdateCartItem={handleUpdateCartItem}
                  identify={item.identify}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          /> 

          <View style={styles.cont_bottom}>
            <View
              style={{
                width: "50%",
                height: "100%",
                maxHeight: 100,
                justifyContent: "center",
                backgroundColor: "#F1F2F1",
                alignItems: "center",
              }}
            >
              <Text style={styles.totalPrice}>R$ {totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              onPress={handlePressPay}
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    


    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
  cont_bottom: {
    width: "100%",
    height: 60,
    maxHeight: 130,
    flexDirection: "row",
    backgroundColor: "DEDEDE",
  },
  checkoutButton: {
    width: "50%",
    height: "100%",
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  totalPrice: {
    fontSize: 26,
    fontWeight: "600",
    color: "#131313",
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical:30,
  },
  gridItem: {
    width: '50%', 
    height: 60, 
    padding:4,
  },
});
