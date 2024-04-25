import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileCad = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = () => {
    // Lógica para registrar os dados do usuário
    console.log('Nome:', name);
    console.log('Endereço:', address);
    console.log('Cidade:', city);
    console.log('CEP:', postalCode);
    console.log('Telefone:', phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Telefone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default ProfileCad;
