import { Text, ScrollView, RefreshControl, FlatList } from "react-native";
import React, { useState } from "react";
import TransactionCard from "@/src/components/TransactionCard";

const TransactionPage = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for demonstration purposes
  };

  const data = [
    {
      id: 1,
      title: "Unpaid Due",
      datetime: "Feb 23 2000 12:59PM",
      amount: 32133,
    },
    {
      id: 2,
      title: "Unpaid Due",
      datetime: "Feb 23 2000 12:59PM",
      amount: 3213,
    },
    {
      id: 3,
      title: "Unpaid Due",
      datetime: "Feb 23 2000 12:59PM",
      amount: 4000,
    },
    {
      id: 4,
      title: "Unpaid Due",
      datetime: "Feb 23 2000 12:59PM",
      amount: 4558,
    },
  ];

  return (
    <ScrollView className="p-4 space-y-2 bg-white">
      <Text className="text-lg font-medium font-poppins-md">
        Last Transaction
      </Text>
      <FlatList
        data={data}
        scrollEnabled={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{ gap: 20 }}
        ListEmptyComponent={() => <Text>No Posts</Text>}
        renderItem={({ item }) => {
          return (
            <TransactionCard
              title={item.title}
              datetime={item.datetime}
              amount={item.amount}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default TransactionPage;
