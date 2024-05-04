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

export default function Home() {
    const navigation = useNavigation();
    const { user, alertcadastro, loading } = useContext(AuthContext);
    const { triggerNotification } = useNotification();
    const [lastNotificationStatus, setLastNotificationStatus] = useState('');

    useEffect(() => {
        const userOrdersRef = firebase.database().ref(`pedidos/${user.uid}`);
        userOrdersRef.on('value', async (snapshot) => {
            if (snapshot.exists()) {
                const ordersData = snapshot.val();
                const ordersList = Object.values(ordersData);

                ordersList.forEach(order => {
                    if (order.status !== lastNotificationStatus && order.status !== '') {
                        triggerNotification(); // Aciona a notificação
                        setLastNotificationStatus(order.status); // Atualiza o estado para o último status notificado
                    }
                });
            }
        });

        return () => {
            userOrdersRef.off();
        };
    }, [user, triggerNotification, lastNotificationStatus]);

    return (
        <View style={styles.container}>
            <MenuTop />
            <ListFruits tipo="frutas" />
            {alertcadastro === true && <ModalComplite />}
        </View>
    );
}
