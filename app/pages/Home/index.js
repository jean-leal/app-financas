import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

import { Background, ListBalance } from "./styles";
import Header from "../../components/Header";
import api from "../../services/api";
import BalanceItem from "../../components/BalanceItem";

export default function () {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState();

  const [dateMovements, seDateMovementes] = useState(new Date());

  useEffect(()=> {
    let isActive = true; 

    async function getMovements(){
      const dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const balance = await api.get('/balance', {
        params: {
          date: dateFormated
        }
      })

      if(isActive){
        setListBalance(balance.data);
      }
    };

    getMovements();

    return () => isActive = false;
  }, [isFocused])
  

  return (
    <Background>
      <Header title="Minhas movimentações" />
      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={ item => item.tag }
        renderItem={({item}) => ( <BalanceItem data={item}/>)}
      />
    </Background>
  )
}