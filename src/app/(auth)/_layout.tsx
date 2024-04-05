import React from "react";
import { Redirect, Stack } from "expo-router";
import { Tabs } from "expo-router";

import { Octicons } from "@expo/vector-icons";

import { retrieveData } from "@/src/helpers";

const AuthLayout = () => {
  const userToken = retrieveData("userToken");
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
