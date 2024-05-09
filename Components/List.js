import React, { useEffect, useState,useRef, useContext } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import firebase from "../Servers/FirebaseConect";
import globalStyles from "../src/app/styles";
import { BuscandoProdutos } from "./Comunications/Loadings";
import Card from "./Cards";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

const ListFruits = () => {
  const {user, address} = useContext(AuthContext);
  const [fruits, setFruits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('frutas');
  const [activeCategory, setActiveCategory] = useState('frutas');
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const searchBarHeight = useRef(new Animated.Value(50)).current;
 
   console.log(user.complemento.cidade);

   useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let databaseRef;
        if (user.complemento && user.complemento.cidade) {
          const storePath = `${user.complemento.cidade}`;
          databaseRef = firebase.database().ref(`lojas/${storePath}`);
        } else {
          databaseRef = firebase.database().ref(`lojas/aguasclaras`);
        }
        databaseRef.on("value", (snapshot) => {
          const productsData = snapshot.val();
          if (productsData) {
            let allProducts = [];
            if (Array.isArray(productsData)) {
              // Se a resposta é um array, iterar sobre os nós
              productsData.forEach((store) => {
                if (store.produtos && store.produtos[category]) {
                  const storeProducts = Object.values(store.produtos[category]);
                  allProducts = [...allProducts, ...storeProducts];
                }
              });
            } else {
              // Se a resposta é um objeto, iterar sobre as chaves (UIDs das lojas)
              Object.entries(productsData).forEach(([storeUid, store]) => {
                if (store.produtos && store.produtos[category]) {
                  const storeProducts = Object.values(store.produtos[category]);
                  allProducts = [...allProducts, ...storeProducts];
                }
              });
            }
            setFruits(allProducts);
            AsyncStorage.setItem("products", JSON.stringify(allProducts));
          } else {
            setFruits([]);
            AsyncStorage.setItem("products", JSON.stringify([]));
          }
          setLoading(false);
        });
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  
    return () => {
      // Remover o listener quando o componente é desmontado
      if (user.complemento && user.complemento.cidade) {
        const storePath = `${user.complemento.cidade}/${user.uid}`;
        firebase.database().ref(`lojas/${storePath}/produtos/${category}`).off();
      } else {
        firebase.database().ref(`lojas`).off();
      }
    };
  }, [user.complemento.cidade, category]);
  
  
  
  
   

  const handleManualUpdate = async () => {
    setLoading(true);
    try {
      // Remover os dados armazenados localmente
      await AsyncStorage.removeItem('products');

      // Recarregar os dados locais (se houver)
      const localData = await AsyncStorage.getItem('products');
      if (localData) {
        setFruits(JSON.parse(localData));
      }

      // Mostrar mensagem de sucesso
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar manualmente:", error);
      Alert.alert("Erro", "Erro ao atualizar os dados. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const filteredFruits = fruits.filter((fruit) =>
    fruit.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollLimit = 300; // Defina o limite de rolagem desejado
  
    if (offset <= scrollLimit) {
      setSearchBarVisible(true);
      toggleSearchBar(true); // Mostrar a barra de pesquisa
    } else {
      setSearchBarVisible(false);
      toggleSearchBar(false); // Esconder a barra de pesquisa
    }
  };
  

  const toggleSearchBar = (show) => {
    Animated.timing(
      searchBarHeight,
      {
        toValue: show ? 50 : 0, // Defina a altura final da animação (0 para esconder, 50 para mostrar)
        duration: 20, // Duração da animação em milissegundos
        easing: Easing.ease, // Tipo de easing
        useNativeDriver: false, // Desativar o uso do driver nativo
      }
    ).start(); // Iniciar a animação
  };
  
  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
      <View style={globalStyles.menu_list}>
        <TouchableOpacity style={[globalStyles.btn_list, activeCategory === 'frutas' ? globalStyles.activeBtn : null]} 
          onPress={() => {
            setCategory('frutas');
            setActiveCategory('frutas');
          }}>
          <Text style={[globalStyles.text_list, activeCategory === 'frutas' ? globalStyles.text_active : null]}>Frutas</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={[globalStyles.btn_list, activeCategory === 'legumes' ? globalStyles.activeBtn : null]} 
          onPress={() => {
            setCategory('legumes');
            setActiveCategory('legumes');
          }}>
          <Text style={[globalStyles.text_list, activeCategory === 'legumes' ? globalStyles.text_active : null]} >Legumes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[globalStyles.btn_list, activeCategory === 'verduras' ? globalStyles.activeBtn : null]} 
          onPress={() => {
            setCategory('verduras');
            setActiveCategory('verduras');
          }}>
          <Text style={[globalStyles.text_list, activeCategory === 'verduras' ? globalStyles.text_active : null]}>Verduras</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleManualUpdate}><Ionicons name="cloud-download-outline" size={24} color="black" /></TouchableOpacity>
      </View>

      
        <Animated.View style={[globalStyles.cont_input_search, { height: searchBarHeight }]}>
        <TextInput
          style={globalStyles.input}
          placeholder="Pesquisar"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <AntDesign name="search1" size={24} color="black" />
      </Animated.View>

      

      {loading ? (
        <BuscandoProdutos/>
      ) : (
        <FlatList
          data={filteredFruits}
          renderItem={({ item }) => (
            <Card
              descricao={item.descricao}
              id={item.id}
              image={item.urlImage}
              nome={item.nome}
              price={item.price}
              curtadescricao={item.curtadescricao}
              uid={item.uid}
              unidade={item.unidade}
              selectedOption={item.selectedOption}
              
            />
          )}
          keyExtractor={(item) => item.uid}
          onScroll={handleScroll}
        />
      )}
    </View>
  );
};

export default ListFruits;
