import React from "react";
import {View, Text, TouchableOpacity,Image} from "react-native";
import styles from "./style";

const CardOrders = ({cidade, price, quantity}) => {
    return(
        <TouchableOpacity style={styles.container}>
             <View style={styles.cont_img}>
              
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{cidade}</Text>
                    <Text style={styles.itemPrice}>Preço: R${price}</Text>
                    <Text style={styles.quantity}>Quantidade: {quantity}</Text>
                </View>
            </View>




        </TouchableOpacity>
    );
}

export {CardOrders};



