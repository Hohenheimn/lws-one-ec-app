import React from "react";
import { Redirect, Slot } from "expo-router";

import { View, Text, Image, Animated } from "react-native";

import { removeData, retrieveData } from "@/src/helpers";
import { useFetch, usePost } from "@/src/hooks/api";

const AuthLayout = () => {
  const userToken = retrieveData("userToken");
  // if (isLoading) {
  //   return (
  //     <>
  //       <View className=" flex-1 justify-center items-center bg-primary">
  //         <Image
  //           source={require("../../../assets/images/icon.png")}
  //           className=" h-64 w-64 object-contain"
  //         />
  //         <Animated.Text className=" text-white font-bold text-2xl animate-pulse">
  //           Loading . . .
  //         </Animated.Text>
  //       </View>
  //     </>
  //   );
  // }
  if (!userToken) {
    return <Redirect href="/" />;
  }
  return <Slot />;
};

export default AuthLayout;
