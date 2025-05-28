import React from 'react';
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { HomeScreen, Recipe, RecipeDetail, Profile, FormData } from '../screens';
import { colors, fontType } from '../theme';
import { Home2, MenuBoard, ProfileCircle,  } from 'iconsax-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.grey,
        tabBarInactiveTintColor: colors.grey,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fontType['bold'],
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          borderTopWidth: 0.3,
          borderTopColor: colors.grey,
          elevation: 5,
        },
        tabBarIcon: ({ color, focused }) => {
          const iconMap = {
            HomeScreen: <Home2 size={24} color={'black'} variant={focused ? "Bold" : "Outline"} />,
            Recipe: <MenuBoard size={24} color={'black'} variant={focused ? "Bold" : "Outline"} />,
            Profile: <ProfileCircle size={24} color={'black'} variant={focused ? "Bold" : "Outline"} />,
          };
          return iconMap[route.name];
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Recipe" component={Recipe} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="MainApp" component={BottomTabs} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Form" component={FormData} />
      {/* <Stack.Screen name="HomeScreen" component={BottomTabs} /> */}
      {/* <Stack.Screen name="HomeScreen" component={BottomTabs} /> */}
    </Stack.Navigator>
  );
};

export default Router;
