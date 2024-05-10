import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "expo-router";
import styles from "./style";
import AuthContext from "../../../context/AuthContext";
import firebase from '../../../Servers/FirebaseConect';
import { useNotification } from "../../../context/NotificationProvider";
import MenuTop from "../../../Components/TopBar";
import { ModalComplite } from "../../../Components/Modals";
import ListFruits from "../../../Components/List";

export default function Home () {
    const navigation = useNavigation();
    const { user, alertcadastro, loading } = useContext(AuthContext);
    const { triggerNotification, controler } = useNotification();
    const [lastNotificationStatus, setLastNotificationStatus] = useState('');
    const [orders, setOrders] = useState([]);

   
    return (
        <View style={styles.container}>
            {!user.tipo && <ListFruits tipo="frutas" />}
            {alertcadastro && <ModalComplite />}
        </View>
    );
}
