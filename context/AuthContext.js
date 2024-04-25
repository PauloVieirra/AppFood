import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../Servers/FirebaseConect";
import * as Location from 'expo-location';
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertcadastro, setAlertCadastro] = useState(false);
  console.log(alertcadastro);


  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userData = await AsyncStorage.getItem("Auth_user");
        if (userData) {
          const currentUser = JSON.parse(userData);
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
      setLoading(false);
    };

    checkUserLoggedIn();

    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          try {
            await AsyncStorage.setItem(
              "Auth_user",
              JSON.stringify(firebaseUser)
            );

            // Busca os detalhes do usuário no banco de dados em tempo real
            const userRef = firebase
              .database()
              .ref(`users/${firebaseUser.uid}`);
            userRef.once("value", (snapshot) => {
              const userData = snapshot.val();
              setUser((prevUser) => ({ ...prevUser, ...userData }));
            });
          } catch (error) {
            console.error("Error saving user data:", error);
          }
        } else {
          setUser(null);
          try {
            await AsyncStorage.removeItem("Auth_user");
          } catch (error) {
            console.error("Error removing user data:", error);
          }
        }
      });

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []);

  useEffect(() =>{
    getLocation();
  },[]);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização não concedida');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      reverseGeocode(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      setAddress(response.data.address);
    } catch (error) {
      console.error('Erro ao converter coordenadas em endereço:', error);
    }
  };

  const signInWithEmailAndPassword = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const { user } = userCredential;

      // Busca os detalhes do usuário no banco de dados em tempo real
      const userRef = firebase.database().ref(`users/${user.uid}`);
      userRef.once("value", (snapshot) => {
        const userData = snapshot.val();
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        AsyncStorage.setItem("Auth_user", JSON.stringify(updatedUser)); // Salva todos os detalhes do usuário
      });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmailAndPassword = async (
    email,
    password,
    tipo,
    telefone
  ) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        setUser(user);
        await AsyncStorage.setItem("Auth_user", JSON.stringify(user));
        // Registra os detalhes do usuário no banco de dados em tempo real
        await firebase.database().ref(`users/${user.uid}`).set({
          email: user.email,
          uid: user.uid,
          tipo: tipo,
          telefone: telefone,
          cidade: endereco.cidade,
          nome: nome,
          isValidate: isValidate, // Defina o tipo do usuário no banco de dados
          // Adicione outros campos necessários, se houver
        });
      } else {
        console.error("Usuário não definido ao criar a conta");
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      setUser(null);
      await AsyncStorage.removeItem("Auth_user");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertCadastro = () => {
    if (!alertcadastro) {
      setAlertCadastro(true);
    } else {
      setAlertCadastro(false);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        location,
        address,
        alertcadastro,
        handleAlertCadastro,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
