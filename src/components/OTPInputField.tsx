import React from "react";
import { StyleSheet } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";

type Props = {
  code: string;
  setCode: Function;
};

const OTPInputField = ({ code, setCode }: Props) => {
  return (
    <OTPInputView
      style={{ width: "90%", height: 100 }}
      pinCount={7}
      code={code}
      onCodeChanged={(code) => {
        setCode(code);
      }}
      autoFocusOnLoad
      codeInputFieldStyle={styles.underlineStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      //   onCodeFilled={(code) => {
      //     console.log(`Code is ${code}, you are good to go!`);
      //   }}
    />
  );
};

export default OTPInputField;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 50,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: "#74e291",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#000",
    fontWeight: "bold",
    fontSize: 24,
  },
  underlineStyleHighLighted: {
    borderColor: "#74e291",
  },
});
