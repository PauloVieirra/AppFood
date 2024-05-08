import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../../context/AuthContext";
import firebase from "../../../Servers/FirebaseConect";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";

const Register = () => {
  const { user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState("");
  const [price, setPrice] = useState("");
  const [descricao, setDescricao] = useState("");
  const [curtadescricao, setCurtaDescricao] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagesent, setImageSent] = useState(false);
  const [unidade, setUnidade] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(user.complemento);

  const unidadesMedida = [
    { label: "Quilograma (kg)", value: "kg" },
    { label: "Grama (g)", value: "g" },
    { label: "Litro (L)", value: "L" },
    { label: "Mililitro (mL)", value: "mL" },
    // Adicione mais opções conforme necessário
  ];

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setShowOptions(false);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleClear = () => {
    setCategory("");
    setStep(1);
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
      setImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    try {
      setUploading(true);

      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref()
        .child(`imagens/${new Date().toISOString()}`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();

      setUrlImage(url);
      setUploading(false);
      setImageSent(true);
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao enviar a imagem. Por favor, tente novamente."
      );
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    try {
      // Verificar se a categoria foi selecionada
      if (!category) {
        throw new Error("Selecione uma categoria antes de enviar.");
      }

      const storePath = `${user.complemento.cidade}/${user.uid}`;

      // Gravação dos dados do produto no Realtime Database com uma chave única e URL da imagem
      const newProductRef = await firebase
        .database()
        .ref(`lojas/${storePath}/produtos/${category}`)
        .push(); // Gera uma nova chave única para o produto
      const productId = newProductRef.key; // Obtém o ID único gerado
      await newProductRef.set({
        id: productId, // Adiciona o ID único ao objeto do produto
        nome,
        price,
        descricao,
        curtadescricao,
        unidade,
        selectedOption,
        urlImage: urlImage || "", // Se urlImage for null, definir como string vazia
      });

      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      // Limpar os dados do formulário
      setNome("");
      setPrice("");
      setUnidade("");
      setSelectedOption(null);
      setCategory("");
      setDescricao("");
      setCurtaDescricao("");
      setUrlImage(null); // Limpar o URL da imagem
      setImage(null);
      setImageSent(false);
      setStep(1); // Resetar para a primeira etapa
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao cadastrar o produto. Por favor, tente novamente."
      );
    }
  };

  const progressStepsStyle = {
    activeStepIconBorderColor: "#0a0d64",
    activeLabelColor: "#0a0d64",
    activeStepNumColor: "white",
    activeStepIconColor: "#0a0d64",
    completedStepIconColor: "#0a0d64",
    completedProgressBarColor: "#0a0d64",
    completedCheckColor: "white",
  };

  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps {...progressStepsStyle} activeStep={step - 1}>
        <ProgressStep
          label="Etapa 1"
          removeBtnRow={true}
          nextBtnDisabled={!category}
        >
          <View style={{ flex: 1, height: 120, alignItems: "center" }}>
            {!category && (
              <View style={styles.message_container}>
                <Text style={styles.text_dialog}>
                  Vamos cadastrar um produto, primeiro escolha a categoria do
                  novo produto.
                </Text>
              </View>
            )}
            {category && (
              <View style={styles.message_container}>
                <Text style={styles.text_dialog}>
                  Perfeito, vamos cadastrar {category}, toque em avancar no fim
                  da tela.
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              height: "auto",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            {category === "" || category === "frutas" ? (
              <TouchableOpacity
                style={styles.btnselect}
                onPress={() => setCategory("frutas")}
              >
                <Text>Frutas</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn_unselect}
                disabled={true}
                onPress={() => setCategory("frutas")}
              >
                <Text style={{ color: "#010101" }}>Frutas</Text>
              </TouchableOpacity>
            )}

            {category === "" || category === "legumes" ? (
              <TouchableOpacity
                style={styles.btnselect}
                onPress={() => setCategory("legumes")}
              >
                <Text>Legumes</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn_unselect}
                disabled={true}
                onPress={() => setCategory("legumes")}
              >
                <Text>Legumes</Text>
              </TouchableOpacity>
            )}
            {category === "" || category === "verduras" ? (
              <TouchableOpacity
                style={styles.btnselect}
                onPress={() => setCategory("verduras")}
              >
                <Text>Verduras</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn_unselect}
                disabled={true}
                onPress={() => setCategory("verduras")}
              >
                <Text>Verduras</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
            {category && <Button title="Cancelar" onPress={handleClear} />}
          </View>
          <View style={styles.cont_bar}>
            {category && step > 1 ? (
              <Button title="Etapa Anterior" onPress={handlePreviousStep} />
            ) : (
              <Button
                title="Sair"
                onPress={() => navigation.navigate("HomeAdmPage")}
              />
            )}

            <Button
              title="Avançar"
              onPress={handleNextStep}
              disabled={!category}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Etapa 2"
          removeBtnRow={true}
          nextBtnDisabled={!category}
        >
          <View style={{ flex: 1, padding: 20 }}>
            <View style={styles.message_container}>
              <Text style={styles.text_dialog}>
                Atencao os dados do seu produto, os clientes preferem produtos
                bem descritos.
              </Text>
            </View>
            <View style={{ flex: 1, padding: 20 }}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
              ></Text>
              <TextInput
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
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
                value={curtadescricao}
                onChangeText={setCurtaDescricao}
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
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
              <View>
                <View
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    style={{
                      flex: 1,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      marginRight: 5,
                    }}
                    placeholder="Quantidade"
                    value={unidade}
                    onChangeText={setUnidade}
                    keyboardType="numeric"
                  />

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      marginLeft: 5,
                    }}
                    onPress={toggleOptions}
                  >
                    <Text>{selectedOption || "Selecione uma opção"}</Text>
                  </TouchableOpacity>
                </View>
                {showOptions && (
                  <View style={styles.dropdownOptions}>
                    {unidadesMedida.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.option}
                        onPress={() => handleOptionSelect(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

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
                value={descricao}
                onChangeText={setDescricao}
                multiline
                maxLength={283}
              />
            </View>
          </View>
          <View style={styles.cont_bar}>
            <Button title="Etapa Anterior" onPress={handlePreviousStep} />
            <Button
              title="Próxima Etapa"
              onPress={handleNextStep}
              disabled={
                !category || !nome || !curtadescricao || !price || !descricao
              }
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Etapa 3"
          removeBtnRow={true}
          nextBtnDisabled={!category}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
            >
              Etapa 3: Envie uma imagem
            </Text>

            <View style={{ flex: 1, backgroundColor: "#dedede" }}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 300, height: 300 }}
                />
              )}

              {uploading && <ActivityIndicator size="large" color="#0000ff" />}

              {image && uploading && <Text>Enviando imagem...</Text>}
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginVertical: 10,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {imagesent === false && !image ? (
              <Button title="Selecionar imagem" onPress={pickImage} />
            ) : (
              <Button
                title="Mudar imagem"
                onPress={pickImage}
                disabled={imagesent === true}
              />
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginVertical: 30,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {imagesent === false && image && !uploading ? (
              <Button title="Enviar Imagem" onPress={handleUploadImage} />
            ) : null}
            {imagesent === true ? <Text>Imagem enviada</Text> : null}
          </View>

          <View style={styles.cont_bar}>
            <Button title="Etapa Anterior" onPress={handlePreviousStep} />
            <Button
              title="Próxima Etapa"
              onPress={handleNextStep}
              disabled={
                !category || !nome || !curtadescricao || !price || !descricao
              }
            />
          </View>
        </ProgressStep>

        <ProgressStep label="Etapa 4">
          <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 1, padding: 20 }}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
              >
                Etapa 4: Envie o cadastro
              </Text>
              {uploading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Button
                  title="Enviar Cadastro"
                  onPress={handleUpload}
                  disabled={!urlImage}
                />
              )}
              {uploading && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
            <Text>teste</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default Register;
