import React from "react";
import { OtpInput } from "react-native-otp-entry";

type Props = {
  setCode: Function;
};

const OTPInputField = ({ setCode }: Props) => {
  return <OtpInput numberOfDigits={7} onTextChange={(code) => setCode(code)} />;
};

export default OTPInputField;
