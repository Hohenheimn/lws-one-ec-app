import React, { useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Image } from "react-native";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/src/components/Button";
import ErrorMessage from "@/src/components/ErrorMessage";
import Heading from "@/src/components/Heading";
import InputController from "@/src/components/InputController";
import { KeyboardShift } from "@/src/components/KeyboardShift";
import MessageModal from "@/src/components/MessageModal";
import Paragraph from "@/src/components/Paragraph";
import { storedData } from "@/src/helpers";
import { usePostNoToken } from "@/src/hooks/api";

const loginSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type formData = z.infer<typeof loginSchema>;

const CreateNewPasswordScreen = () => {
  const { email } = useLocalSearchParams();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSuccess = async (res: any) => {
    setError("");
    router.push("/sign-in");
  };

  const onError = (res: any) => {
    setError(res.response.data.message);
  };
  const { mutate: submit, isPending: loggingIn } = usePostNoToken(
    "/api/v1/user", // change this
    onSuccess,
    onError
  );

  const onSubmitHandler = async (data: formData) => {
    // submit(data);
    setModal(true); // put this on onSuccess function
  };

  const onClose = async () => {
    setModal(false);
    router.push("/sign-in");
  };
  return (
    <>
      <MessageModal
        visible={modal}
        title="Password Reset Successfully"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero dolorem voluptates, non veniam eum accusantium!"
        buttonName="Go to Sign In"
        onPress={onClose}
        onRequestClose={onClose}
      />

      <KeyboardShift classname=" flex-1 justify-center items-center gap-5 bg-white">
        <View className=" justify-center items-center">
          <Image
            source={require("../../../../../assets/images/reset-password.png")}
            className=" w-80 h-80"
          />
        </View>
        <View className=" pb-10 pt-5 px-5">
          <Heading size={"large"} classname="mb-2">
            Create New Password
          </Heading>

          <Paragraph classname="text-gray-600 mb-5">
            Your new password must be different from previously used passwords
          </Paragraph>

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

          {error && <ErrorMessage message={error} />}

          <Button
            title="Submit"
            appearance="primary"
            buttonClassname="mb-2"
            onPress={handleSubmit(onSubmitHandler)}
            loading={loggingIn}
          />
        </View>
      </KeyboardShift>
    </>
  );
};

export default CreateNewPasswordScreen;
