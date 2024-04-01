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
    <View className={classname}>
      {label && <Text className=" text-black">{label}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <TextInput
                className=" border-b border-gray-400 py-3"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={secured}
                keyboardType={type}
                {...rest}
              />
            </>
          );
        }}
        name={name}
        defaultValue=""
      />
      {errors[name]?.message && (
        <Text className=" text-red-500 mt-1">{errors[name]?.message}</Text>
      )}
    </View>
  );
};

export default InputController;
