import React, { useEffect, useState } from "react";
import Reading from "./screens/Reading";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import { View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomeStack = createNativeStackNavigator();

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Reading" component={Reading} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Articles"
          component={HomeStackScreens}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
