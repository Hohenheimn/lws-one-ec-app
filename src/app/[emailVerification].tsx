import React, { useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { View, Image, ActivityIndicator, Pressable, Text } from "react-native";

import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

import Heading from "../components/Heading";
import { KeyboardShift } from "../components/KeyboardShift";
import MessageModal from "../components/MessageModal";
import OTPInputField from "../components/OTPInputField";
import Paragraph from "../components/Paragraph";
import { removeData, retrieveData } from "../helpers";
import { usePostNoToken } from "../hooks/api";

const VerificationScreen = () => {
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const [code, setCode] = useState("");

  const { emailVerification } = useLocalSearchParams();

  const onSuccessVerify = () => {
    setModal(true);
  };

  const onErrorVerify = (res: any) => {
    const { message, data, status } = res.response.data;
    setError(message);
  };

  const sessionId = retrieveData("otpSessionId");

  const { mutate: verify, isPending: isVerifying } = usePostNoToken(
    `/api/v1/user/verify/${sessionId}`,
    onSuccessVerify,
    onErrorVerify
  );

  const { mutate: resendOTP, isPending: sendingOTP } = usePostNoToken(
    `/api/v1/user/otp/reset/${sessionId}`,
    () => {
      console.log("success otp");
    },
    (res) => {
      console.log(res.response);
      console.log("error otp");
    }
  );

  const onSubmitHandler = async () => {
    verify({ otp: code });
  };

  return (
    <>
      <KeyboardShift classname=" flex-1 justify-center items-center gap-5 px-5 ">
        <View className=" justify-center items-center">
          <Image
            source={require("../../assets/images/verification.png")}
            className=" w-80 h-80"
          />
        </View>
        <View className=" pb-10 pt-5 px-5 w-full">
          <Heading size={"large"} classname=" mb-2 text-center">
            Enter Verification code
          </Heading>
          <Paragraph classname=" text-gray-400 text-center">
            We are automatically detecting a Email send to you email{" "}
            {`(${emailVerification})`}
          </Paragraph>

          <View className=" w-full items-center">
            <OTPInputField code={code} setCode={setCode} />
          </View>

          <ErrorMessage message={error} />

          <Button
            title="Submit"
            appearance="primary"
            buttonClassname="mb-2 w-full"
            onPress={onSubmitHandler}
            loading={isVerifying}
          />

          <Paragraph classname=" text-center">
            Did not receive the OTP ?{" "}
            <Pressable onPress={resendOTP}>
              {sendingOTP ? (
                <ActivityIndicator color={"#272829"} />
              ) : (
                <Text className=" text-primary font-bold">{"Resend OTP"}</Text>
              )}
            </Pressable>
          </Paragraph>
        </View>
      </KeyboardShift>
      <MessageModal
        onPress={async () => {
          await removeData("otpSessionId");
          router.push("/sign-in");
        }}
        buttonName="Confirm"
        visible={modal}
        setVisible={setModal}
        title={"Account Created Successfully"}
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          enim, velit molestiae deleniti odit ea!"
      />
    </>
  );
};

export default VerificationScreen;
