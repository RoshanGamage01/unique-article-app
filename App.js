import React from "react";
import Reading from "./screens/Reading";
import Home from "./screens/Home";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Unique Article Home' }}/>
        <Stack.Screen name="Reading" component={Reading}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
