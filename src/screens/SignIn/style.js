import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'space-around',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },

  //--Btn`s
  primary_button: {
    backgroundColor: "rgba (rgba(0, 0, 0, 0.6))",
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  secundary_button: {
    width: "100%",
    height: 48,
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba (rgba(0, 0, 0, 0.5))",
    alignItems: "center",
    justifyContent: "center",
  },

  text_button_secundary: {
    color: "#000",
    fontSize: 16,
  },

  text_button: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  //--Input`s
  cont_input: {
    width: "100%",
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 6,
    borderColor: "rgba (rgba(0, 0, 0, 0.9))",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cont_input_search: {
    width: "92%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: "rgba (rgba(0, 0, 0, 0.4))",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  inputFoucsed: {
    backgroundColor: "#dedede",
  },
  input: {
    flex: 1,
    height: "100%",
    borderRadius: 6,
    fontSize: 16,
  },
  text_input_rot: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    fontSize: 8,
  },

  rotulos_inputs: {
    fontSize: 12,
    color: "#000",
  },

  line: {
    width: "100%",
    height: "auto",
    margin: 10,
    flexDirection: "column",
  },

  line_search: {
    width: "92%",
    height: "auto",
    margin: 10,
    flexDirection: "row",
  },
  text_search: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  line_btn: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
  },

  line_centered: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  cont_medias: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  icon_media: {
    width: 48,
    height: 48,
    margin: 12,
  },

  //Footer

  footer: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    position: "absolute",
    zIndex: 0,
    bottom: 20,
  },

  //List
  menu_list:{
    width:'100%',
    height:48,
    paddingHorizontal:20,
    paddingVertical:2,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  btn_list:{
    width:80,
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  activeBtn: {
    backgroundColor: '#fff', 
    color: '#fff',
    fontSize:20 
  },
  text_list:{
    fontSize:16
  },
  text_active:{
    fontSize:18,
    fontWeight:'bold',
    color:'#000',
    marginBottom:6,
    borderBottomWidth:2,
    borderBottomColor:'#000',
  },

  //modal
  modal:{
    flex:1,
    position:'absolute',
    zIndex:100,
    top:0,
    left:0,
    right:0,
  },

  cont_terms:{
    width:'100%',
    height:48,
    justifyContent:'center',
    alignItems:'center'
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default styles;
