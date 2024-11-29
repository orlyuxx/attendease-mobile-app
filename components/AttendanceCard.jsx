import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Create a reusable AttendanceCardItem component
const AttendanceCard = ({ title, icon, time, status, onPress }) => {
  return (
    <TouchableOpacity
      className="bg-gray-50 p-4 rounded-xl w-[48%] active:bg-gray-100"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
          <Icon name={icon} size={20} color="#1b5dda" />
        </View>
        <Text className="text-text-primary text-md font-psemibold">
          {title}
        </Text>
      </View>
      <Text className="text-sm font-psemibold mt-4">{time}</Text>
      <Text className="text-text-sub font-pregular text-xs">{status}</Text>
    </TouchableOpacity>
  );
};

export default AttendanceCard;
