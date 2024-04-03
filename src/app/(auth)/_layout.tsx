import React from "react";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { Tabs } from "expo-router";
import { Octicons } from "@expo/vector-icons";

import { useSession } from "@/context/AuthContext";

const AuthLayout = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!session) {
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
