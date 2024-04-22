import React from "react";
import { Link, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";

import { AccountRegistry } from "../types/AccountRegistry";
import { dateString } from "../utils/dateHelper";
import { formatNumber } from "../utils/numberHelpers";
import Button from "./Button";

type Props = {
  name?: string;
  isConnected?: boolean;
  meterNumber?: string;
  outstandingAmount?: number;
  dueDate?: string;
};

const Header = ({
  name,
  isConnected,
  meterNumber,
  outstandingAmount,
  dueDate,
}: Props) => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-green-300 p-4 space-y-2 rounded-b-3xl">
      <View className="justify-between items-center flex-row">
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 80, height: 20, objectFit: "contain" }}
        />
        <TouchableOpacity className="flex justify-center items-center p-2 rounded-full w-10 h-10">
          <Octicons name="bell-fill" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="text-xl font-semibold font-poppins-sb text-zinc-80 mb-5">
        Welcome, {name} 👋
      </Text>
      <View className="space-y-2">
        <Text className="text-xs text-zinc-800 font-poppins">
          Your Outstanding Amount
        </Text>
        <Text className="font-semibold font-poppins-sb text-4xl text-zinc-800">
          {formatNumber(Number(outstandingAmount))}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="font-poppins text-xs">
          Due Date:{" "}
          <Text className="font-medium font-poppins-sb">
            {dateString(`${dueDate}`)}
          </Text>
        </Text>
        <Text className="font-poppins text-xs">
          Meter Account Number:{" "}
          <Text className="font-medium font-poppins-sb">{meterNumber}</Text>
        </Text>
      </View>

      {isConnected ? (
        <Button
          title="Pay Now"
          appearance="secondary"
          className="rounded-full"
          onPress={() => router.push("/payment")}
        />
      ) : (
        <Button
          title="Link to Meter Account"
          appearance="secondary"
          className="rounded-full"
          onPress={() => router.push("/meter-account")}
        />
      )}
    </SafeAreaView>
  );
};

export default Header;
