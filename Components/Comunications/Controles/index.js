import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";


const Goback = () => {
    const navigation = useNavigation(); 
  
    return (
      <View style={styles.container}>
        <View style={styles.cont_btn}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.text_btn}>Voltar</Text>
        </View>
      </View>
    );
  };


 const styles = StyleSheet.create({
  container:{
    width:'50%',
    height:50,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    backgroundColor:'#fff',



  },
  cont_btn:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
  },
  text_btn:{
    marginLeft:10,
    fontSize:18,
    color:'#000',
  }
  });


  export default Goback;


 

 

