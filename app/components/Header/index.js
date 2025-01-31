import React from "react";

import { Container, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { ButtonMenu } from "../Header/styles";

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu onPress={()=> navigation.openDrawer()}>
        <Ionicons name="menu" size={35} color={"#121212"} />
      </ButtonMenu>
      {title && (
        <Title>{title}</Title>
      )}
    </Container>
  )
}