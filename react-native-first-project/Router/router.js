import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SimpleLineIcons,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

import { View, StyleSheet } from "react-native";

import RegistrationScreen from "../Screens/AuthScreen/RegistrationScreen";
import LoginScreen from "../Screens/AuthScreen/LoginScreen";
import PostsScreen from "../Screens/MainScreen/PostsScreen";
import CreatePostsScreen from "../Screens/MainScreen/CreatePostsScreen";
import CommentsScreen from "../Screens/NestedScreen/CommentsScreen";
import ProfileScreen from "../Screens/MainScreen/ProfileScreen";
import MapScreen from "../Screens/NestedScreen/MapScreen";
import Home from "../Screens/MainScreen/Home";
import DashboardScreen from "../Screens/DashboardScreen/DashboardScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();

const MainHome = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name="grid"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              {!focused ? (
                <View style={styles.containerForIonicons}>
                  <Ionicons name="ios-add" size={24} color="#ffffff" />
                </View>
              ) : (
                <View style={styles.containerForMaterialCommunityIcons}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={24}
                    color="#BDBDBD"
                  />
                </View>
              )}
            </View>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const DashboardMain = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={DashboardScreen}
      />
    </DashboardStack.Navigator>
  );
};

const AuthHome = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      />
      {/* <AuthStack.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={DashboardScreen}
      /> */}
    </AuthStack.Navigator>
  );
};
const useRoute = (isAuth, emailVerified) => {
  // const [emailVerified, setEmailVerified] = useState("false");
  console.log("isAuth", isAuth);
  console.log("emailVerified", emailVerified);
  if (!isAuth) {
    return <AuthHome />;
  }
  // else if (!emailVerified) {
  //   return <DashboardMain />;
  // }
  else if (!emailVerified) {
    return <MainHome />;
  }
};

const styles = StyleSheet.create({
  containerForIonicons: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForMaterialCommunityIcons: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useRoute;
