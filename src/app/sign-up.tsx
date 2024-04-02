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

const loginSchema = z
  .object({
    username: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Minimum 8 characters are required"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(10, "Minimum 10 characters are required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    email: z.string().min(1, "email is required").email("Invalid email"),
    contact: z.string().min(1, "Contact is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type formData = z.infer<typeof loginSchema>;

const SignUpScreen = () => {
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
    router.push("/verification");
  };

  return (
    <KeyboardShift classname=" flex-1 justify-center items-center gap-5 ">
      <View className=" pb-10 pt-5 px-5">
        <Heading size={"large"} classname=" mb-2 text-center">
          Register an Account
        </Heading>
        <Paragraph classname=" text-gray-400 mb-5 text-center">
          After you sign up, you&apos;ll receive an email to verify your email
          address
        </Paragraph>

        <InputController
          type="default"
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

        <InputController
          type="default"
          secured
          classname=" mb-5"
          placeholder="Re-enter your Password here"
          label="Re-Enter Password"
          errors={errors}
          name={"confirmPassword"}
          control={control}
        />

        <InputController
          type="email-address"
          classname=" mb-5"
          placeholder="Enter your Email here"
          label="Email"
          errors={errors}
          name={"email"}
          control={control}
        />

        <InputController
          type="number-pad"
          classname=" mb-5"
          placeholder="Enter your Contact here"
          label="Contact Number"
          errors={errors}
          name={"contact"}
          control={control}
        />

        <Button
          title="Sign Up"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={handleSubmit(onSubmitHandler)}
        />

        <Paragraph classname=" text-center">
          Already have an account?{" "}
          <Link href={"/sign-in"} className=" font-bold text-primary">
            Sign In Here
          </Link>
        </Paragraph>
      </View>
    </KeyboardShift>
  );
};

export default SignUpScreen;
