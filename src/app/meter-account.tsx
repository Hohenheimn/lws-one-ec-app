import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useMemo } from "react";
import { KeyboardShift } from "../components/KeyboardShift";
import SelectController from "../components/SelectController";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import InputController from "../components/InputController";
import { useRouter } from "expo-router";
import { useGetCoop } from "../hooks/useGetCoop";

const MeterAccountScreen = () => {
  const router = useRouter();
  const { data, isLoading } = useGetCoop();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      coop: "",
      name: "",
    },
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator color="black" />
      </View>
    );
  }

  const onSubmit = (data: any) => {
    // router.push(`/meter-details`);
    console.log(data, "data");
  };

  const coopData = data?.data.map((item) => {
    return {
      label: item.coopName,
      value: item.id,
    };
  });

  return (
    <View className="bg-white flex-1 p-4">
      <View className="py-4 justify-center items-center">
        <Image
          source={require("../../assets/images/search_vector.png")}
          style={{ objectFit: "cover" }}
          className="aspect-square w-80 h-80"
        />
      </View>
      <View className="flex-1">
        <Text className="text-2xl font-medium font-poppins-md">
          Meter Account
        </Text>
        <InputController
          type="default"
          placeholder="Seach..."
          label="Search Meter Number"
          errors={errors}
          name={"name"}
          control={control}
        />
        <SelectController
          name="coop"
          control={control}
          placeholder="Select coop"
          data={coopData || []}
        />
        <Button
          title="Search"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default MeterAccountScreen;
