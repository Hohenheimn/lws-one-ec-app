import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="account-details"
        options={{ headerTitle: "Account Details" }}
      />
      <Stack.Screen
        name="meter-account"
        options={{ headerTitle: "Meter Account" }}
      />
      <Stack.Screen
        name="meter-details"
        options={{ headerTitle: "Meter Details" }}
      />
      <Stack.Screen name="payment" options={{ headerTitle: "Payment" }} />
    </Stack>
  );
};

export default StackLayout;
