import React from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";

import { useSession } from "@/context/AuthContext";

const SignInScreen = () => {
  const { signIn } = useSession();

  return (
    <View className=" flex-1 justify-center items-center gap-5">
      <Text
        onPress={() => {
          signIn();
          router.replace("/dashboard");
        }}
      >
        Sign In
      </Text>
    </View>
  );
};

export default SignInScreen;
