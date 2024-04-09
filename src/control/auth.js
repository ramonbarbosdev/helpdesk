import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  async function logar(id, login, senha) {
    if (login !== "" && senha !== "") {
      try {
        const response = await fetch(`http://10.0.0.120/apiHelpdesk/usuarios/listar/${id}`);
        const data = await response.json();

        if (data.tipo === 'sucesso') {
          const formUsuario = data.resposta;
          console.log(formUsuario)
          setUser(formUsuario); // Atualize o estado 'user' com os dados retornados da API

        



          navigation.navigate("Index");
        } else {
          console.log("Request failed:", response.status);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  }

  function resetData() {
    setUser({}); // Redefina o estado 'user' para um objeto vazio
  }

  function logout() {
    setUser({});
    navigation.navigate("Login");
    
  }

  return (
    <AuthContext.Provider value={{ logar, user, resetData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;