import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import firebase from "../../../Servers/FirebaseConect";
import RNPickerSelect from "react-native-picker-select";
import AuthContext from "../../../context/AuthContext";
import ImagePlaceholder from "../../../assets/personimg.png";
import styles from "./style";

const ProfileAdm = () => {
  const navigation = useNavigation();
  const { handleCompliteAdm, user, lat, lng } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [estado, setEstatdo] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState(null);
  const [cep, setCep] = useState("");
  const [imagePro, setImagePro] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const locationUser = {lat, lng}

  const cidadesSatelites = [
    { id: 25, label: "Águas Claras", value: "aguasclaras" },
    { id: 1, label: "Brasília", value: "brasilia" },
    { id: 2, label: "Brazlândia", value: "brazlandia" },
    { id: 3, label: "Candangolândia", value: "candangolandia" },
    { id: 4, label: "Ceilândia", value: "ceilandia" },
    { id: 5, label: "Cruzeiro", value: "cruzeiro" },
    { id: 6, label: "Gama", value: "gama" },
    { id: 7, label: "Guará", value: "guara" },
    { id: 8, label: "Lago Norte", value: "lago_norte" },
    { id: 9, label: "Lago Sul", value: "lago_sul" },
    { id: 10, label: "Núcleo Bandeirante", value: "nucleo_bandeirante" },
    { id: 11, label: "Paranoá", value: "paranoa" },
    { id: 12, label: "Park Way", value: "park_way" },
    { id: 13, label: "Planaltina", value: "planaltina" },
    { id: 14, label: "Recanto das Emas", value: "recanto_das_emas" },
    { id: 15, label: "Riacho Fundo", value: "riacho_fundo" },
    { id: 16, label: "Samambaia", value: "samambaia" },
    { id: 17, label: "Santa Maria", value: "santa_maria" },
    { id: 18, label: "São Sebastião", value: "sao_sebastiao" },
    { id: 19, label: "SCIA", value: "scia" },
    { id: 20, label: "Sobradinho", value: "sobradinho" },
    { id: 21, label: "Sudoeste e Octogonal", value: "sudoeste_e_octogonal" },
    { id: 22, label: "Taguatinga", value: "taguatinga" },
    { id: 23, label: "Varjão", value: "varjao" },
    { id: 24, label: "Vicente Pires", value: "vicente_pires" },
  ];
  
 

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

   

    if (!result.canceled) {
      setImagePro(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    try {
      setUploading(true);

      const response = await fetch(imagePro);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref()
        .child(`imagens/${new Date().toISOString()}`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();

      setImagePro(url);
      setUploading(false);

      return url; // Retorna a URL da imagem
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao enviar a imagem. Por favor, tente novamente."
      );
      // Retorna uma string vazia em caso de erro
    }
  };

  const handleUploadImageAndRegister = async () => {
    try {
      const url = await handleUploadImage();

      if (url) {
        // Se a URL da imagem não estiver vazia, prosseguir com o registro
        setImagePro(url); // Definir a URL da imagem no estado
        handleRegister(); // Chamar a função de registro
      } else {
        // Se a URL da imagem estiver vazia, exibir uma mensagem de erro ou tomar outra ação adequada
        console.error("A URL da imagem está vazia após o envio.");
        Alert.alert(
          "Erro",
          "A URL da imagem está vazia após o envio. Por favor, tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar imagem e registrar:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao enviar a imagem e registrar. Por favor, tente novamente."
      );
    }
  };

  const handleRegister = () => {
    handleCompliteAdm(nome, estado,cidade,bairro,rua,numero,cep,imagePro, {locationUser} );
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

        <View style={styles.cont_meedle}>

          {user.isValite === true  ? (
            <TouchableOpacity onPress={pickImage} style={styles.cont_image}>
              <Image
                source={{ uri: user.complemento.urlImage }}
                style={styles.image}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={imagePro ? null : pickImage}
              style={styles.cont_image}
            >
              <Image
                source={imagePro ? { uri: imagePro } : ImagePlaceholder}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
          
        </View>
      
        <View style={styles.cont_body}>
          <Text style={styles.title}>Cadastro de Perfil ADM</Text>
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
          onPress={handleUploadImageAndRegister}
          disabled={
            !imagePro
          }
        />
        
      </View>
    </View>
    </>
  );
};

export default ProfileAdm;
