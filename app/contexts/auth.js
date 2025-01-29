import React, { createContext, useState } from "react";
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({});
import api from "../services/api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigation = useNavigation();

  async function signUp(email, password, nome) {
    if (email === "" || password === "" || nome === "") {
      alert("Preencha todos os campos");
      return;
    }
    setLoadingAuth(true);
    try {
      const response = await api.post("/users", {
        name: nome,
        password: password,
        email: email
      })

      setLoadingAuth(false);
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao efetuar o cadastro", err);
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password) {
    setLoadingAuth(true);

    try {
      const response = await api.post('/login', {
        email: email,
        password: password
      })
      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token,
        email
      }
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email
      });

      setLoadingAuth(false);

    } catch (err) {
      console.log("Erro ao logar", err);
      setLoadingAuth(false);
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, loadingAuth, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
