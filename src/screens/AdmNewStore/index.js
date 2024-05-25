import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import AuthContext from "../../../context/AuthContext";
import ImagePlaceholder from "../../../assets/personimg.png";
import styles from "./style";

const CadNewStore = () => {
  const navigation = useNavigation();
  const { handleNewStore, lat, lng } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [estado, setEstatdo] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState(null);
  const [cep, setCep] = useState("");
  const [uploading, setUploading] = useState(false);

  const locationUser = {lat, lng}

  const cidadesSatelites = [
    { id: 25, label: "Águas Claras", value: "Águas Claras" },
    { id: 1, label: "Brasília", value: "Brasília" },
    { id: 2, label: "Brazlândia", value: "brazlandia" },
    { id: 3, label: "Candangolândia", value: "candangolandia" },
    { id: 4, label: "Ceilândia", value: "ceilandia" },
    { id: 5, label: "Cruzeiro", value: "cruzeiro" },
    { id: 6, label: "Gama", value: "gama" },
    { id: 7, label: "Guará", value: "guara" },
    { id: 8, label: "Lago Norte", value: "Lago Norte" },
    { id: 9, label: "Lago Sul", value: "Lago Sul" },
    { id: 10, label: "Núcleo Bandeirante", value: "Núcleo Bandeirante" },
    { id: 11, label: "Paranoá", value: "Paranoá" },
    { id: 12, label: "Park Way", value: "Park Way" },
    { id: 13, label: "Planaltina", value: "Planaltina" },
    { id: 14, label: "Recanto das Emas", value: "Recanto das Emas" },
    { id: 15, label: "Riacho Fundo", value: "Riacho Fundo" },
    { id: 16, label: "Samambaia", value: "Samambaia" },
    { id: 17, label: "Santa Maria", value: "Santa Maria" },
    { id: 18, label: "São Sebastião", value: "São Sebastião" },
    { id: 19, label: "SCIA", value: "SCIA" },
    { id: 20, label: "Sobradinho", value: "sobradinho" },
    { id: 21, label: "Sudoeste e Octogonal", value: "Sudoeste e Octogonal" },
    { id: 22, label: "Taguatinga", value: "Taguatinga" },
    { id: 23, label: "Varjão", value: "Varjão" },
    { id: 24, label: "Vicente Pires", value: "Vicente Pires" },
  ];
  

  const handleRegister = () => {
    handleNewStore(nome, estado, cidade, bairro, rua, numero, cep, {locationUser});
  };

  return (
    <>
      {uploading && 
        <View style={styles.cont_loading}>
          <ActivityIndicator size="large" color="#131313" />
          <Text style={{fontSize:20, fontWeight:'bold'}}>Salvando seus dados!</Text>  
        </View>
       }
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.cont_top}>
            <TouchableOpacity onPress={() => navigation.navigate("HomeAdmPage")}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.cont_body}>
            <Text style={styles.title}>Cadastro da sua loja</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Comercial"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Estado"
              value={estado}
              onChangeText={setEstatdo}
            />
            <View style={styles.inputPicker}>
            <RNPickerSelect
              onValueChange={(value) => setCidade(value)}
              items={cidadesSatelites}
              value={cidade}
              placeholder={{ label: "Selecione a cidade", value: null }}
            />
            </View>
             <TextInput
              style={styles.input}
              placeholder="Bairro"
              value={bairro}
              onChangeText={setBairro}
            />
            <TextInput
              style={styles.input}
              placeholder="Rua"
              value={rua}
              onChangeText={setRua}
            />
          
            <TextInput
              style={styles.input}
              placeholder="Número"
              keyboardType="numeric"
              value={numero}
              onChangeText={setNumero}
            />
            <TextInput
              style={styles.input}
              placeholder="CEP"
              value={cep}
              onChangeText={setCep}
            />
          </View>
        </ScrollView>
        <View style={styles.cont_bottom}>
          <Button
            title="Registrar"
            onPress={handleRegister}
            disabled={!nome || !estado || !cidade || !rua || !numero || !cep}
          />
        </View>
      </View>
    </>
  );
};

export default CadNewStore;
