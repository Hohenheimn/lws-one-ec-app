import React from "react";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

import { useSession } from "@/context/AuthContext";

const AuthLayout = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  return <Stack />;
};

export default AuthLayout;
