import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { 
  Container, 
  ButtonFilterText, 
  ModalContent, 
  ButtonFilter
 } from "./styles";

import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "./locakeCalendar";

//alterando a linguagem padrão do calendario. 
LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarModal({ setVisible, handleFilter }) {
  const [dateNow, setDateNow] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  
  //funcao para selecionar o dia do calendario e mudar as cores infromando a selecao
  function handleOnDayPress(date){
    setDateNow(date.dateString)
    let markedDay = {}

    markedDay[date.dateString] = {
      selected: true, 
      selectedColor: '#3b3dbf',
      textColor: '#fff'
    }
    setMarkedDates(markedDay)
  }
  // passando o dia selecionado para o filtro da pagina Home. 
  function handleFilterDate(){
    handleFilter(dateNow);
    setVisible();
  }
  return (
    <Container>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={{ flex: 1 }}></View>
      </TouchableWithoutFeedback>

      <ModalContent>
        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          enableSwipeMonths={true}
          theme={{
            todayTextColor: '#ff0000',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor:'#fff'
          }}
        />

       <ButtonFilter onPress={handleFilterDate}>
        <ButtonFilterText>Filtrar</ButtonFilterText>
       </ButtonFilter>
      </ModalContent>

      </Container>
  )
}