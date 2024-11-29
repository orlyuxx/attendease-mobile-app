import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// CalendarStrip Component
const CalendarStrip = () => {
  // Mock data for calendar
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();

  // Calculate the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDayIndex);

  return (
    <View className="mt-8 mb-2 px-6">
      <View className="flex-row justify-between">
        {days.map((day, index) => {
          const dayDate = new Date(startOfWeek);
          dayDate.setDate(startOfWeek.getDate() + index);

          return (
            <View key={index} className="items-center">
              <Text className="text-text-sub font-pregular text-sm mb-2">
                {day}
              </Text>
              <TouchableOpacity
                className={`w-8 h-8 rounded-xl items-center justify-center
                  ${
                    index === currentDayIndex
                      ? "bg-[#1b5dda]"
                      : "bg-transparent"
                  }`}
              >
                <Text
                  className={
                    index === currentDayIndex
                      ? "text-white"
                      : "text-text-sub font-pregular"
                  }
                >
                  {dayDate.getDate()}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CalendarStrip;
