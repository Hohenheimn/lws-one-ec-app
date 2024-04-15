import { View, Text } from "react-native";
import React from "react";
import Description from "../components/Description";
import Button from "../components/Button";
import { useGetMeterAccount } from "../hooks/useGetMeterAccount";
import { useLocalSearchParams, useRouter } from "expo-router";
import ScreenLoader from "../components/ScreenLoader";
import ScreenError from "../components/ScreenError";

const MeterDetails = () => {
  const router = useRouter();
  const { coop, meterNumber } = useLocalSearchParams<any>();
  const { data, isLoading } = useGetMeterAccount(meterNumber, coop);

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!data) {
    return <ScreenError message="No meter account found." />;
  }

  const meterAddress = data?.data.meterAddress.map((item) => {
    return {
      label: `${item.meterTown} ${item.meterBrgy} ${item.meterSt}`,
    };
  });
  const coopAddress = data?.data.coop.address.map((item) => {
    return {
      label: `${item.coopTown} ${item.coopBrgy} ${item.coopSt}`,
    };
  });

  return (
    <View className="flex-1 space-y-4 bg-white p-4">
      <Text className="text-2xl font-poppins-sb mb-2">Meter Details</Text>

      <Description title="Meter Number" description={data?.data.meterNumber} />
      <Description
        title="Meter Account Name"
        description={data?.data.meterAccountName}
      />
      <Description title="Meter Address" description={meterAddress} />

      <Description title="Coop Name" description={data?.data.coop.coopName} />
      <Description title="Coop Address" description={coopAddress} />

      <Button title="Link To My Account" appearance="primary" />
      <Button
        title="Go Back"
        appearance="default"
        onPress={() => router.back()}
      />
    </View>
  );
};

export default MeterDetails;
