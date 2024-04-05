import React, { useState } from "react";
import { Link, Redirect, router, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { ScrollView, SafeAreaView } from "react-native";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../components/Button";
import DatePickerController from "../components/DatePickerController";
import ErrorMessage from "../components/ErrorMessage";
import Heading from "../components/Heading";
import InputController from "../components/InputController";
import { KeyboardShift } from "../components/KeyboardShift";
import MessageModal from "../components/MessageModal";
import Paragraph from "../components/Paragraph";
import { removeData, retrieveData, storedData } from "../helpers";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      userFname: "",
      userLname: "",
      userPassword: "",
      confirmPassword: "",
      userEmail: "",
      userDob: new Date(),
      userContact: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSuccess = async (res: any) => {
    const sessionId = res?.data?.data?.sessionId;
    await storedData("otpSessionId", sessionId);
    await storedData("otpSessionEmail", email);
    router.push(`/${email}`);
  };

  const onError = (res: any) => {
    setError(res.response.data.message);
  };

  const { mutate: mutateSignUp, isPending: mutateLoading } = usePostNoToken(
    "/api/v1/user/register",
    onSuccess,
    onError
  );

  const onSubmitHandler = async (data: formData) => {
    setError("");
    setEmail(data.userEmail);
    mutateSignUp(data);
  };
  if (sessionEmail && sessionId) {
    return <Redirect href={`/${sessionEmail}`} />;
  }

  return (
    <KeyboardShift classname=" flex-1 justify-center items-center gap-5 ">
      <SafeAreaView className=" py-5">
        <ScrollView className=" pb-10 pt-5 px-5">
          <Heading size={"large"} classname=" mb-2 text-center">
            Register an Account
          </Heading>
          <Paragraph classname=" text-gray-400 mb-5 text-center">
            After you sign up, you&apos;ll receive an email to verify your email
            address
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
  );
};

export default SignUpScreen;
