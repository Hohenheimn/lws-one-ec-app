import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import Header from "@/src/components/Header";
import { useGetUserData } from "@/src/hooks/useGetUserData";
import { LinearGradient } from "expo-linear-gradient";

const HomePage = () => {
  const { data, isFetching, refetch } = useGetUserData();

  const mockdata: barDataItem[] = [
    {
      value: 321,
      label: "2022",
    },
    {
      value: 433,
      label: "2023",
    },
    {
      value: 300,
      label: "2022",
    },
    {
      value: 123,
      label: "2023",
    },
    {
      value: 222,
      label: "2022",
    },
    {
      value: 600,
      label: "2023",
    },
    {
      value: 321,
      label: "2022",
    },
    {
      value: 800,
      label: "2023",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
    >
      <Header name={data?.data?.userData?.userFname} />
      <View className="flex-1 overflow-hidden mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-2xl font-medium font-poppins-md mb-4">
          Power Usage
        </Text>
        <BarChart
          height={200}
          data={mockdata}
          frontColor={"#4ade80"}
          showYAxisIndices={false}
          //removes lines in number
          xAxisThickness={0}
          yAxisThickness={0}
          // showGradient
          //removes ant lines
          hideRules
          // gradientColor={"#bbf7d0"}
          barBorderRadius={4}
          barWidth={40}
        />
      </View>
      <View className="max-h-64 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-2xl font-medium font-poppins-md">Unpaid Due</Text>
      </View>
      <View className="max-h-64 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-2xl font-medium font-poppins-md">
          Last Transaction
        </Text>
      </View>
      <View className="max-h-64 mx-4 my-2 p-3 border border-gray-300 rounded-lg">
        <Text className="text-2xl font-medium font-poppins-md">Reminders</Text>
      </View>
    </ScrollView>
  );
};

export default HomePage;
