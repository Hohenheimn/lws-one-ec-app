import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import Header from "@/src/components/Header";

const HomePage = () => {
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
        flexGrow: 1,
        backgroundColor: "white",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header />
      <View className="flex-1 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-3xl font-medium">Unpaid Due</Text>
        <Text>Homepage</Text>
      </View>
      <View className="flex-1 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-3xl font-medium">Last Transaction</Text>
        <Text>Homepage</Text>
      </View>
    </ScrollView>
  );
};

export default HomePage;
