import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer"; 

import Home from "../pages/Home";

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
  return(
    <AppDrawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: '#fff',
          paddingTop: 12,
        },

        drawerActiveBackgroundColor: '#3d3dbf',
        drawerActiveTintColor: '#fff',

        drawerInactiveBackgroundColor: '#f0f2ff', 
        drawerInactiveTintColor: '#121212'

      }}
    >
      <AppDrawer.Screen
        name="Home"
        component={Home}
      />
    </AppDrawer.Navigator>
  )
}

export default AppRoutes;