import React from "react";
import { View, Text } from "react-native";

import { useSession } from "@/context/AuthContext";

const DashboardScreen = () => {
  const { signOut } = useSession();
  return (
    <View className=" flex-1 justify-center items-center gap-5">
      <Text className=" text-2xl font-bold">This is the dashboard</Text>
      <Text
        onPress={() => {
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
};

export default DashboardScreen;
