import {StyleSheet} from "react-native";

const styles = StyleSheet.create({

 container:{
   width:'100%',
   height:100,
   flexDirection:'row',
   alignItems:'center',
   backgroundColor:'#fff',
 },  
 cont_img:{
   width:100,
   height:100,
 },
 cont_data:{
  flex:1,
  height:"100%",
  backgroundColor:"#dedede"
 },
 img:{
    width:'100%',
    height:'100%',
    resizeMode:'contain',
    backgroundColor:"#000"
 }


});

export default styles;