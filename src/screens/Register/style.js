import { StyleSheet } from 'react-native';

const heightValue = 300;

const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: '#fff', // Altere conforme necessário
    padding: 20,
  },
  container_inter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor:'#000'
  },
  content_container: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message_container: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  bottom_container: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  btnselect:{
    width:'40%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
    backgroundColor:'#fff',
    shadowColor: "#000",
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  btn_unselect:{
    width:'40%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
    backgroundColor:'#dedede',
    shadowColor: "#000",
    elevation: 1,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
},
cont_bar:{
width:'100%',
height:120,
alignItems: 'flex-end',
justifyContent:'space-between',
flexDirection:'row',
paddingHorizontal:20,
paddingBottom:30,
},

text_dialog:{
fontSize:22,
color:'#000',
fontWeight:'bold',
}



});

export default styles;
