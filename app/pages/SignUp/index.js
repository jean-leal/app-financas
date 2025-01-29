import React from "react";
import { Platform } from "react-native";

import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles';

export default function SignUn() {
  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        style={{ justifyContent: 'flex-top', marginTop: 30 }}
      >
        <AreaInput>
          <Input
            placeholder="Nome"
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Email"
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Senha"
          />
        </AreaInput>

        <SubmitButton>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}