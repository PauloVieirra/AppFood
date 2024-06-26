import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "expo-router";
import AuthContext from "../../context/AuthContext";
import { EvilIcons } from "@expo/vector-icons";
import Imageplaceholder from "../../assets/personimg.png";

const CustomDrawerContent = () => {
  const navigation = useNavigation();
  const { signOut, user, userType } = useContext(AuthContext);
  

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  const handleOut = async () => {
    Alert.alert(
      "Você será desconectado!",
      "Tem certeza que deseja continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            signOut();
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cont_sup} />
          <View style={styles.cont_image}>
            {user.isValidate && user.complemento && user.complemento.urlImage ? (
              <Image
                source={{ uri: user.complemento.urlImage }}
                style={styles.image}
              />
            ) : (
              <Image source={Imageplaceholder} style={styles.image} />
            )}

            <View style={styles.cont_btn_edit}>
              <EvilIcons name="pencil" size={35} color="black" />
            </View>
          </View>
          <View style={styles.cont_space} />
          <View style={styles.line}>
            <Text style={styles.title}>
              {" "}
              {user.nome}
            </Text>
            <Text style={styles.title}></Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.cont_person}>
            <Text style={styles.label}>Telefone :</Text>
            {user.isValidate && user.complemento.urlImage ? (
              <Text>{user.complemento.telefone}</Text>
            ) : null}

            <Text style={styles.label}>Saldo Disponível:</Text>
            <Text style={styles.value}>$1,234.56</Text>
          </View>
        </View>
         {!user.tipo &&
             <TouchableOpacity
              style={styles.btnsmenu}
              onPress={() => handleNavigate("ProfileCad")}
            >
              <Text style={styles.drawerItem}>Atualizar dados</Text>
            </TouchableOpacity>
         }
  
        {user.tipo === "ADM" && user.isValidate && !user.isStore && (
            <TouchableOpacity
              style={styles.btnsmenu}
              onPress={() => handleNavigate("CadNewStore")}
            >
              <Text style={styles.drawerItem}>Criar Loja</Text>
            </TouchableOpacity>
       
        )}
        {user.tipo === "ADM" && user.isValidate && user.isStore && (
        
            <TouchableOpacity
              style={styles.btnsmenu}
              onPress={() => handleNavigate("Register")}
            >
              <Text style={styles.drawerItem}>Cadastar produtos</Text>
            </TouchableOpacity>
        )}
        {user.tipo === "ADM" && (
            <TouchableOpacity
              style={styles.btnsmenu}
              onPress={() => handleNavigate("ProfileAdm")}
            >
              <Text style={styles.drawerItem}>Atualizar dados</Text>
            </TouchableOpacity>
              )}
      
        {user.tipo === "AGT" && (
          <TouchableOpacity
            style={styles.btnsmenu}
            onPress={() => handleNavigate("CadStore")}
          >
            <Text style={styles.drawerItem}>Novo{'(a)'} Logista</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      
      <View style={{ height:56, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleOut}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  cont_sup: {
    width: "100%",
    height: 100,
    backgroundColor: "#2374A1",
  },
  cont_space: {
    width: "100%",
    height: 40,
  },
  btnsmenu: {
    width: "100%",
    height: 48,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(19, 19, 19, 0.3)",
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  cont_person: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#131313",
    marginBottom: 10,
  },
  cont_image: {
    position: "absolute",
    zIndex: 10,
    top: 44,
    left: "50%",
    marginLeft: -50,
    borderRadius: 50,
    backgroundColor: "#FFF", // cor de fundo da caixa
    // Sombra para Android
    elevation: 6, // profundidade da sombra
    // Sombra para iOS
    shadowColor: "#000", // cor da sombra
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.2, // opacidade da sombra
    shadowRadius: 3.84, // raio da sombra
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    width: "100%",
    height: 56,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  logoutText: {
    color: "#131313",
    fontSize: 16,
  },
  line: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  cont_btn_edit: {
    width: 35,
    height: 35,
    borderColor: "#CFFFE2",
    borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFFFE",
    position: "absolute",
    zIndex: 11,
    bottom: -6,
    right: -6,
    // Sombra para Android
    elevation: 6, // profundidade da sombra
    // Sombra para iOS
    shadowColor: "#000", // cor da sombra
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.2, // opacidade da sombra
    shadowRadius: 3.84, // raio da sombra
  },
});

export default CustomDrawerContent;
