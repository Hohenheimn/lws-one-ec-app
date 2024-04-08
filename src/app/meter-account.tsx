import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { KeyboardShift } from "../components/KeyboardShift";
import SelectController from "../components/SelectController";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import InputController from "../components/InputController";
import { useRouter } from "expo-router";

const MeterAccountScreen = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      coop: "",
    },
  });

  const onSubmit = (data: any) => {
    router.push(`/meter-details`);
  };
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
          data={[
            { label: "test", value: "test" },
            { label: "test 2", value: "test 2" },
          ]}
        />
        <Button
          title="Submit"
          appearance="primary"
          buttonClassname="mb-2"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default MeterAccountScreen;
