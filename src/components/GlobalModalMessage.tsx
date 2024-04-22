import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";

import { Modal, Image, View, Text } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { closeModalMessage } from "../state/modalMessage/modalMessageSlice";
import { AppDispatch, RootState } from "../state/store";
import Button from "./Button";
import Heading from "./Heading";

const GlobalModalMessage = () => {
  const modalMessage = useSelector((state: RootState) => state.modalMessage);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onClose = () => {
    dispatch(closeModalMessage());
    if (modalMessage.redirectAfterClose) {
      router.push(`/${modalMessage.redirectAfterClose}`);
    }
  };

  return (
    <Modal
      visible={modalMessage.visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className=" flex-1 px-5 items-center w-full">
        {modalMessage.status === "failed" && (
          <Image
            source={require(`../../assets/images/message_failed.png`)}
            className=" w-96 h-96"
            resizeMode="contain"
          />
        )}
        {modalMessage.status === "succeeded" && (
          <Image
            source={require(`../../assets/images/message_success.png`)}
            className=" w-96 h-96"
            resizeMode="contain"
          />
        )}

        <Heading size={"large"} classname="text-center mb-5">
          {modalMessage.title}
        </Heading>
        {modalMessage.description && (
          <Text className=" text-center text-lg font-poppins text-gray-600">
            {modalMessage.description}
          </Text>
        )}

        <Button
          title={modalMessage.buttonName || "OK"}
          appearance={"primary"}
          onPress={onClose}
          className=" w-full"
        />
      </View>
    </Modal>
  );
};

export default GlobalModalMessage;
