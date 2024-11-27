import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-my-blue rounded-xl min-h-[52px] justify-center items-center ${containerStyles} ${
        isLoading ? "opcaity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white text-md font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
