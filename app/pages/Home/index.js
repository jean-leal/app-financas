import React, { useContext } from "react";
import { View } from "react-native";

import { AuthContext } from '../../contexts/auth';
import { Background } from "./styles";

import Header from "../../components/Header";

export default function () {
  const { user } = useContext(AuthContext);

  return (
    <Background>
      <Header title="Minhas movimentações" />
    </Background>
  )
}