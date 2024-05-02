import {StyleSheet} from "react-native";

const styles = StyleSheet.create({

 container:{
   width:'100%',
   height:'auto',
   maxHeight:100,
   marginVertical:10,
   flexDirection:'row',
   alignItems:'center',
  
   
 },  
 cont_img:{
   width:70,
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
    fontSize:18,
    fontWeight:'bold',
    color:'#000',
 },
 vt:{
    fontSize:18,
    fontWeight:'bold',
    color:"green"
 },
 btn_remover:{
    width:30,
    height:30,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:24,
    backgroundColor:'(rgba(187,187,187,0.6))'
 },
 cont_btncount: {
    flexDirection: "row",
    height: 38,
    borderRadius: 100,
    
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    borderRadius:20,
    alignItems: "center",
    backgroundColor: "(rgba(255,191,95,0.5))",
  },
  cont_quanty:{
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
  },
  quantity:{
    fontSize:16,
    fontWeight:'600',
  }



});

export default styles;