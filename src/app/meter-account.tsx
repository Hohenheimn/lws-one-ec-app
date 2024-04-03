import { View, Text, Image } from "react-native";
import React from "react";

const MeterAccountScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-[0.5] border border-red-500">
        <Image source={require("../../assets/images/search_vector.png")} />
      </View>
      <View className="flex-1 border border-red-500">
        <Text>2</Text>
      </View>
    </View>
  );
};

export default MeterAccountScreen;
