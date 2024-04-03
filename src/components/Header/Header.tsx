import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView className="bg-green-300 p-4 space-y-2 rounded-b-3xl">
      <View className="justify-between items-center flex-row">
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 80, height: 20, objectFit: "contain" }}
        />
        <TouchableOpacity className="flex justify-center items-center p-2 rounded-full w-10 h-10">
          <Octicons name="bell-fill" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="text-xl font-semibold font-poppins-sb text-zinc-800">
        Welcome, Kenneth 👋
      </Text>
      <View className="space-y-2">
        <Text className="text-xs text-zinc-800 font-poppins">
          Your Outstanding Amount
        </Text>
        <Text className="font-semibold font-poppins-sb text-4xl text-zinc-800">
          ₱ 18,032
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="font-poppins text-xs">
          Due Date:{" "}
          <Text className="font-medium font-poppins-sb">Mar 18 2023</Text>
        </Text>
        <Text className="font-poppins text-xs">
          Meter Account Number:{" "}
          <Text className="font-medium font-poppins-sb">1234ABCD</Text>
        </Text>
      </View>
      <TouchableOpacity className="bg-[#445069] p-4 rounded-full">
        <Text className="text-white font-poppins-md text-center font-medium text-lg">
          Pay Now
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
