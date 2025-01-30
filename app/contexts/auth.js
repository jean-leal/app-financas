import React, { createContext, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});
import api from "../services/api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@finToken');

      if (storageUser) {
        const response = await api.get('/me', {
          headers: {
            'Authorization': `Bearer ${storageUser}`
          }
        })
          .catch(() => {
            setUser(null);
          })
        api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;

        setUser(response.data);
        setLoading(false)
      }
      setLoading(false)

    }

    loadStorage();
  }, [])

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

      await AsyncStorage.setItem('@finToken', token);

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

  async function signOut() {
    await AsyncStorage.clear()
      .then(()=>{
        setUser(null)
      })
  }

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      signUp,
      loadingAuth,
      signIn,
      loading,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}
