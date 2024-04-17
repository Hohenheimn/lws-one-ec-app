import ScreenError from "@/src/components/ScreenError";
import ScreenLoader from "@/src/components/ScreenLoader";
import { usePost } from "@/src/hooks/api";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Payment = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, mutate, isError, isPending } = usePost(
    "/api/v1/payment/request/?method=gcash"
  );

  if (isPending) {
    return <ScreenLoader />;
  }
  if (isError) {
    return (
      <ScreenError
        message="Payment failed"
        description="Something went wrong, please try again later."
      />
    );
  }

  console.log(data, "payment");

  return (
    <View className="flex-1 bg-white">
      <View className="flex-[0.6] justify-center items-center">
        <Text className="text-2xl font-poppins-sb font-semibold">Pay Now</Text>
        <Image
          source={require("../../../../assets/images/payment.png")}
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
              source={require("../../../../assets/images/gcash_logo.png")}
              className="w-28 h-6"
            />
            <Image
              source={require("../../../../assets/images/maya.png")}
              style={{ objectFit: "contain" }}
              className="w-[60px] h-6"
            />
          </View>
        </TouchableOpacity>
        {isOpen && (
          <>
            <TouchableOpacity
              className="border-b-[1px] border-gray-300 rounded-lg p-2 flex-row items-start justify-between"
              onPress={() => mutate({})}
            >
              <View className="flex-1">
                <Text className="font-poppins-sb font-semibold text-lg">
                  GCASH
                </Text>
                <Text className="text-gray-600">
                  Payment {"(min. ₱50)"} should be completed within 30 mins.
                  Accesible 24/7 and may entail 2% additional fee.
                </Text>
              </View>
              <Image
                source={require("../../../../assets/images/gcash_logo.png")}
                className="w-28 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="border-b-[1px] border-gray-300 rounded-lg p-2 flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="font-poppins-sb font-semibold text-lg">
                  Paymaya
                </Text>
                <Text className="text-gray-600">
                  Payment {"(min. ₱50)"} should be completed within 30 mins.
                  Accesible 24/7 and may entail 2% additional fee.
                </Text>
              </View>
              <Image
                source={require("../../../../assets/images/maya.png")}
                style={{ objectFit: "contain" }}
                className="w-[60px] h-6"
              />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity className="border border-gray-500 rounded-lg p-3">
          <View className="flex-row items-center justify-between ">
            <Text className="font-poppins-md font-medium flex-1">
              Card Payment
            </Text>
            <Image
              source={require("../../../../assets/images/visa_mastercard.png")}
              className="w-40 h-6"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;
