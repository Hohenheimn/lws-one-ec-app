import { View, Text } from "react-native";
import React from "react";
import Description from "../components/Description";
import Button from "../components/Button";

const MeterDetails = () => {
  return (
    <View className="flex-1 space-y-2 bg-white p-4">
      <Text className="text-2xl font-poppins-sb mb-2">Meter Details</Text>
      <Description title="Meter Number" description="1234ABCD" />
      <Description title="Meter Account Name" description="Kenneth Pole" />
      <Description title="Meter Address" description="test" />
      <Description title="Meter Status" description="test" />
      <Description title="Coop Name" description="test" />
      <Description title="Coop Address" description="test" />
      <Button title="Link To My Account" appearance="primary" />
      <Button title="Go Back" appearance="default" />
    </View>
  );
};

export default MeterDetails;
