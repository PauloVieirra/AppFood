import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "expo-router";
import AuthContext from "../../../context/AuthContext";
import globalStyles from "../../app/styles";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import Checkbox from "../../../Components/Checkbox";

export default function SignUp() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const { signUpWithEmailAndPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [telefone, setTelefone] = useState("61-99999999");
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      // Verifica se é um administrador ou não e define o tipo adequadamente
      const userRole = tipo === "ADM" ? "ADM" : "";
      await signUpWithEmailAndPassword(email, password, userRole, telefone);
      navigation.navigate("Home");
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
        <Text style={globalStyles.rotulos_inputs}>Senha</Text>
        <View style={globalStyles.cont_input}>
          <TextInput
            style={globalStyles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Digite sua senha"
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
        <TouchableOpacity
          style={globalStyles.secundary_button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={globalStyles.text_button_secundary}>
            Recuperar minha conta
          </Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.footer}>
        <Checkbox />
      </View>
    </View>
  );
}
