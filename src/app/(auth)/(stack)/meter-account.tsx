import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View, Text, Image } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/Button";
import InputController from "../../../components/InputController";
import ScreenLoader from "../../../components/ScreenLoader";
import SelectController from "../../../components/SelectController";
import { MeterAccountSchema } from "../../../schema/MeterAccountSchema";
import { useFetch } from "@/src/hooks/api";
import { CoopData } from "@/src/types/CoopData";

type FormValues = z.infer<typeof MeterAccountSchema>;

const MeterAccountScreen = () => {
  const router = useRouter();
  const { data, isLoading } = useFetch<CoopData>("/api/v1/coop", ["coop"]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      coop: 0,
      meterNumber: "",
    },
    resolver: zodResolver(MeterAccountSchema),
  });

  if (isLoading) {
    return <ScreenLoader />;
  }

  const onSubmit = (data: any) => {
    router.push({
      pathname: "/meter-details",
      params: data,
    });
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
          source={require("../../../../assets/images/search_vector.png")}
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
          placeholder="eg. 123456789"
          label="Search Meter Number"
          errors={errors}
          name="meterNumber"
          control={control}
        />
        <SelectController
          name="coop"
          control={control}
          placeholder="Select coop"
          data={coopData || []}
          errors={errors}
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
