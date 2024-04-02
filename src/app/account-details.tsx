import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import TextFormController from "../components/form/TextFormController";

export type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const AccountDetailsScreen = () => {
  const form = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
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

        <TextFormController
          name="name"
          control={form.control}
          label="Full Name"
          required
        />
        <TextFormController
          name="email"
          control={form.control}
          label="Email Address"
          required
          pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
        <TextFormController
          name="phoneNumber"
          control={form.control}
          label="Phone Number"
          keyboardType="number-pad"
          required
          pattern={/^(09|\+639)\d{9}$/}
        />
        <TextFormController
          name="username"
          control={form.control}
          label="Username"
          required
        />
        <TextFormController
          name="password"
          control={form.control}
          label="Password"
          required
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-green-300 p-4 rounded-lg"
          onPress={form.handleSubmit(onSubmit)}
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
