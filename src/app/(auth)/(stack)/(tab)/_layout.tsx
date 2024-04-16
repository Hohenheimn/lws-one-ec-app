import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            <MaterialCommunityIcons name="home" size={size} color={color} />
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
          headerTitleStyle: {
            fontFamily: "poppins-sb",
          },
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#4ade80",
          headerStyle: {
            backgroundColor: "#86EFAC",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ballot" size={size} color={color} />
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
          headerTitleStyle: {
            fontFamily: "poppins-sb",
          },
          headerTitle: "Bill History",
          tabBarInactiveTintColor: "#707070",
          tabBarActiveTintColor: "#4ade80",
          headerStyle: {
            backgroundColor: "#86EFAC",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
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
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
