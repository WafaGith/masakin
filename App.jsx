import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import HomeScreen from "./src/components/HomeScreen";
import CookingTipsScreen from "./src/components/CookingTipsScreen";
import RecipeScreen from "./src/components/RecipeScreen";
import RecipeListScreen from "./src/components/RecipeListScreen";
import FormScreen from "./src/components/FormScreen"; // ✅ Tambahan screen form

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Beranda" }}
        />
        <Stack.Screen
          name="CookingTips"
          component={CookingTipsScreen}
          options={{ title: "Tips Memasak" }}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeScreen}
          options={{ title: "Resep Masakan" }}
        />
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={{ title: "Daftar Resep" }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: "Tambah Data" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
