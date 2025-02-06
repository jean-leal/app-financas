import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { RegisterConatainer, RegisterTypeButton, RegisterLabel } from "./styles";

export default function RegisterTypes({ type, sendTypeChanged }) {
  const [typeChecked, setTypeChecked] = useState(type);


  // marca o tipo, se e "receita" ou "despesa"
  function changeType(name) {
    sendTypeChanged(name)
    setTypeChecked(name)
  }

  return (
    <RegisterConatainer>
      <RegisterTypeButton
        checked={typeChecked === 'receita' ? true : false}
        onPress={() => changeType('receita')}>
        <Ionicons name="arrow-up" size={25} color={"#121212"} />
        <RegisterLabel>Receita</RegisterLabel>
      </RegisterTypeButton>

      <RegisterTypeButton
        checked={typeChecked === 'despesa' ? true : false}
        onPress={() => changeType('despesa')}
      >
        <Ionicons name="arrow-down" size={25} color={"#121212"} />
        <RegisterLabel>Despesa</RegisterLabel>
      </RegisterTypeButton>
    </RegisterConatainer>
  )
}