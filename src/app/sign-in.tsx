import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View, Image, TextInput, Text } from "react-native";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSession } from "@/context/AuthContext";

import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Heading from "../components/Heading";
import InputController from "../components/InputController";
import { KeyboardShift } from "../components/KeyboardShift";
import Paragraph from "../components/Paragraph";
import { getData, setData } from "../helpers";
import { usePostNoToken } from "../hooks/api";

const loginSchema = z.object({
  userEmail: z.string().min(1, "Username is required").email("Invalid Email"),
  userPassword: z.string().min(1, "Password is required"),
});

type formData = z.infer<typeof loginSchema>;

const SignInScreen = () => {
  const { signIn } = useSession();
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSuccess = async (res: any) => {
    setError("");
    const token = res.data.data.token;
    // setData("userToken", token);
    await AsyncStorage.setItem("userToken", "I like to save it.");
    router.push("/home");
  };

  const onError = (res: any) => {
    setError(res.response.data.message);
  };
  const { mutate: login, isPending: loggingIn } = usePostNoToken(
    "/api/v1/user",
    onSuccess,
    onError
  );

  const onSubmitHandler = async (data: formData) => {
    login(data);
  };
  return (
    <KeyboardShift classname=" flex-1 justify-center items-center gap-5 ">
      <View className=" justify-center items-center">
        <Image
          source={require("../../assets/images/logo.png")}
          className=" w-20"
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/sign-in.png")}
          className=" w-80 h-80"
        />
      </View>
      <View className=" pb-10 pt-5 px-5">
        <Heading size={"large"} classname=" mb-2">
          Sign In to your Account
        </Heading>
        <Paragraph classname=" text-gray-400 mb-5">
          To use this service, you need to acknowledge that you've read and
          agree to our Terms and Conditions.
        </Paragraph>

        <InputController
          type="email-address"
          classname=" mb-5"
          placeholder="Enter your Username here"
          label="Username"
          errors={errors}
          name={"userEmail"}
          control={control}
        />

        <InputController
          type="default"
          secured
          classname=" mb-5"
          placeholder="Enter your Password here"
          label="Password"
          errors={errors}
          name={"userPassword"}
          control={control}
        />
        {error && <ErrorMessage message={error} />}

        <Button
          title="Sign In"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={handleSubmit(onSubmitHandler)}
          loading={loggingIn}
        />

        <Paragraph classname=" text-center">
          Don't have an Account ?{" "}
          <Link href={"/sign-up"} className=" font-bold text-primary">
            Sign Up Here
          </Link>
        </Paragraph>
        <Link href={"/home"} className=" font-bold text-primary">
          go to home
        </Link>
      </View>
    </KeyboardShift>
  );
};

export default SignInScreen;
