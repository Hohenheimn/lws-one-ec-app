import React from "react";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View, Image, TextInput, Text } from "react-native";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useSession } from "@/context/AuthContext";

import Button from "../components/Button";
import Heading from "../components/Heading";
import InputController from "../components/InputController";
import { KeyboardShift } from "../components/KeyboardShift";
import Paragraph from "../components/Paragraph";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Username is required"),
});

type formData = z.infer<typeof loginSchema>;

const SignInScreen = () => {
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = (data: formData) => {
    console.log(data);
    // signIn();
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
          name={"username"}
          control={control}
        />

        <InputController
          type="default"
          secured
          classname=" mb-5"
          placeholder="Enter your Password here"
          label="Password"
          errors={errors}
          name={"password"}
          control={control}
        />

        <Button
          title="Sign In"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={handleSubmit(onSubmitHandler)}
        />

        <Paragraph classname=" text-center">
          Don't have an Account ?{" "}
          <Link href={"/sign-up"} className=" font-bold text-primary">
            Sign Up Here
          </Link>
        </Paragraph>
      </View>
    </KeyboardShift>
  );
};

export default SignInScreen;
