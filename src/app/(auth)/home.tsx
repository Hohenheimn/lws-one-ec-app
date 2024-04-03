import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { useSession } from "@/context/AuthContext";
import Header from "@/src/components/Header";

const HomePage = () => {
  const { signOut } = useSession();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for demonstration purposes
  };

  return (
    <ScrollView
      contentContainerStyle={{
        // flexGrow: 1,
        backgroundColor: "white",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <View className="h-56 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-2xl font-medium font-poppins-md">Unpaid Due</Text>
      </View>
      <View className="h-56 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-2xl font-medium font-poppins-md">
          Last Transaction
        </Text>
      </View>
      <View className="h-56 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-2xl font-medium font-poppins-md">Reminders</Text>
      </View>
    </ScrollView>
  );
};

export default HomePage;
