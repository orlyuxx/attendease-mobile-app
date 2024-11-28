import React from "react";
import { View, Text } from "react-native";

const InfoItem = ({ label, value }) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-pregular text-text-sub mb-1">{label}</Text>
      <View className="border border-gray-300 rounded-xl p-3">
        <Text className="text-md font-pregular">
          {value || "Not specified"}
        </Text>
      </View>
    </View>
  );
};

export default InfoItem;
