import React, { useEffect } from "react";
import { Redirect, Slot, useRouter } from "expo-router";

import { View, Text, Image, Animated } from "react-native";

import { useQueryClient } from "@tanstack/react-query";

import { removeData, retrieveData } from "@/src/helpers";
import { useFetch, usePost } from "@/src/hooks/api";
import { AccountRegistry } from "@/src/types/AccountRegistry";

const AuthLayout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const userToken = retrieveData("userToken");

  const { isError, isLoading } = useFetch<AccountRegistry>(
    "/api/v1/accountregistry/user",
    ["user-data"]
  );

  const signOutHandler = async () => {
    queryClient.clear();
    queryClient.removeQueries();
    await removeData("userToken");
    router.push("/");
  };

  // useEffect(() => {
  //   if (isError) {
  //     signOutHandler();
  //   }
  // }, [isLoading, isError]);

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
