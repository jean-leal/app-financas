import React, { useState }from "react";
import { Background, Input, SubmitButton, SubmitText } from './styles';

import { SafeAreaView, TouchableWithoutFeedback, Keyboard} from "react-native";

import Header from "../../components/Header";
import { keyframes } from "styled-components";

export default function New() {
  const [labelInput, setLabelInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [type, setType] = useState('receita');

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <Background>
        <Header title="Resgistrando" />
        <SafeAreaView style={{ marginTop: 12, alignItems: 'center' }}>
          <Input
            placeholder='Descrição desse registro'
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />

          <Input
            placeholder='Valor desejado'
            keyboardType='numeric'
            value={valueInput}
            onChangeText={(text) => setValueInput(text)}
          />

          <SubmitButton>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>

  )
}