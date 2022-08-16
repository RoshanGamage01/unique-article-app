import React from "react";
import Reading from "./screens/Reading";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createNativeStackNavigator();

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Reading" component={Reading} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen(){
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="profile" component={Profile}/>
      <ProfileStack.Screen name="Reading" component={Reading}/>
    </ProfileStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Articles"
          component={HomeStackScreens}
          options={{ headerShown: false, tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.focused ? "#0078d4" : "#8e8e93"}
              />
            );
          }, }}
        />
        <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false, tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-person-circle-outline"
            size={24}
            color={tabInfo.focused ? "#0078d4" : "#8e8e93"}
          />
        );
      }, }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
