import React, { createContext, useState } from 'react';

const NotificationContext = createContext();

// No arquivo NotificationService.js

export const NotificationProvider = ({ children }) => {
    const [loadingDelivery, setLoadingDelivery] = useState(false);
    const [lastNotifiedStatus, setLastNotifiedStatus] = useState([]);
  const [showCadNotification, setShowCadNotification] = useState(false);
    console.log(lastNotifiedStatus);

    const triggerNotification = (newStatus, newCode) => {
        if (newCode && newStatus !== lastNotifiedStatus.item.status) {
            const index = lastNotifiedStatus.findIndex(item => item.code === newCode);

            
            // Se a notificação para este pedido já existe, atualiza o status
            if (index !== -1) {
                setLastNotifiedStatus(prevState => {
                    const updatedNotifications = [...prevState];
                    updatedNotifications[index].status = newStatus;
                    return updatedNotifications;
                });
            } else { // Se não, adiciona uma nova notificação
                setLastNotifiedStatus(prevState => [
                    ...prevState,
                    { status: newStatus, code: newCode }
                ]);
            }

            setLoadingDelivery(true);
        } else {
            console.warn("Código ou status do pedido é indefinido.");
        }
    };

    const clearNotification = () => {
        setLoadingDelivery(false);
    };

    const handleShowsCadNotifications = () => {
        setShowCadNotification(!showCadNotification);
      }

    return (
        <NotificationContext.Provider
            value={{
                triggerNotification,
                clearNotification,
                handleShowsCadNotifications,
                loadingDelivery,
                lastNotifiedStatus,

            }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => React.useContext(NotificationContext);
