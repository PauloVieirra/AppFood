import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "expo-router";
import AuthContext from "../../../context/AuthContext";
import { useNotification } from "../../../context/NotificationProvider";
import globalStyles from "../../app/styles";
import { Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CadOn } from "../../../Components/Comunications/Orientacoes";
import Checkbox from "../../../Components/Checkbox";

export default function CadStore() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const { signUpWithEmailAndPasswordAdm } = useContext(AuthContext);
  const { showCadNotification, handleShowsCadNotifications } =
    useNotification();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomecomercial, setNomeComercial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [tipo, setTipo] = useState("ADM");
  const [urlImage, setUrlImage] = useState("");
  const [isValidate, setIsValidate] = useState(false);
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleNotify = () => {
    handleShowsCadNotifications();
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const userRole = tipo === "ADM";
      await signUpWithEmailAndPasswordAdm(
        nome,
        email,
        password,
        telefone,
        nomecomercial,
        cnpj,
        urlImage,
        isValidate,
        tipo,
        userRole
      );
      handleNotify();
    } catch (error) {
      console.error("Erro ao criar a conta:", error.message); // Exibe o erro completo no console
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao criar a conta. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={globalStyles.container}>
      {showCadNotification && <CadOn />}

      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>Nome Comercial</Text>
        <View style={globalStyles.cont_input}>
          <TextInput
            style={globalStyles.input}
            value={nomecomercial}
            onChangeText={(text) => setNomeComercial(text)}
          />
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>CNPJ</Text>
        <View style={globalStyles.cont_input}>
          <TextInput
            style={globalStyles.input}
            value={cnpj}
            onChangeText={(text) => setCnpj(text)}
          />
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>Telefone</Text>
        <View style={globalStyles.cont_input}>
          <TextInput
            style={globalStyles.input}
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
          />
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>E-mail</Text>
        <View
          style={[
            globalStyles.cont_input,
            isFocused && globalStyles.inputFoucsed,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <TextInput
            style={globalStyles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Fontisto name="email" size={24} color="black" />
        </View>
      </View>
      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>Nome Completo</Text>
        <View style={globalStyles.cont_input}>
          <TextInput
            style={globalStyles.input}
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
          />
        </View>
      </View>

      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>Senha</Text>
        <View style={globalStyles.cont_input}>
          <TextInput
            style={globalStyles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Ionicons name="key-outline" size={24} color="black" />
        </View>
      </View>
      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>Repetir sua senha!</Text>
        <View style={globalStyles.cont_input}>
          <TextInput style={globalStyles.input} secureTextEntry={true} />
          <Ionicons name="key-outline" size={24} color="black" />
        </View>
      </View>
      <View style={globalStyles.line_btn}>
        <TouchableOpacity style={globalStyles.primary_button}>
          <Text style={globalStyles.text_button} onPress={handleSignUp}>
            CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
