import React from "react";
import { Link, useRouter } from "expo-router";
import { View, ImageBackground, Image, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";

const HomeScreen = () => {
  const router = useRouter();
  console.log("Running...");

  return (
    <View className=" flex-1 justify-center items-center gap-5 ">
      <ImageBackground
        source={require("../../assets/images/welcome.png")}
        className=" flex-1 w-full rounded-b-full overflow-hidden"
        resizeMode="cover"
      />

      <View className=" pb-20 pt-5 space-y-5 px-5">
        <Heading size={"large"} classname=" mb-2 text-center font-poppins-b">
          Welcome, To OneEC!
        </Heading>
        <Paragraph classname=" text-gray-400 mb-5 text-center">
          Pay bills, manage your account, and stay in control - all in one
          place.
        </Paragraph>
        <Button
          title="Sign In"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={() => {
            router.push("/sign-in");
          }}
        />

        <Button
          title="Stored Data"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={() => {}}
        />

        <Button
          title="Retrieve Data"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={() => {}}
        />
        <Paragraph classname=" text-center">
          Don't have an Account ?{" "}
          <Link href={"/sign-up"} className=" font-bold text-primary">
            Sign Up Here
          </Link>
        </Paragraph>
      </View>
    </View>
  );
};

export default HomeScreen;
