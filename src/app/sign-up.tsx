import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  SafeAreaView,
  View,
  Touchable,
  Pressable,
  Modal,
} from "react-native";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../components/Button";
import CheckboxController from "../components/CheckboxController";
import DatePickerController from "../components/DatePickerController";
import ErrorMessage from "../components/ErrorMessage";
import Heading from "../components/Heading";
import InputController from "../components/InputController";
import { KeyboardShift } from "../components/KeyboardShift";
import Paragraph from "../components/Paragraph";
import { retrieveData, storedData } from "../helpers";
import { usePostNoToken } from "../hooks/api";

const loginSchema = z
  .object({
    userFname: z.string().min(1, "First Name is required"),
    userLname: z.string().min(1, "Last Name is required"),
    userPassword: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    userEmail: z.string().min(1, "Email is Required").email("Invalid Email"),
    userDob: z.date(),
    userContact: z.string().min(1, "Contact is required"),
  })
  .refine((data) => data.userPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type formData = z.infer<typeof loginSchema>;

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const sessionId = retrieveData("otpSessionId");
  const sessionEmail = retrieveData("otpSessionEmail");

  const [termAndCondition, setTermAndCondition] = useState(false);
  const [validatetermAndCondition, setValidateTermAndCondition] =
    useState(false);

  const [showTerms, setShowTerm] = useState(false);

  const defaultValue = {
    userFname: "",
    userLname: "",
    userPassword: "",
    confirmPassword: "",
    userEmail: "",
    userDob: new Date(),
    userContact: "",
  };

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, defaultValues },
  } = useForm<formData>({
    defaultValues: defaultValue,
    resolver: zodResolver(loginSchema),
  });

  const onSuccess = async (res: any) => {
    const sessionId = res?.data?.data?.sessionId;
    await storedData("otpSessionId", sessionId);
    await storedData("otpSessionEmail", email);
    reset();
    router.push(`/${email}`);
  };

  const onError = (res: any) => {
    if (
      res.response.data.message ===
      "User already have an otp. Please verify account first"
    ) {
      reset();
      router.push(`/${email}`);
      return;
    }
    setError(res.response.data.message);
  };

  const { mutate: mutateSignUp, isPending: mutateLoading } = usePostNoToken(
    "/api/v1/user/register",
    onSuccess,
    onError
  );

  const onSubmitHandler = async (data: formData) => {
    if (!termAndCondition) {
      console.log("term");
      setValidateTermAndCondition(true);
      return;
    }
    setError("");
    setEmail(data.userEmail);
    setValidateTermAndCondition(false);
    mutateSignUp(data);
  };

  return (
    <>
      <Modal
        visible={showTerms}
        onRequestClose={() => {
          setShowTerm(false);
        }}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className=" flex-1 p-5 items-center w-full">
          <Heading size={"large"} classname="text-center mb-5">
            Terms and Conditions and Privacy Policy
          </Heading>
          <Paragraph classname=" mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            id neque fuga deleniti. Beatae fugit, tempora architecto voluptas
            vero inventore possimus amet nihil, et aliquid atque reiciendis
            ipsam quos blanditiis!
          </Paragraph>
          <Button
            title={"Close"}
            appearance={"primary"}
            onPress={() => setShowTerm(false)}
            className=" w-full"
          />
        </View>
      </Modal>
      <KeyboardShift classname=" flex-1 justify-center items-center gap-5 bg-white">
        <SafeAreaView className=" flex-1 py-5">
          <ScrollView
            className=" pb-10 pt-5 px-5"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Heading size={"large"} classname=" mb-2 text-center">
              Register an Account
            </Heading>
            <Paragraph classname=" text-gray-400 mb-5 text-center">
              After you sign up, you&apos;ll receive an email to verify your
              email address
            </Paragraph>

            <InputController
              type="default"
              classname=" mb-5"
              placeholder="Enter your Username here"
              label="First Name"
              errors={errors}
              name={"userFname"}
              control={control}
            />

            <InputController
              type="default"
              classname=" mb-5"
              placeholder="Enter your Username here"
              label="Last Name"
              errors={errors}
              name={"userLname"}
              control={control}
            />

            <InputController
              type="email-address"
              classname=" mb-5"
              placeholder="Enter your Email here"
              label="Email"
              errors={errors}
              name={"userEmail"}
              control={control}
            />

            <DatePickerController
              name={"userDob"}
              label="Date of Birth"
              control={control}
              errors={errors}
              placeholder="Set your Date of Birth"
            />

            <InputController
              type="number-pad"
              classname=" mb-5"
              placeholder="Enter your Contact here"
              label="Contact Number"
              maxLength={11}
              errors={errors}
              name={"userContact"}
              control={control}
            />
            <InputController
              type="default"
              secured
              classname=" mb-5"
              placeholder="Enter your Password here"
              label="Password"
              errors={errors}
              name={"userPassword"}
              control={control}
            />

            <InputController
              type="default"
              secured
              classname=" mb-5"
              placeholder="Re-enter your Password here"
              label="Re-Enter Password"
              errors={errors}
              name={"confirmPassword"}
              control={control}
            />

            <ErrorMessage message={error} />

            <View className=" mb-3 flex-row">
              <Checkbox
                className={` border mr-2 ${
                  validatetermAndCondition && "border-red-500"
                }`}
                value={termAndCondition}
                onValueChange={setTermAndCondition}
              />
              <View className=" flex-1">
                <Paragraph>
                  By checking this box, I confirm that I have read and agree to
                  the{" "}
                  <Paragraph
                    classname=" text-primary font-bold"
                    onPress={() => setShowTerm(true)}
                  >
                    Terms and Conditions and Privacy Policy
                  </Paragraph>
                  .
                </Paragraph>
                {validatetermAndCondition && (
                  <Paragraph classname=" text-red-500 mt-1">
                    Required!
                  </Paragraph>
                )}
              </View>
            </View>

            <Button
              title="Sign Up"
              appearance="primary"
              buttonClassname="mb-2"
              onPress={handleSubmit(onSubmitHandler)}
              loading={mutateLoading}
            />

            <Paragraph classname=" text-center">
              Already have an account?{" "}
              <Link href={"/sign-in"} className=" font-bold text-primary">
                Sign In Here
              </Link>
            </Paragraph>
          </ScrollView>
        </SafeAreaView>
      </KeyboardShift>
    </>
  );
};

export default SignUpScreen;
