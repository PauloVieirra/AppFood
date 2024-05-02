import {StyleSheet} from "react-native";

const styles = StyleSheet.create({

    cont_pay:{
     width:'100%',
     height:'100%',
     flexDirection:'row',
     paddingHorizontal:10,
     borderRadius:6,
     justifyContent:'space-evenly',
     alignItems:'center',
     backgroundColor:"#dedede"
    },
    btn_payments:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        flexDirection:'row'
    },
    text_btnpayments:{
        fontSize:19,
        fontWeight:'700',
        color:"#131313"
    },
    img:{
        width:48,
        height:60,
        resizeMode:'contain'
    }

})

export default styles;