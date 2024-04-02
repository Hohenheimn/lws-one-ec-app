import { View, Text, TextInput } from "react-native";
import React from "react";
import { Controller, Control } from "react-hook-form";

type ControlledInputProps = {
  control: Control<any, any>;
  name: string;
  label?: string;
  required?: boolean;
  pattern?: any;
} & React.ComponentProps<typeof TextInput>;

const TextFormController = ({
  control,
  name,
  label,
  required = false,
  pattern,
  ...rest
}: ControlledInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required && `${label} is required`,

        pattern: pattern && { value: pattern, message: "Invalid Format" },
      }}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View className="my-2">
          <Text className="font-poppins m-0">{label}</Text>
          <TextInput
            {...rest}
            className="border-b-2 border-gray-300"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          {error && <Text className="text-red-500 mt-1">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default TextFormController;
