import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import firebase from "../../../Servers/FirebaseConect";
import * as ImagePicker from "expo-image-picker";

const ProductEditScreen = ({ route, navigation }) => {
  const { produto } = route.params;
  const [editedProduct, setEditedProduct] = useState(produto);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setEditedProduct(produto);
  }, [produto]);

  const handleFieldChange = (fieldName, value) => {
    // Atualiza apenas o campo alterado
    setEditedProduct({
      ...editedProduct,
      [fieldName]: value,
    });
  };

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
      handleFieldChange("urlImage", result.uri);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setUploading(true);
      // Atualizar os dados do produto no banco de dados
      await firebase
        .database()
        .ref(`produtos/${editedProduct.category}/${editedProduct.uid}`)
        .set(editedProduct);

      setUploading(false);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Editar Produto
      </Text>
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
        }}
        placeholder="Nome"
        value={editedProduct.nome}
        onChangeText={(text) => handleFieldChange("nome", text)}
      />
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
        }}
        placeholder="Curta descricao"
        value={editedProduct.curtadescricao}
        onChangeText={(text) => handleFieldChange("curtadescricao", text)}
        maxLength={92}
      />
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
        }}
        placeholder="Preço"
        value={editedProduct.price}
        onChangeText={(text) => handleFieldChange("price", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          height: 100,
        }}
        placeholder="Descrição"
        value={editedProduct.descricao}
        onChangeText={(text) => handleFieldChange("descricao", text)}
        multiline
        maxLength={283}
      />
      {editedProduct.urlImage && (
        <Image
          source={{ uri: editedProduct.urlImage }}
          style={{ width: 300, height: 300, marginBottom: 20 }}
        />
      )}
      <Button title="Selecionar imagem" onPress={pickImage} />
      <Button
        title="Salvar Alterações"
        onPress={handleSaveChanges}
        disabled={uploading}
      />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default ProductEditScreen;
