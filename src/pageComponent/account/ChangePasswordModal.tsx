import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import Button from "@/src/components/Button";
import ErrorMessage from "@/src/components/ErrorMessage";
import Heading from "@/src/components/Heading";
import InputController from "@/src/components/InputController";
import MessageModal from "@/src/components/MessageModal";
import { usePost } from "@/src/hooks/api";


type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current Password is required"),
    new_password: z.string().min(1, "New Password is required"),
    confirm_password: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type formData = z.infer<typeof changePasswordSchema>;

const ChangePasswordModal = ({ visible, onRequestClose }: Props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const onSuccess = async (res: any) => {
    setSuccess(true);
  };

  const onError = (res: any) => {
    setError(res.response.data.message);
  };

  const { mutate: updatePassword, isPending: updatingPassword } = usePost(
    "/api/v1/user/password",
    onSuccess,
    onError
  );

  const onSubmit = (data: formData) => {
    setError("");
    updatePassword(data);
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <MessageModal
        visible={success}
        title={"Change Password Successfully"}
        description={"User's password has been successfully updated"}
        buttonName={"Done"}
        onPress={() => {
          setSuccess(false);
          onRequestClose();
        }}
      />
      <View className=" flex-1 p-10 w-full  ">
        <Heading size={"large"} classname="mb-5">
          Change Password
        </Heading>
        <InputController
          type="default"
          secured
          classname=" mb-5 "
          placeholder="Enter your Current Password here"
          label="Current Password"
          errors={errors}
          name={"current_password"}
          control={control}
        />
        <InputController
          type="default"
          secured
          classname=" mb-5"
          placeholder="Enter your New Password here"
          label="New Password"
          errors={errors}
          name={"new_password"}
          control={control}
        />
        <InputController
          type="default"
          secured
          classname=" mb-10"
          placeholder="Enter your Confirm Password here"
          label="Confirm Password"
          errors={errors}
          name={"confirm_password"}
          control={control}
        />
        <ErrorMessage message={error} />
        <Button
          title={"Update"}
          appearance={"primary"}
          onPress={handleSubmit(onSubmit)}
          loading={updatingPassword}
        />
        <Button
          title="Cancel"
          appearance="default"
          onPress={onRequestClose}
          buttonClassname="mt-5"
        />
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;
