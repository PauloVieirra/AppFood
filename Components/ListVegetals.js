import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import firebase from "../Servers/FirebaseConect";
import Card from "./Cards";

const ListVegetais = () => {
  const [vegetals, setVegetals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Função para buscar os dados da subpasta "vegetais" do Firebase Realtime Database
    const fetchVegetals = async () => {
      try {
        const snapshot = await firebase
          .database()
          .ref("produtos/vegetais")
          .once("value");
        const vegetalsData = snapshot.val();
        if (vegetalsData) {
          const vegetalsArray = Object.entries(vegetalsData).map(
            ([uid, vegetal]) => ({
              uid, // Adiciona o UID do vegetal ao objeto
              ...vegetal,
            })
          );
          setVegetals(vegetalsArray);
          console.log(vegetalsArray);
        }
      } catch (error) {
        console.error("Erro ao buscar vegetais:", error);
      }
    };

    fetchVegetals(); // Chamada da função para buscar os dados ao montar o componente
  }, []);

  // Função para filtrar os resultados com base no termo de pesquisa
  const filteredVegetals = vegetals.filter((vegetal) =>
    vegetal.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Pesquisar vegetais..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Text>Lista de Vegetais:</Text>
      <FlatList
        data={filteredVegetals}
        renderItem={({ item }) => (
          <Card
            nome={item.nome}
            price={item.price}
            image={item.image}
            descricao={item.descricao}
            quantidade={item.quantidade}
            id={item.id}
            uid={item.uid}
          />
        )}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
};

export default ListVegetais;
