import React from "react";
import { Redirect, Stack } from "expo-router";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Octicons } from "@expo/vector-icons";

import { useSession } from "@/context/AuthContext";
import { getData } from "@/src/helpers";

const AuthLayout = () => {
  const { session, isLoading } = useSession();

  const userToken = getData("userToken");

  console.log(userToken);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!userToken) {
    return <Redirect href="/" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#86EFAC",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          tabBarShowLabel: false,
          headerTitle: "History Of Transaction",
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#86EFAC",
          headerStyle: {
            backgroundColor: "#86EFAC",
          },
          tabBarIcon: ({ color, size }) => (
            <Octicons name="note" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#86EFAC",
          headerStyle: {
            backgroundColor: "#86EFAC",
          },
          tabBarIcon: ({ color, size }) => (
            <Octicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
