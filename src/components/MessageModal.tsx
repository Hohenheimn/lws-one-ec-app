import React from "react";
import { Link } from "expo-router";

import { Modal, Image, View } from "react-native";

import Button from "./Button";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

type Props = {
  visible: boolean;
  title: string;
  description: string;
  buttonName: string;
  onPress: () => void;
  onRequestClose?: () => void;
};

const MessageModal = ({
  visible,
  title,
  description,
  buttonName,
  onPress,
  onRequestClose,
}: Props) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className=" flex-1 px-5 items-center w-full">
        <Image
          source={require("../../assets/images/modal.png")}
          className=" w-96 h-96"
          resizeMode="contain"
        />

        <Heading size={"large"} classname="text-center mb-5">
          {title}
        </Heading>
        {description && (
          <Paragraph classname=" text-center text-gray-400 mb-5">
            {description}
          </Paragraph>
        )}

        <Button
          title={buttonName}
          appearance={"primary"}
          onPress={onPress}
          className=" w-full"
        />
      </View>
    </Modal>
  );
};

export default MessageModal;
