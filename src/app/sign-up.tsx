import React from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";

const SignUpScreen = () => {
  return (
    <View className=" flex-1 justify-center items-center gap-5">
      <Text className=" text-2xl font-bold">Sign In Here</Text>
      <Link href={"/"}>Go to Front Page</Link>
    </View>
  );
};

export default SignUpScreen;
