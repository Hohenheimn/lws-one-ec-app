import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { View, Text, TextInputProps, Pressable, Platform } from "react-native";
import DateTimePickerIOS from "@react-native-community/datetimepicker";

import Button from "./Button";

type Props = {
  classname?: string;
  label?: string;
  name: string;
  errors: any;
  control: any;
} & TextInputProps;

const DatePickerController = ({
  classname,
  label,
  name,
  control,
  errors,
  ...rest
}: Props) => {
  const [show, setShow] = useState(false);
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View className="my-2">
            {label && <Text className="text-black font-poppins">{label}</Text>}
            <Pressable
              onPress={() => {
                setShow(true);
              }}
            >
              <View className="border-b border-gray-400 font-poppins py-2 pointer-events-none">
                {value && <Text>{value ? value.toDateString() : ""}</Text>}
                {!value && rest.placeholder && (
                  <Text className=" text-[#bdbdbd]">{rest.placeholder}</Text>
                )}
              </View>
            </Pressable>

            {errors[name]?.message && (
              <Text className="font-poppins text-red-500 mt-1">
                {errors[name]?.message}
              </Text>
            )}
            {show && (
              <DateTimePickerIOS
                testID="dateTimePicker"
                value={value || new Date(2000, 0, 1)}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={(_, selectedData) => {
                  onChange(selectedData);
                }}
              />
            )}
            {show && Platform.OS === "ios" && (
              <View className=" flex-row justify-around">
                <Button
                  title="CANCEL"
                  onPress={() => {
                    setShow(false);
                  }}
                  appearance={"default"}
                />
                <Button
                  title="SAVE"
                  onPress={() => {
                    setShow(false);
                  }}
                  className=" w-24"
                  appearance={"primary"}
                />
              </View>
            )}
          </View>
        );
      }}
      name={name}
      defaultValue=""
    />
  );
};

export default DatePickerController;
