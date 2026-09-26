import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";
import EditWord from "./screens/EditWord";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="auto" />
      <Stack.Navigator
        initialRouteName="AllWords"
        screenOptions={{
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="AllWords"
          component={AllWords}
          options={{ title: "All Words" }}
        />
        <Stack.Screen
          name="AddWord"
          component={AddWord}
          options={{ title: "Adding word" }}
        />
        <Stack.Screen
          name="EditWord"
          component={EditWord}
          options={({ route }) => ({
            title: route.params?.wordData?.word
              ? `Editing word "${route.params.wordData.word}"`
              : "Editing word",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}