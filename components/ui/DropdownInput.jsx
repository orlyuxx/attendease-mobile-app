import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DropdownInput = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View className="w-full mb-4">
      <Text className="text-sm font-pregular text-text-sub mb-1">{label}</Text>
      <View className="border border-gray-300 rounded-xl">
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{ height: 55, width: "100%" }}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default DropdownInput;
