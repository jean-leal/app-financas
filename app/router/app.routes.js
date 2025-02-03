import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer"; 

import Home from "../pages/Home";
import New from "../pages/New";
import Profile from "../pages/Profile";
import CustomDrawer from "../components/CustomDrawer";

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
  return(
    <AppDrawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props}/>}
      screenOptions={{
        headerShown: false,
        drawerItemStyle:{
          borderRadius: 10,
          marginBottom: 8, 
        },
        drawerStyle: {
          backgroundColor: '#fff',
          paddingTop: 12,
          borderEndStartRadius: 0,
          borderEndEndRadius: 0
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
       <AppDrawer.Screen
        name="Registrar"
        component={New}
      />
       <AppDrawer.Screen
        name="Perfil"
        component={Profile}
      />
    </AppDrawer.Navigator>
  )
}

export default AppRoutes;