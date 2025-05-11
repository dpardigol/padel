import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/components/Profile";
import Chat from "./src/components/Chat";

// Initialize navigation stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        {/* Register Screen */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register", headerShown: true }}
        />
        
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home", headerShown: true }}
        />

        {/* Profile Screen */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile", headerShown: true }}
        />

        {/* Chat Screen */}
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ title: "Chat", headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}