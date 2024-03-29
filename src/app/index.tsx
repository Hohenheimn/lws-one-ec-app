import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const HomeScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold">HomeScreen</Text>
      <Text className="text-3xl font-bold font-poppins">TEST 1</Text>
      <Link href="/home">Home</Link>
    </View>
  );
};

export default HomeScreen;
