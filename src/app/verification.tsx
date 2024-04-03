import React, { useState } from "react";
import { Link, router } from "expo-router";
import { View, Image } from "react-native";

import Button from "../components/Button";
import Heading from "../components/Heading";
import { KeyboardShift } from "../components/KeyboardShift";

import MessageModal from "../components/MessageModal";
import OTPInputField from "../components/OTPInputField";
import Paragraph from "../components/Paragraph";

const VerificationScreen = () => {
  const [modal, setModal] = useState(false);
  const [code, setCode] = useState("");
  const onSubmitHandler = () => {
    setModal(true);
    // router.push("/sign-in");
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
            We are automatically detecting a Email send to you email
          </Paragraph>

          <View className=" w-full items-center">
            <OTPInputField code={code} setCode={setCode} />
          </View>

          <Button
            title="Submit"
            appearance="primary"
            buttonClassname="mb-2 w-full"
            onPress={onSubmitHandler}
          />

          <Paragraph classname=" text-center">
            Did not receive the OTP ?{" "}
            <Link href={"/sign-up"} className=" font-bold text-primary">
              Resend OTP
            </Link>
          </Paragraph>
        </View>
      </KeyboardShift>
      <MessageModal
        onPress={() => {
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
