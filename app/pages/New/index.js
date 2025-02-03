import React, { useState }from "react";
import { Background, Input, SubmitButton, SubmitText } from './styles';

import { SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';

import Header from "../../components/Header";
import RegisterTypes from "../../components/RegisterTypes";

import api from "../../services/api";

import { format } from "date-fns";

export default function New() {
  const navigation = useNavigation();
  
  const [labelInput, setLabelInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [type, setType] = useState('receita');

  function handleSubmit(){
    Keyboard.dismiss();
    if (isNaN(parseFloat(valueInput)) || type === null) {
      alert("Preencha todos os campos");
      return;
    }

    Alert.alert(
      'Confirmando dados', 
      `Tipo: ${type} - Valor: ${parseFloat(valueInput)}`, 
      [
        {
          text:  'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar', 
          style: 'default',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  async function handleAdd (){
    Keyboard.dismiss();

    await api.post('/receive', {
      description: labelInput,
      value: Number(valueInput),
      type: type,
      date: format(new Date(), 'dd/MM/yyy')
    }).catch(
     ()=> alert("Erro ao efetuar o cadastro.") 
    )

    setLabelInput('');
    setValueInput('');
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <Background>
        <Header title="Resgistrando" />
        <SafeAreaView style={{ marginTop: 12, alignItems: 'center'}}>
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

          <RegisterTypes type={type} sendTypeChanged={(item)=> setType(item)}/>

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>

  )
}