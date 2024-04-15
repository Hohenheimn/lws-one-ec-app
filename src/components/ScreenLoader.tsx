import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const ScreenLoader = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator color="black" />
    </View>
  );
};

export default ScreenLoader;
