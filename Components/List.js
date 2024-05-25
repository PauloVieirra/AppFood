import React, { useEffect, useState, useRef, useContext } from "react";
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
  const { user, lat, lng, address, forceUpdate } = useContext(AuthContext); // Adiciona forceUpdate ao contexto
  const [fruits, setFruits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [secondList, setSecondList] = useState(false);
  const [category, setCategory] = useState('frutas');
  const [activeCategory, setActiveCategory] = useState('frutas');
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const searchBarHeight = useRef(new Animated.Value(50)).current;
 
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let databaseRef;
        if (user && user.cidade || user.complemento.cidade) {
          const storePath = `${address.city}`;
          databaseRef = firebase.database().ref(`lojas/${storePath}`);
        } else {
          // Se o usuário não tiver a informação da cidade, mostrar a segunda tela e chamar a função de atualização do contexto
          setSecondList(true);
          forceUpdate(); // Chama a função de atualização do contexto
          setLoading(false);
          return;
        }
  
        let closestStoreProducts = [];
        let closestDistance = Infinity;
        databaseRef.on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const store = childSnapshot.val();
            const { locationUser, produtos } = store;
            if (produtos && produtos[category]) {
              const storeProducts = Object.values(produtos[category]);
              const distance = calculateDistance(lat, lng, locationUser.lat, locationUser.lng);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestStoreProducts = storeProducts;
              }
            }
          });
          setFruits(closestStoreProducts);
          AsyncStorage.setItem("products", JSON.stringify(closestStoreProducts));
          setLoading(false);
        });
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  
    return () => {
      if (address && address.city) {
        const storePath = `${address.city}`;
        firebase.database().ref(`lojas/${storePath}`).off();
      }
    };
  }, [address, category, lat, lng, forceUpdate]);
  

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleManualUpdate = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('products');
      const localData = await AsyncStorage.getItem('products');
      if (localData) {
        setFruits(JSON.parse(localData));
      }
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
    const scrollLimit = 300;
  
    if (offset <= scrollLimit) {
      setSearchBarVisible(true);
      toggleSearchBar(true);
    } else {
      setSearchBarVisible(false);
      toggleSearchBar(false);
    }
  };

  const toggleSearchBar = (show) => {
    Animated.timing(
      searchBarHeight,
      {
        toValue: show ? 50 : 0,
        duration: 20,
        easing: Easing.ease,
        useNativeDriver: false,
      }
    ).start();
  };
  
  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
      {secondList ? (
         <View style={{flex:1}}>
          <View>
            <Text>E uma satisfação indescritível te ter por aqui,</Text>
            <Text>nossa busca é baseada na sua localização, por isso precisamos de alguns dados,</Text>
            <Text>para te oferecer uma experiência eficiente.,</Text>
          </View>
          <TouchableOpacity onPress={forceUpdate}>
             <Text>Completar Cadastro</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <View style={globalStyles.menu_list}>
            <TouchableOpacity style={[globalStyles.btn_list, activeCategory === 'frutas' ? globalStyles.activeBtn : null]} 
              onPress={() => {
                setCategory('frutas');
                setActiveCategory('frutas');
              }}>
              <Text style={[globalStyles.text_list, activeCategory === 'frutas' ? globalStyles.text_active : null]}>Frutas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[globalStyles.btn_list, activeCategory === 'legumes' ? globalStyles.activeBtn : null]} 
              onPress={() => {
                setCategory('legumes');
                setActiveCategory('legumes');
              }}>
              <Text style={[globalStyles.text_list, activeCategory === 'legumes' ? globalStyles.text_active : null]}>Legumes</Text>
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
            <BuscandoProdutos />
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
                  identify={item.identify}
                  key={item.id}
                />
              )}
              keyExtractor={(item) => item.id}
              onScroll={handleScroll}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ListFruits;
