import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView className="bg-green-300 p-4 space-y-2 rounded-b-3xl">
      <View className="justify-between items-center flex-row">
        <Text className="text-3xl">Logo</Text>
        <TouchableOpacity className="flex justify-center items-center p-2 rounded-full w-10 h-10">
          <Octicons name="bell-fill" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="text-3xl font-semibold">Welcome, Kenneth 👋</Text>
      <View className="space-y-1">
        <Text className="font-medium">Your Outstanding Amount</Text>
        <Text className="font-semibold text-5xl">₱ 18,032</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>
          Due Date: <Text className="font-medium">Mar 18 2023</Text>
        </Text>
        <Text>
          Meter Account Number: <Text className="font-medium">1234ABCD</Text>
        </Text>
      </View>
      <TouchableOpacity className="bg-[#445069] p-4 rounded-full">
        <Text className="text-white text-center font-medium text-lg">
          Pay Now
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
