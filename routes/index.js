import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import TabBar from "../Components/Tab";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";
import AdmRoutes from "./AdmRoutes"; // Importe a nova rota de administração
import AuthContext from "../context/AuthContext";
import { BemVindo } from "../Components/Comunications/Loadings";

function Routes() {
  const { user, loading } = useContext(AuthContext);
 

  if (loading) {
    return (
      <BemVindo/>
    );
  }

  // Verifica se o usuário está autenticado
  if (!user) {
    return <AuthRoutes />;
  }

  // Verifica se o usuário é do tipo ADM
  if (user.tipo === "ADM") {
    return <AdmRoutes />;
  }

  // Se não for ADM, renderiza as rotas de usuário normal
  return  <AppRoutes />;
}

export default Routes;

