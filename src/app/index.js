import 'react-native-gesture-handler';
import React from "react";
import 'react-native-get-random-values';
import { AuthProvider } from "../../context/AuthContext";
import { NotificationProvider } from '../../context/NotificationProvider';
import Routes from "../../routes/index";

export default function App() {
  return (

    <AuthProvider>
      <NotificationProvider>
         <Routes />
      </NotificationProvider>
    </AuthProvider>
    
  );
}
