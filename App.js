import React from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './app/router';

export default function App() {
    return (   
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f4ff" />
        <Routes />   
      </NavigationContainer>
    )
  }
