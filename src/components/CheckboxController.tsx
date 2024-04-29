import React from "react";
import Checkbox, { CheckboxProps } from "expo-checkbox";
import { Controller } from "react-hook-form";
import { Text } from "react-native";

type Props = {
  classname?: string;
  label?: string;
  name: string;
  errors: any;
  control: any;
} & CheckboxProps;

const CheckboxController = ({
  classname,
  label,
  name,
  control,
  errors,
  ...rest
}: Props) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <>
            <Checkbox value={value} onValueChange={onChange} />
            {errors[name]?.message && (
              <Text className="font-poppins text-red-500 mt-1">
                {errors[name]?.message}
              </Text>
            )}
          </>
        );
      }}
      name={name}
      defaultValue=""
    />
  );
};

export default CheckboxController;
