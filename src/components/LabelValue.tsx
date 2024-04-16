import React from "react";
import { View } from "react-native";

import Heading from "./Heading";
import Paragraph from "./Paragraph";

type Props = {
  label: string;
  value: any;
};

const LabelValue = ({ label, value }: Props) => {
  return (
    <View className=" w-full justify-between flex-row items-center mb-5">
      <Paragraph>{label}</Paragraph>
      <Heading size={"medium"}>{value}</Heading>
    </View>
  );
};

export default LabelValue;
