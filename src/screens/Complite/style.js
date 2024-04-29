import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
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

  cont_into:{
    width:'80%',
    height:'40%',
    backgroundColor:'#fff',
    borderRadius:10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

  },
  cont_top:{
    width:'100%',
    height:48,
    alignItems:'flex-start',
    justifyContent:'flex-start',
  },
  cont_meedle:{
     width:'100%',
     height:'auto',
     justifyContent:'center',
     alignItems:'center',
  },
  cont_image:{
     width:120,
     height:120,
     borderRadius:60,
  },
    image:{
     width:'100%',
     height:'100%',
     borderRadius:60,
     backgroundColor:"#000"
    },
    sed_image:{
     width:'auto',
     height:'auto',
     padding:10,
     borderRadius:8,
     margin:10,
     backgroundColor:'green'
    },
  btn_close:{
    width:44,
    height:44,
    justifyContent:'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center', 
   
  },
  cont_body:{
    flex: 1,
    width: '100%',
    paddingVertical:20,
  },
  cont_bottom:{
    width:'100%',
    height:'auto',
    justifyContent:'flex-start',
    borderBottomEndRadius:12,
    borderBottomStartRadius:12,
    paddingVertical:30,

  },
  btn_complite:{
    width:'100%',
    height:'100%',
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
  text_complite:{
    fontSize:20,
    fontWeight:'700'
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
  cont_loading:{
    flex:1,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    position:'absolute',
    zIndex:100,
    top:0,
    left:0,
    right:0
  }
});

export default styles;