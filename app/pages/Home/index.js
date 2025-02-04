import React, { useEffect, useState } from "react";
import { TouchableOpacity, Modal } from "react-native";

import { format } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

import { Background, ListBalance, Area, Title, List } from "./styles";
import Header from "../../components/Header";
import api from "../../services/api";
import BalanceItem from "../../components/BalanceItem";
import HistoricoList from "../../components/HistoricoList";
import CalendarModal from "../../components/CalendarModal";

import { Ionicons } from "@expo/vector-icons";

export default function () {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);
  const [moviments, setMoviments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)

  const [dateMovements, setDateMovementes] = useState(new Date());

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      const dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const receives = await api.get('/receives', {
        params: {
          date: dateFormated
        }
      })

      const balance = await api.get('/balance', {
        params: {
          date: dateFormated
        }
      })

      if (isActive) {
        setListBalance(balance.data);
        setMoviments(receives.data);
      }
    };

    getMovements();

    return () => isActive = false;
  }, [isFocused, dateMovements])

  async function handleDelete(id) {
    try{
      await api.delete('/receives/delete', {
        params:{
          item_id: id
        }
      })
      setDateMovementes(new Date())
    } catch (err){
      console.error(err)
    }
    
  }

  return (
    <Background>
      <Header title="Minhas movimentações" />
      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.tag}
        renderItem={({ item }) => (<BalanceItem data={item} />)}
      />
      <Area>
        <TouchableOpacity onPress={()=> setModalVisible(true)}>
          <Ionicons name="calendar-outline" size={30} color="#121212" />
        </TouchableOpacity>
        <Title> Ultimas movimentações</Title>
      </Area>
      <List
        data={moviments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />
      <Modal 
        visible={modalVisible}
        animationType="fade"
        transparent={true}      
      >
        <CalendarModal
          setVisible={()=> setModalVisible(false)}
        />
      </Modal>
    </Background>
  )
}