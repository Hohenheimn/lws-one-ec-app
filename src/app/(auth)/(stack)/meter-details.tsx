import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Modal, Image } from "react-native";

import { useFetch, usePost } from "@/src/hooks/api";
import { MeterAccountDetails } from "@/src/types/MeterAccountDetails";

import Button from "../../../components/Button";
import Description from "../../../components/Description";
import ScreenError from "../../../components/ScreenError";
import ScreenLoader from "../../../components/ScreenLoader";

const MeterDetails = () => {
  const router = useRouter();
  const { coop, meterNumber } = useLocalSearchParams<any>();
  const { data, isLoading } = useFetch<MeterAccountDetails>(
    `/api/v1/meterAccount/${meterNumber}/${coop}`,
    ["meter-number"]
  );
  const { mutate, isPending, isError } = usePost(
    "/api/v1/accountregistry/user"
  );

  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!data) {
    return (
      <ScreenError
        message="No meter account found."
        description="Uh oh! We couldn't find your meter account number. Please check the number or contact support for help."
      />
    );
  }

  if (isError) {
    return <ScreenError message="Something went wrong." />;
  }

  const onSubmit = () => {
    mutate(
      { meterId: Number(data.data.id) },
      { onSuccess: () => setIsOpen(true) }
    );
  };

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
      <Button
        title="Link To My Account"
        appearance="primary"
        loading={isPending}
        onPress={onSubmit}
      />
      <Button
        title="Go Back"
        appearance="default"
        onPress={() => router.back()}
      />
      <Modal
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        animationType="slide"
      >
        <View className="flex-1">
          <View className="flex-1 items-center">
            <Image
              source={require("../../../../assets/images/message_success.png")}
              className="w-72"
              style={{ objectFit: "contain" }}
            />
          </View>
          <View className="flex-1 p-4 space-y-4">
            <Text className="text-2xl font-poppins-sb font-semibold text-center">
              Account Link Successfully!
            </Text>
            <Text className="text-center text-lg font-poppins text-gray-600">
              Congratulations! With your account successfully linked, you now
              have access to view your bills and monitor your power usage with
              ease.
            </Text>
            <Button
              title="Go back"
              appearance="primary"
              onPress={() => {
                setIsOpen(false);
                router.push("/home");
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MeterDetails;
