import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";


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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View className={twMerge("my-2", classname)}>
            {label && (
              <Text
                className={twMerge("font-poppins", isFocused && "text-primary")}
              >
                {label}
              </Text>
            )}
            <TextInput
              className={twMerge(
                "border-b border-gray-400 font-poppins py-2",
                isFocused && "border-primary"
              )}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secured}
              keyboardType={type}
              {...rest}
              onFocus={() => setIsFocused(true)}
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
