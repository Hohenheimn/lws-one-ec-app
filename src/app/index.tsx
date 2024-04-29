import React from "react";
import { Link, Redirect, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { View, ImageBackground, Image, Text } from "react-native";

import Button from "../components/Button";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import { retrieveData } from "../helpers";

const LandingScreen = () => {
  const router = useRouter();

  const userToken = retrieveData("userToken");
  if (userToken) {
    return <Redirect href="/home" />;
  }
  return (
    <View className=" flex-1 justify-center items-center gap-5 bg-white">
      <ImageBackground
        source={require("../../assets/images/welcome.png")}
        className=" flex-1 w-full rounded-b-full overflow-hidden"
        resizeMode="cover"
      />

      <View className=" pb-20 pt-5 space-y-5 px-5">
        <Heading size={"large"} classname=" mb-2 text-center font-poppins-b">
          Welcome to OneEC!
        </Heading>
        <Paragraph classname=" text-gray-400 mb-5 text-center">
          Pay your electric bills, monitor usage and manage your account - all
          in one place.
        </Paragraph>
        <Button
          title="Sign In"
          appearance="primary"
          buttonClassname=""
          onPress={() => {
            router.push("/sign-in");
          }}
        />
        <Paragraph classname=" text-center">
          No Account yet?{" "}
          <Link href={"/sign-up"} className=" font-bold text-primary">
            Sign Up Here
          </Link>
        </Paragraph>
      </View>
    </View>
  );
};

export default LandingScreen;
