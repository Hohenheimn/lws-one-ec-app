import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import InputController from "../components/InputController";

export type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const AccountDetailsScreen = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data, "DATA");
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="justify-center items-center flex-[0.3] bg-green-300 py-3">
        <View className="justify-center items-center rounded-full w-28 h-28 bg-green-400">
          <Octicons name="feed-person" size={72} color="white" />
        </View>
      </View>
      <View className="flex-1 p-4">
        <Text className="font-poppins">Personal Information</Text>

        <InputController
          type="default"
          placeholder="Enter your full name..."
          label="Full Name"
          errors={errors}
          name={"name"}
          control={control}
        />
        <InputController
          type="default"
          placeholder="Enter your email address..."
          label="Email Address"
          errors={errors}
          name={"email"}
          control={control}
        />
        <InputController
          type="default"
          placeholder="Enter your phone number..."
          label="Phone Number"
          errors={errors}
          name={"phoneNumber"}
          control={control}
        />
        <InputController
          type="default"
          placeholder="Enter your password..."
          label="Password"
          errors={errors}
          name={"password"}
          control={control}
          secureTextEntry
        />
        <TouchableOpacity
          className="bg-green-300 p-4 rounded-lg"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center font-semibold font-poppins-sb">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountDetailsScreen;
