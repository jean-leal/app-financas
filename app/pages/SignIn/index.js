import React, { useState, useContext } from "react";
import { Platform, ActivityIndicator } from "react-native";

import { AuthContext } from "../../contexts/auth";

import {
  Background,
  Container,
  Logo,
  Input,
  AreaInput,
  Link,
  LinkText,
  SubmitButton,
  SubmitText
} from "./styles";

import { useNavigation } from "@react-navigation/native";


export default function SignIn() {
  const navigation = useNavigation();
  const { loadingAuth, signIn } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleLogin() {
    signIn(email, password)
  }

  return (

    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : ""}
        enabled
      >
        <Logo
          source={require("../../assets/Logo.png")}
        />
        <AreaInput>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color={"#fff"} />
          ) : <SubmitText>Acessar</SubmitText>}


        </SubmitButton>
        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}