import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Payment = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="flex-1 bg-white">
      <View className="flex-[0.6] justify-center items-center">
        <Text className="text-2xl font-poppins-sb font-semibold">Pay Now</Text>
        <Image
          source={require("../../assets/images/payment.png")}
          className="w-56 h-56"
        />
      </View>
      <View className="flex-1 space-y-3 px-4">
        <Text className="text-center text-lg font-poppins-sb font-semiboldr">
          Choose Your Payment Method
        </Text>
        <TouchableOpacity
          className="border border-gray-500 rounded-lg p-4"
          onPress={() => {
            setIsOpen(!isOpen);
          }}
        >
          <View className="flex-row items-end justify-between">
            <Text className="font-poppins-md font-medium flex-1">E-Wallet</Text>
            <Image
              source={require("../../assets/images/gcash_logo.png")}
              className="w-28 h-6"
            />
            <Image
              source={require("../../assets/images/maya.png")}
              style={{ objectFit: "contain" }}
              className="w-[60px] h-6"
            />
          </View>
        </TouchableOpacity>
        {isOpen && (
          <View className="space-y-1">
            <TouchableOpacity className="border border-gray-300 rounded-lg px-1 py-2">
              <Image
                source={require("../../assets/images/gcash_logo.png")}
                className="w-28 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-300 rounded-lg px-4 py-2">
              <Image
                source={require("../../assets/images/maya.png")}
                style={{ objectFit: "contain" }}
                className="w-[60px] h-6"
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity className="border border-gray-500 rounded-lg p-4">
          <View className="flex-row items-center justify-between ">
            <Text className="font-poppins-md font-medium flex-1">
              Debit Card
            </Text>
            <Image
              source={require("../../assets/images/visa_mastercard.png")}
              className="w-40 h-6"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;
