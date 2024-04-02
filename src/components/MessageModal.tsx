import React from "react";
import { Modal, Image, View } from "react-native";

import Button from "./Button";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

type Props = {
  visible: boolean;
  setVisible: Function;
  title: string;
  description: string;
  buttonName: string;
  onPress: () => void;
};

const MessageModal = ({
  visible,
  setVisible,
  title,
  description,
  buttonName,
  onPress,
}: Props) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
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
        <Paragraph classname=" text-center text-gray-400 mb-5">
          {description}
        </Paragraph>
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
