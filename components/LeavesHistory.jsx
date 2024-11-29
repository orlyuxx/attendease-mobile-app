import React from "react";
import { View, Text } from "react-native";

const LeaveHistory = ({ leaveType, status, dateRange }) => {
  let statusColor, textColor;
  switch (status) {
    case "Rejected":
      statusColor = "bg-red-50";
      textColor = "text-red-600";
      break;
    case "Approved":
      statusColor = "bg-green-50";
      textColor = "text-green-600";
      break;
    case "Pending":
      statusColor = "bg-yellow-50";
      textColor = "text-yellow-600";
      break;
    default:
      statusColor = "bg-gray-100";
      textColor = "text-gray-600";
  }

  return (
    <View className={`bg-gray-50 p-4 rounded-xl mb-4 shadow-md`}>
      <View className="flex-row justify-between items-center">
        <Text className="text-text-primary text-md font-psemibold">
          {leaveType}
        </Text>
        <View className={`${statusColor} px-3 py-1 rounded-full`}>
          <Text className={`${textColor} text-xs`}>{status}</Text>
        </View>
      </View>
      <Text className="text-text-sub font-pregular text-xs my-2">
        {dateRange}
      </Text>
    </View>
  );
};

export default LeaveHistory;
