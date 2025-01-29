import React from "react";
import { View,Text, ActivityIndicator} from "react-native";

import AuthRoutes from "./auth.routes";

export default function Routes() {
  const loading = false;
  const signed = false;

  return (
    signed ? <View><Text> Ola mundo</Text></View> : <AuthRoutes />
  );
}