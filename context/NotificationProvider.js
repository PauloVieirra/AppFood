import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [sound, setSound] = useState();

    const playNotificationSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../Components/Sounds/notifications/pedido.mp3')
            );
            setSound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error('Erro ao reproduzir som de notificação:', error);
        }
    };

    const stopNotificationSound = async () => {
        if (sound) {
            await sound.unloadAsync();
        }
    };

    const triggerNotification = () => {
        playNotificationSound();
    };

    return (
        <NotificationContext.Provider
            value={{
                triggerNotification,
                stopNotificationSound
            }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
