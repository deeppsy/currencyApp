import "react-native-gesture-handler";

import { StyleSheet, View, StatusBar } from "react-native";

import React from "react";
import Constants from "expo-constants";
import MainApp from "./src/navigation";
import colors from "./src/utils/colors";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <UdaciStatusBar backgroundColor={colors.primary} />
      <MainApp />
    </View>
  );
}
