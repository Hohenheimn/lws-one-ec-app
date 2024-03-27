import React from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View className=" flex-1 justify-center items-center gap-5">
      <Text className=" text-2xl font-bold">
        Welcome, This is the front page
      </Text>
      <Link href={"/sign-in"}>Go to Sign In</Link>
      <Link href={"/sign-up"}>Go to Sign Up</Link>
    </View>
  );
};

export default HomeScreen;
