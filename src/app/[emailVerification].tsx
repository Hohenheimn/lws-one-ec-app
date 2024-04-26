import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Image, ActivityIndicator, Pressable, Text } from "react-native";

import { useDispatch } from "react-redux";

import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Heading from "../components/Heading";
import { KeyboardShift } from "../components/KeyboardShift";
import MessageModal from "../components/MessageModal";
import OTPInputField from "../components/OTPInputField";
import Paragraph from "../components/Paragraph";
import { removeData, retrieveData } from "../helpers";
import { usePostNoPayload, usePostNoToken } from "../hooks/api";
import { showModalMessage } from "../state/modalMessage/modalMessageSlice";
import { AppDispatch } from "../state/store";

const VerificationScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const [code, setCode] = useState("");

  const { emailVerification } = useLocalSearchParams();

  const [countDown, setCoundown] = useState(180);

  useEffect(() => {
    if (countDown > 0) {
      const countDownHandler = setInterval(() => {
        setCoundown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countDownHandler);
    }
  });

  const onSuccessVerify = () => {
    setModal(true);
  };

  const onErrorVerify = (res: any) => {
    const { message } = res.response.data;
    setError(message);
  };

  const sessionId = retrieveData("otpSessionId");

  const { mutate: verify, isPending: isVerifying } = usePostNoToken(
    `/api/v1/user/verify/${sessionId}`,
    onSuccessVerify,
    onErrorVerify
  );

  const { mutate: resendOTP, isPending: sendingOTP } = usePostNoPayload(
    `/api/v1/user/otp/reset/${sessionId}`,
    () => {
      setCoundown(180);
    },
    (res) => {
      const errorMessage = res.response?.data?.message;
      dispatch(
        showModalMessage({
          status: "failed",
          title: "Unabled to send OTP",
          visible: true,
          buttonName: "Close",
          description: errorMessage,
        })
      );
    }
  );

  const onSubmitHandler = async () => {
    verify({ otp: code });
  };

  const cancelHandler = async () => {
    router.push("/sign-in");
  };

  const onClose = async () => {
    setModal(false);
    await removeData("otpSessionId");
    await removeData("otpSessionEmail");
    router.push("/sign-in");
  };

  return (
    <KeyboardShift classname="flex-1 justify-center items-center">
      <MessageModal
        visible={modal}
        title="Verification Successful"
        description="You can now login to your account"
        buttonName="Go to Sign In"
        onPress={onClose}
        onRequestClose={onClose}
      />

      <View className="flex-[0.8] p-4 justify-center items-center">
        <Image
          source={require("../../assets/images/verification.png")}
          className=" w-64 h-64"
          style={{ objectFit: "contain" }}
        />
      </View>
      <View className="flex-1 px-4 space-y-2">
        <Heading size={"large"} classname=" mb-2 text-center">
          Enter Verification code
        </Heading>
        <Paragraph classname=" text-gray-400 text-center">
          We have sent the one-time password to {`(${emailVerification})`}
        </Paragraph>

        <View className="mb-2 w-full items-center">
          <OTPInputField setCode={setCode} />
        </View>

        <ErrorMessage message={error} />

        <Button
          title="Submit"
          appearance="primary"
          buttonClassname="my-2"
          onPress={onSubmitHandler}
          loading={isVerifying}
        />

        <Button
          title="Cancel"
          appearance="default"
          buttonClassname="my-2"
          onPress={cancelHandler}
          loading={isVerifying}
        />

        <View className="flex-row items-center justify-center">
          <Paragraph>Did not receive the OTP ? </Paragraph>
          <Button
            onPress={() => {
              resendOTP();
            }}
            loading={sendingOTP}
            appearance="link"
            title="Resend"
            disabled={countDown > 0}
          />
        </View>
        {countDown > 0 && (
          <Paragraph classname=" text-center">
            In {countDown} second/s
          </Paragraph>
        )}
      </View>
    </KeyboardShift>
  );
};

export default VerificationScreen;
