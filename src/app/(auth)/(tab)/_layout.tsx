import React from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: "poppins",
          },
          headerShown: false,
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#4ade80",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          tabBarLabel: "Transaction",
          tabBarLabelStyle: {
            fontFamily: "poppins",
          },
          headerTitle: "History Of Transaction",
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#4ade80",
          headerStyle: {
            backgroundColor: "#86EFAC",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="newsletter" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="bill-history"
        options={{
          tabBarLabel: "Bill History",
          tabBarLabelStyle: {
            fontFamily: "poppins",
          },
          headerTitle: "Bill History",
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#4ade80",
          headerStyle: {
            backgroundColor: "#86EFAC",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="newsletter" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          tabBarLabelStyle: {
            fontFamily: "poppins",
          },
          headerShown: false,
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#4ade80",
          headerStyle: {
            backgroundColor: "#86EFAC",
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
