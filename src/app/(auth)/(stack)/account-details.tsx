import React from "react";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";

import { z } from "zod";

import { Octicons } from "@expo/vector-icons";

import { zodResolver } from "@hookform/resolvers/zod";

import { KeyboardShift } from "@/src/components/KeyboardShift";

import Button from "../../../components/Button";
import DatePickerController from "../../../components/DatePickerController";
import ErrorMessage from "../../../components/ErrorMessage";
import InputController from "../../../components/InputController";
import MessageModal from "../../../components/MessageModal";
import { useFetch, usePost } from "../../../hooks/api";
import { userProfileSchema } from "../../../schema/userProfileSchema";
import { UserData } from "@/src/types/UserData";

type FormValues = z.infer<typeof userProfileSchema>;

const AccountDetailsScreen = () => {
  const router = useRouter();
  const [isError, setError] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const { data, isFetching, refetch } = useFetch<UserData>("/api/v1/user", [
    "user",
  ]);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      userFname: data?.data.userData.userFname || "",
      userMname: data?.data.userData.userMname || "",
      userLname: data?.data.userData.userLname || "",
      userEmail: data?.data.userData.userEmail || "",
      userContact: data?.data.userData.userContact || "",
      userDob: new Date(data?.data.userData.userDob || ""),
    },
    resolver: zodResolver(userProfileSchema),
  });

  const { mutate: updateProfile, isPending: updating } = usePost(
    "/api/v1/user/update"
  );

  const onSubmit = (data: FormValues) => {
    setError("");
    updateProfile(data, {
      onSuccess: () => setModal(true),
      onError: (res: any) => setError(res.response.data.message),
    });
  };

  const onClose = async () => {
    setModal(false);
  };

  return (
    <KeyboardShift classname={""}>
      <ScrollView
        className="flex-1 bg-white"
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        <MessageModal
          visible={modal}
          title="Profile Successfully Updated"
          description=""
          buttonName="Done"
          onPress={onClose}
          onRequestClose={onClose}
        />
        <View className="justify-center items-center flex-[0.3] bg-green-300 py-3">
          <View className="justify-center items-center rounded-full w-28 h-28 bg-green-400">
            <Octicons name="feed-person" size={72} color="white" />
          </View>
        </View>
        <View className="flex-1 p-4">
          <Text className="font-poppins">Personal Information</Text>

          <InputController
            type="default"
            placeholder="Enter your first name..."
            label="First Name"
            errors={errors}
            name={"userFname"}
            control={control}
          />
          <InputController
            type="default"
            placeholder="Enter your middle name..."
            label="Middle Name"
            errors={errors}
            name={"userMname"}
            control={control}
          />

          <InputController
            type="default"
            placeholder="Enter your last name..."
            label="Last Name"
            errors={errors}
            name={"userLname"}
            control={control}
          />

          <InputController
            type="number-pad"
            placeholder="Enter your contact..."
            label="Contact"
            errors={errors}
            name={"userContact"}
            control={control}
          />

          <InputController
            type="email-address"
            placeholder="Enter your email..."
            label="Email"
            errors={errors}
            name={"userEmail"}
            control={control}
          />

          <DatePickerController
            name={"userDob"}
            label="Date of Birth"
            control={control}
            errors={errors}
            placeholder="Set your Date of Birth"
          />

          <ErrorMessage message={isError} />

          <Button
            title="Submit"
            appearance="primary"
            buttonClassname="mb-2"
            onPress={handleSubmit(onSubmit)}
            loading={updating}
          />
          <Button
            title="Cancel"
            appearance="default"
            onPress={() => {
              router.push("/(auth)/(stack)/(tab)/account");
            }}
          />
        </View>
      </ScrollView>
    </KeyboardShift>
  );
};

export default AccountDetailsScreen;
