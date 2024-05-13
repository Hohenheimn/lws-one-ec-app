import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

import PaymentCard from "@/src/components/PaymentCard";
import ScreenError from "@/src/components/ScreenError";
import ScreenLoader from "@/src/components/ScreenLoader";
import { retrieveData } from "@/src/helpers";
import { usePost } from "@/src/hooks/api";

const Payment = () => {
  const router = useRouter();
  const [openEWallet, setOpenEWallet] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState("");

  const {
    mutate: gcash,
    isError: gcashError,
    isPending,
  } = usePost(`/api/v1/payment/request?method=gcash`);

  const {
    mutate: paymaya,
    isError: mayaError,
    isPending: mayaIsPending,
  } = usePost(`/api/v1/payment/request?method=paymaya`);

  if (isPending || mayaIsPending) {
    return <ScreenLoader />;
  }
  if (gcashError || mayaError) {
    return (
      <ScreenError
        message="Payment failed"
        description="Something went wrong, please try again later."
      />
    );
  }

  const handleGcashPayment = () => {
    gcash(
      {},
      {
        onSuccess: async (data) => {
          router.push({
            pathname: "/payment-screen",
            params: { url: data.data.data.url },
          });
        },
      }
    );
  };

  const handleMayaPayment = () => {
    paymaya(
      {},
      {
        onSuccess: async (data) => {
          router.push({
            pathname: "/payment-screen",
            params: { url: data.data.data.url },
          });
        },
      }
    );
  };

  const handleUnionBankPayment = () => {
    paymaya(
      {},
      {
        onSuccess: async (data) => {
          router.push({
            pathname: "/payment-screen",
            params: { url: data.data.data.url },
          });
        },
      }
    );
  };

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
            setOpenEWallet(!openEWallet);
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
        {openEWallet && (
          <>
            <PaymentCard
              paymentHandler={handleGcashPayment}
              logoUrl={require("../../../../assets/images/gcash-logo.png")}
              name={"GCASH"}
              description={
                "Payment (min. ₱50) should be completed within 30 mins.Accesible 24/7 and may entail 2% additional fee."
              }
            />

            <PaymentCard
              paymentHandler={handleMayaPayment}
              logoUrl={require("../../../../assets/images/maya.png")}
              name={"Paymaya"}
              description={
                "Payment (min. ₱50) should be completed within 30 mins.Accesible 24/7 and may entail 2% additional fee."
              }
            />
          </>
        )}
        <TouchableOpacity
          className="border border-gray-500 rounded-lg p-3"
          onPress={() => {
            setOpenCard(!openCard);
          }}
        >
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
        {openCard && (
          <PaymentCard
            paymentHandler={handleUnionBankPayment}
            logoUrl={require("../../../../assets/images/unionbank-logo.png")}
            name={"Union Bank"}
            description={
              "Payment (min. ₱50) should be completed within 30 mins.Accesible 24/7 and may entail 2% additional fee."
            }
          />
        )}
      </View>
    </View>
  );
};

export default Payment;
