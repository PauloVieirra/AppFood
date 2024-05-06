import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position:'absolute',
    backgroundColor:"(rgba(0,0,0,0.5))",
    zIndex:100,
    top:0,
    left:0,
    justifyContent: "flex-start",
    alignItems: "center",
    
    
  },
  cont_into:{
    width:'100%',
    height:"auto",
    backgroundColor:'#fff',
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    paddingBottom:6,
    elevation: 5,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

  },
  cont_top:{
    width:'100%',
    height:44,
    flexDirection:'row-reverse',
  },
  btn_close:{
    width:44,
    height:44,
    justifyContent:'center',
  },
  cont_body:{
    width:'100%',
    height:'auto',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },
  cont_bottom:{
    width:'100%',
    height:'25%',
    justifyContent:'center',
    alignItems:'center',
    borderBottomEndRadius:12,
    borderBottomStartRadius:12,
    paddingHorizontal:20,
    backgroundColor:'#fff'
  },
  btn_complite:{
    width:'100%',
    height:48,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green',
    shadowColor: "#000",
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },

  },
  notify_title:{
    fontSize:18,
    fontWeight:'600'
  },
  notify_text:{
    fontSize:14,
  },
  text_btn:{
    color:'#fff',
    fontSize:18,
    fontWeight:'400',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cont_loader:{
    flex:1,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#fff",
    position:'absolute',
    zIndex:100,
    top:0,
    left:0,
  },
  gif:{
    width: 80, 
    height:48,            
  },
  gifacc:{
    width: 60, 
    height:48,            
  },
  
});

export default styles;