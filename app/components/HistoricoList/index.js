import React from "react";
import {
  Container,
  TipoText,
  IconView,
  Tipo,
  ValorText
} from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function HistoricoList({ data }) {
  return (
    <Container>
      <Tipo>
        <IconView tipo={data.type}>
          <Ionicons 
            name={data.type === 'despesa' ? "arrow-down" : 'arrow-up' }
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
  )
}