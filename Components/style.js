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
    width:46,
    height:46,
    borderRadius:23,
    borderColor:'green',
    borderWidth:2,
    
 },
 userdata:{
    flex:2,
    flexDirection:'row',
    height:'100%',
    justifyContent:'flex-start',
 },
 userdatasec:{
    flex:1,
    height:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
 },
 userdata_title:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000',
    marginLeft:10
 },
 userdata_email:{
   fontSize:12,
   fontWeight:'bold',
   color:'#000',
   marginLeft:10
}
});

export default styles;