import React, { useContext, useEffect } from "react";
import AgenteRoutes from "./AgenteRoutes";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";
import AdmRoutes from "./AdmRoutes"; 
import AuthContext from "../context/AuthContext";
import { BemVindo } from "../Components/Comunications/Loadings";

function Routes() {
  const { user, loading, handleLoading } = useContext(AuthContext);
  console.disableYellowBox = true;

  

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

   // Verifica se o usuário é do tipo ADM
   if (user.tipo === "AGT") {
     
      return <AgenteRoutes />;
  }

  // Se não for ADM, renderiza as rotas de usuário normal
     return  <AppRoutes />;
}

export default Routes;

