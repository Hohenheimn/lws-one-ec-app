import React from "react";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import { ScrollView, SafeAreaView, Image } from "react-native";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/src/components/Button";
import Heading from "@/src/components/Heading";
import InputController from "@/src/components/InputController";
import { KeyboardShift } from "@/src/components/KeyboardShift";
import Paragraph from "@/src/components/Paragraph";
import { usePostNoToken } from "@/src/hooks/api";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
});

type formData = z.infer<typeof loginSchema>;

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const defaultValue = {
    email: "",
  };

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, defaultValues },
  } = useForm<formData>({
    defaultValues: defaultValue,
    resolver: zodResolver(loginSchema),
  });

  const onSuccess = async (res: any) => {
    reset();
  };

  const onError = (res: any) => {
    console.log(res);
  };

  const { mutate, isPending: mutateLoading } = usePostNoToken(
    "/api/v1/user/register",
    onSuccess,
    onError
  );

  const onSubmitHandler = async (data: formData) => {
    router.push({
      pathname: "/forgot-password/[email]/",
      params: data,
    });
    // mutate(data);
  };

  return (
    <>
      <KeyboardShift classname=" flex-1 justify-center items-center gap-5 bg-white">
        <SafeAreaView className=" flex-1 py-5">
          <ScrollView
            className=" pb-10 pt-5 px-5"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Image
              source={require("../../../assets/images/forgot-password.png")}
              className=" w-80 h-80 mb-5"
            />
            <Heading size={"large"} classname=" mb-2 text-center">
              Forgot Password
            </Heading>
            <Paragraph classname=" text-gray-400 mb-5 text-center">
              Please enter your email address to reset your password
            </Paragraph>

            <InputController
              type="email-address"
              classname=" mb-5"
              placeholder="Enter your Email Address here"
              label="Email Address"
              errors={errors}
              name={"email"}
              control={control}
            />

            <Button
              title="Submit"
              appearance="primary"
              buttonClassname="mb-2"
              onPress={handleSubmit(onSubmitHandler)}
              loading={mutateLoading}
            />
          </ScrollView>
        </SafeAreaView>
      </KeyboardShift>
    </>
  );
};

export default ForgotPasswordScreen;
