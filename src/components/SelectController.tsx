import { View, Text } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { ItemType } from "react-native-dropdown-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { Octicons } from "@expo/vector-icons";

type DataProps = {
  label: string;
  value: number;
};

type SelectInputProps<T> = {
  label?: string;
  data: ItemType<any>[] | undefined;
  name: string;
  control: any;
  placeholder?: string;
};

const SelectController = <T,>({
  name,
  label,
  data = [],
  control,
  placeholder,
}: SelectInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<ItemType<any>[]>(data);

  const onOpen = () => setIsOpen(!isOpen);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View className="my-2">
            {label && <Text className="text-black font-poppins">{label}</Text>}
            <DropDownPicker
              value={value}
              setValue={onChange}
              open={isOpen}
              setOpen={onOpen}
              placeholder={placeholder}
              items={items}
              setItems={setItems}
              onChangeValue={onChange}
              ArrowUpIconComponent={({ style }) => (
                <Octicons
                  style={style}
                  name="chevron-up"
                  size={20}
                  color="#86efac"
                />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Octicons
                  style={style}
                  name="chevron-down"
                  size={20}
                  color="#86efac"
                />
              )}
              style={{ borderColor: "#ccc" }}
              dropDownContainerStyle={{
                zIndex: 9999,
                borderColor: "#ccc",
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default SelectController;
