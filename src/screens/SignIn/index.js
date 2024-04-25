import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "expo-router";
import AuthContext from "../../../context/AuthContext";
import globalStyles from "../../app/styles";
import {
  Fontisto,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

export default function Signin() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedicon, setIsFocusedicon] = useState(false);
  const { signInWithEmailAndPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    signInWithEmailAndPassword(email, password);
  };
  const handleFocus = () => {
    setIsFocusedicon(true);
  };
  const handleBlur = () => {
    setIsFocusedicon(false);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.line}>
        <Text style={globalStyles.rotulos_inputs}>E-mail</Text>
        <View
          style={globalStyles.cont_input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <TextInput
            style={globalStyles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
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
            secureTextEntry={!showPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Ionicons name="key-outline" size={24} color="black" margin={3} />
          {isFocusedicon && (
            <TouchableOpacity onPress={toggleShowPassword}>
              {showPassword ? (
                <Ionicons name="eye-off" size={24} color="grey" margin={3} />
              ) : (
                <Ionicons name="eye" size={24} color="grey" margin={3} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={globalStyles.line_btn}>
        <TouchableOpacity style={globalStyles.primary_button}>
          <Text style={globalStyles.text_button} onPress={handleSignIn}>
            ENTRAR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.secundary_button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={globalStyles.text_button_secundary}>CRIAR CONTA</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.line_btn}>
        <View style={globalStyles.line_centered}>
          <Text style={{ fontSize: 16 }}>Ou entre usando uma conta</Text>
        </View>
        <View style={globalStyles.cont_medias}>
          <FontAwesome5
            name="instagram-square"
            size={42}
            color="#131313"
            margin={10}
          />

          <FontAwesome
            name="facebook-official"
            size={42}
            color="#131313"
            margin={10}
          />

          <FontAwesome5
            name="google-plus-square"
            size={42}
            color="#131313"
            margin={10}
          />
        </View>
      </View>
    </View>
  );
}
