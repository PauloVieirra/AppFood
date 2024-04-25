import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../Servers/FirebaseConect";
import globalStyles from "../src/app/styles";
import Card from "./Cards";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

const ListFruits = () => {
  const [fruits, setFruits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('frutas');
  const [activeCategory, setActiveCategory] = useState('frutas');

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        const localData = await AsyncStorage.getItem('products');
        if (localData) {
          setFruits(JSON.parse(localData));
        }
      } catch (error) {
        console.error("Erro ao carregar dados locais:", error);
      }
    };

    loadLocalData();
  }, []);

  useEffect(() => {
    const fetchFruits = async () => {
      setLoading(true);
      try {
        const snapshot = await firebase
          .database()
          .ref(`produtos/${category}`)
          .once("value");
        const fruitsData = snapshot.val();
        if (fruitsData) {
          const fruitsArray = Object.entries(fruitsData).map(
            ([uid, fruit]) => ({
              uid,
              ...fruit,
            })
          );
          setFruits(fruitsArray);
          await AsyncStorage.setItem('products', JSON.stringify(fruitsArray));
        }
      } catch (error) {
        console.error("Erro ao buscar frutas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, [category]);

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

        <TouchableOpacity  style={[globalStyles.btn_list, activeCategory === 'vegetais' ? globalStyles.activeBtn : null]} 
        onPress={() => {
          setCategory('vegetais');
          setActiveCategory('vegetais');
        }}>
          <Text style={[globalStyles.text_list, activeCategory === 'vegetais' ? globalStyles.text_active : null]} >Vegetais</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[globalStyles.btn_list, activeCategory === 'ortalicas' ? globalStyles.activeBtn : null]} 
        onPress={() => {
          setCategory('ortalicas');
          setActiveCategory('ortalicas');
        }}>
          <Text style={[globalStyles.text_list, activeCategory === 'ortalicas' ? globalStyles.text_active : null]}>Ortalicas</Text>
          </TouchableOpacity>
        <TouchableOpacity onPress={handleManualUpdate}><Ionicons name="cloud-download-outline" size={24} color="black" /></TouchableOpacity>
      </View>
      <View style={globalStyles.cont_input_search}>
        <TextInput
          style={globalStyles.input}
          placeholder="Pesquisar"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
        <AntDesign name="search1" size={24} color="black" />
      </View>

      {loading ? (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large"/>
          <Text style={{ marginTop: 10 }}>Procurando produtos perto de você...</Text>  
        </View>
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
            />
          )}
          keyExtractor={(item) => item.uid}
        />
      )}

      
    </View>
  );
};

export default ListFruits;
