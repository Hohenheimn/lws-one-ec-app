import React from "react";
import { Controller } from "react-hook-form";
import { View, Text, TextInput, TextInputProps } from "react-native";

type Props = {
  classname?: string;
  label?: string;
  name: string;
  errors?: any;
  control: any;
  type: "default" | "number-pad" | "email-address";
  secured?: boolean;
} & TextInputProps;

const InputController = ({
  classname,
  label,
  name,
  control,
  errors,
  type,
  secured,
  ...rest
}: Props) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View className="my-2">
            {label && <Text className="text-black font-poppins">{label}</Text>}
            <TextInput
              className="border-b border-gray-400 font-poppins py-2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secured}
              keyboardType={type}
              {...rest}
            />
            {errors[name]?.message && (
              <Text className="font-poppins text-red-500 mt-1">
                {errors[name]?.message}
              </Text>
            )}
          </View>
        );
      }}
      name={name}
      defaultValue=""
    />
  );
};

export default InputController;
