import {StyleSheet} from "react-native";

const styles = StyleSheet.create({

 container:{
   width:'100%',
   height:'auto',
   maxHeight:120,
   marginVertical:10,
   flexDirection:'row',
   alignItems:'center',
  
   
 },  
 cont_img:{
   width:100,
   height:100,
 },
 cont_data:{
  flex:1,
  height:"100%",
  backgroundColor:'#fff',
  marginLeft:10,
 },
 img:{
    width:'100%',
    height:'100%',
    resizeMode:'contain',
 },
 data_a:{
    flex:1,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
 },
 text_nome:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000',
 },
 vt:{
    fontSize:22,
    fontWeight:'bold',
    color:"green"
 },
 btn_remover:{
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:24,
    backgroundColor:'#E85100'
 },
 cont_btncount: {
    flexDirection: "row",
    height: 38,
    borderRadius: 100,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },



});

export default styles;