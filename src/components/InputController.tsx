import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { View, Text, TextInput, TextInputProps, Pressable } from "react-native";
import { twMerge } from "tailwind-merge";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
  const [showPass, setShowPass] = useState(false);
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View className={twMerge("my-2 w-full", classname)}>
            {label && (
              <Text
                className={twMerge("font-poppins", isFocused && "text-primary")}
              >
                {label}
              </Text>
            )}
            <View className=" flex-row items-center w-full border-b border-gray-400">
              <TextInput
                className={twMerge(
                  " font-poppins py-2 flex-1",
                  isFocused && "border-primary"
                )}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
                secureTextEntry={secured && !showPass}
                keyboardType={type}
                {...rest}
                onFocus={() => setIsFocused(true)}
              />
              {secured && (
                <Pressable
                  onPress={() => setShowPass(!showPass)}
                  className=" w-7 h-7 justify-center items-center"
                >
                  {showPass ? (
                    <View>
                      <Entypo name="eye-with-line" size={20} color="black" />
                    </View>
                  ) : (
                    <AntDesign name="eye" size={20} color="black" />
                  )}
                </Pressable>
              )}
            </View>

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
