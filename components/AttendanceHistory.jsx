import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AttendanceHistory = ({
  date,
  day,
  status,
  timeIn,
  timeOut,
  breakIn,
  breakOut,
  totalHrs,
}) => {
  let statusColor;
  switch (status) {
    case "Present":
      statusColor = "text-green-600";
      break;
    case "Absent":
      statusColor = "text-red-600";
      break;
    case "On Leave":
      statusColor = "text-yellow-600";
      break;
    default:
      statusColor = "text-gray-600"; // Fallback color
  }

  // Determine if all data should be hidden
  const isAbsentOrOnLeave = status === "Absent" || status === "On Leave";

  return (
    <View className="bg-gray-50 mt-2 p-4 rounded-xl">
      {/* Date and Status Header */}
      <View className="flex-row justify-between items-center mb-3 p-2">
        <View className="flex-row items-center gap-1">
          <Text className="text-text-primary text-lg font-psemibold">
            {date}
          </Text>
          <Text className="text-text-sub text-sm font-pregular">{day}</Text>
        </View>
        <View className="ml-auto">
          <Text className={`text-sm ${statusColor} font-psemibold`}>
            {status}
          </Text>
        </View>
      </View>

      {/* Time Details */}
      <View className="flex-row justify-between mt-2">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-3">
            <Icon name="check-circle" size={16} color="#1b5dda" />
            <View>
              <Text className="text-text-sub text-xs font-pmedium">
                Clock in
              </Text>
              <Text className="text-text-primary text-sm font-psemibold">
                {isAbsentOrOnLeave ? "--:--" : timeIn || "--:--"}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon name="coffee" size={16} color="#1b5dda" />
            <View>
              <Text className="text-text-sub text-xs font-pmedium">
                Break in
              </Text>
              <Text className="text-text-primary text-sm font-psemibold">
                {isAbsentOrOnLeave ? "--:--" : breakIn || "--:--"}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-3">
            <Icon name="exit-to-app" size={16} color="#1b5dda" />
            <View>
              <Text className="text-text-sub text-xs font-pmedium">
                Clock out
              </Text>
              <Text className="text-text-primary text-sm font-psemibold">
                {isAbsentOrOnLeave ? "--:--" : timeOut || "--:--"}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon name="alarm" size={16} color="#1b5dda" />
            <View>
              <Text className="text-text-sub text-xs font-pmedium">
                Break out
              </Text>
              <Text className="text-text-primary text-sm font-psemibold">
                {isAbsentOrOnLeave ? "--:--" : breakOut || "--:--"}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 items-end justify-center">
          <Text className="text-text-sub text-xs font-pmedium">Total hrs</Text>
          <Text className="text-text-primary text-sm font-psemibold">
            {isAbsentOrOnLeave ? "--:--" : totalHrs || "--:--"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AttendanceHistory;
