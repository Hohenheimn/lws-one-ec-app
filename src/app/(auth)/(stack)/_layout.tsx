import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShadowVisible: false, statusBarColor: "#86efac" }}
    >
      <Stack.Screen
        name="account-details"
        options={{
          headerTitle: "Account Details",
          headerStyle: {
            backgroundColor: "#86efac",
          },
        }}
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
      <Stack.Screen name="payment-screen" options={{ headerTitle: "" }} />
      <Stack.Screen
        name="(tab)"
        options={{ headerShown: false, headerTitle: "Back" }}
      />
    </Stack>
  );
};

export default StackLayout;
