import React from "react";
import {
  Container,
  TipoText,
  IconView,
  Tipo,
  ValorText
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

import { TouchableWithoutFeedback, Alert } from 'react-native';

export default function HistoricoList({ data, deleteItem }) {

  function handleDeleteItem() {
    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja deletar esse registro?',
      [{
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Continuar',
        onPress: ()=> deleteItem(data.id)
      }
      ]
    )
  }

  return (
    <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
      <Container>
        <Tipo>
          <IconView tipo={data.type}>
            <Ionicons
              name={data.type === 'despesa' ? "arrow-down" : 'arrow-up'}
              size={20}
              color={"#fff"}
            />
            <TipoText>{data.type}</TipoText>
          </IconView>
        </Tipo>

        <ValorText>
          R$ {data.value}
        </ValorText>
      </Container >
    </TouchableWithoutFeedback>
  )
}