import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import MainMenu from "./screens/MainMenu";
import DietMenu from "./screens/DietMenu";
import SmokingMenu from "./screens/SmokingMenu";
import InformationMenu from "./screens/InformationMenu";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Ekran logowania" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Ekran rejestracji" }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ title: "Menu główne" }}
        />
        <Stack.Screen
          name="DietMenu"
          component={DietMenu}
          options={{ title: "Dieta" }}
        />
        <Stack.Screen
          name="SmokingMenu"
          component={SmokingMenu}
          options={{ title: "Palenie" }}
        />
        <Stack.Screen
          name="InformationMenu"
          component={InformationMenu}
          options={{ title: "Informacje" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
