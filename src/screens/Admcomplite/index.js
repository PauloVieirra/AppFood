import React, { useState, useContext } from "react";
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
import AuthContext from "../../../context/AuthContext";
import ImagePlaceholder from "../../../assets/personimg.png";
import styles from "./style";

const ProfileAdm = () => {
  const navigation = useNavigation();
  const { handleComplite, user } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [telefone, setTelefone] = useState(null);
  const [complemento, setComplemento] = useState("");
  const [imagePro, setImagePro] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

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
    handleComplite(nome, cidade, bairro, telefone, complemento, imagePro);
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
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
            placeholder="Nome Completo"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço"
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de Telefone"
            keyboardType="numeric"
            value={telefone}
            onChangeText={setTelefone}
          />
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={complemento}
            onChangeText={setComplemento}
          />
        </View>
      </ScrollView>
      <View style={styles.cont_bottom}>
        <Button
          title="Registrar"
          onPress={handleUploadImageAndRegister}
          disabled={
            !nome ||
            !cidade ||
            !bairro ||
            !telefone ||
            !complemento ||
            !imagePro
          }
        />
        
      </View>
    </View>
    </>
  );
};

export default ProfileAdm;
