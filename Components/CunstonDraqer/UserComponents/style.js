import React from "react";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
 constainer:{
    width:'100%',
    height:62,
    alignItems:'center',
    flexDirection:'row',
    marginBottom:20,
    paddingHorizontal:20,
 },
 userimg:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:"#dedede"
 },
 userdata:{
    flex:2,
    height:'100%',
    marginLeft:10,
    backgroundColor:"#dedede"
 },
 userdatasec:{
    flex:1,
    height:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    backgroundColor:"#dedede"
 },
 userdata_title:{
    fontSize:18,
    fontWeight:'bold',
    color:'#000'
 }
});

export default styles;