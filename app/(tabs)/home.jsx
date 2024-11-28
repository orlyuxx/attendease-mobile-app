import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

const Home = () => {
  // Mock data for calendar
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();

  // Calculate the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDayIndex);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Profile */}
      <View className="flex-row justify-between items-center px-6 mt-6">
        <View className="flex-row items-center gap-3">
          <Image
            source={images.profile}
            className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-50"
          />
          <View>
            <Text className="text-text-header font-pblack text-xl">
              Orlando Donesa
            </Text>
            <Text className="text-text-sub font-psemibold text-md">
              IT Department
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <View className="w-9 h-9 bg-gray-100 rounded-full items-center justify-center border-2 border-gray-300">
            <Icon name="notifications" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Calendar Strip */}
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

      {/* Today Attendance Section */}
      <View className="mt-8 px-6">
        <Text className="text-md font-psemibold text-text-primary mb-4">
          Today's Attendance
        </Text>
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="bg-gray-50 p-4 rounded-xl w-[48%] active:bg-gray-100"
            onPress={() => {
              Alert.alert(
                "Log Attendance",
                "Do you want to log your attendance now?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Yes, Log In",
                    onPress: () => {
                      // Add your time in logic here
                      console.log("Logging attendance...");
                    },
                  },
                ]
              );
            }}
          >
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
                <Icon name="check-circle" size={20} color="#1b5dda" />
              </View>
              <Text className="text-text-primary text-md font-psemibold">
                Time In
              </Text>
            </View>
            <Text className="text-sm font-psemibold mt-4">10:20 AM</Text>
            <Text className="text-text-sub font-pregular text-xs">On Time</Text>
          </TouchableOpacity>

          <View className="bg-gray-50 p-4 rounded-xl w-[48%]">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
                <Icon name="exit-to-app" size={20} color="#1b5dda" />
              </View>
              <Text className="text-text-primary text-md font-psemibold">
                Time Out
              </Text>
            </View>
            <Text className="text-sm font-psemibold mt-4">07:00 PM</Text>
            <Text className="text-text-sub font-pregular text-xs">Go Home</Text>
          </View>
        </View>
      </View>

      {/* Statistics Section */}
      <View className="mt-4 mb-4 px-6">
        <View className="flex-row justify-between">
          <View className="bg-gray-50 p-4 rounded-xl w-[48%]">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
                <Icon name="coffee" size={20} color="#1b5dda" />
              </View>
              <Text className="text-text-primary text-md font-psemibold">
                Break In
              </Text>
            </View>
            <Text className="text-sm font-psemibold mt-4">12:00 PM</Text>
            <Text className="text-text-sub font-pregular text-xs">On Time</Text>
          </View>

          <View className="bg-gray-50 p-4 rounded-xl w-[48%]">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center">
                <Icon name="alarm" size={20} color="#1b5dda" />
              </View>
              <Text className="text-text-primary text-md font-psemibold">
                Break Out
              </Text>
            </View>
            <Text className="text-sm font-psemibold mt-4">12:57 PM</Text>
            <Text className="text-text-sub font-pregular text-xs">On Time</Text>
          </View>
        </View>
      </View>

      {/* Activity Section */}
      <View className="mt-8 px-6 flex-1">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-md font-psemibold text-text-primary">
            Recent Activities
          </Text>
          <TouchableOpacity>
            <Link
              href="/history"
              className="font-pregular text-my-blue-500 underline"
            >
              view all
            </Link>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <View className="bg-gray-50 p-4 rounded-xl flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                {/* Add check-in icon */}
              </View>
              <View>
                <Text className="text-text-primary text-md font-psemibold">
                  Check In
                </Text>
                <Text className="text-text-sub text-sm font-pregular">
                  November 29, 2024
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[#1b5dda] text-sm font-psemibold">
                7:57 PM
              </Text>
              <Text className="text-text-sub font-pregular text-xs text-right">
                On Time
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 mt-2 p-4 rounded-xl flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                {/* Add check-in icon */}
              </View>
              <View>
                <Text className="text-text-primary text-md font-psemibold">
                  Check Out
                </Text>
                <Text className="text-text-sub text-sm font-pregular">
                  November 28, 2024
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[#1b5dda] text-sm font-psemibold">
                5:12 PM
              </Text>
              <Text className="text-text-sub font-pregular text-xs text-right">
                On Time
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 mt-2 p-4 rounded-xl flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                {/* Add check-in icon */}
              </View>
              <View>
                <Text className="text-text-primary text-md font-psemibold">
                  Apply Leave
                </Text>
                <Text className="text-text-sub text-sm font-pregular">
                  November 26, 2024
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[#1b5dda] text-sm font-psemibold">
                Sick Leave
              </Text>
              <Text className="text-text-sub font-pregular text-xs text-right">
                Pending
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 mt-2 p-4 rounded-xl flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                {/* Add check-in icon */}
              </View>
              <View>
                <Text className="text-text-primary text-md font-psemibold">
                  Apply Leave
                </Text>
                <Text className="text-text-sub text-sm font-pregular">
                  November 26, 2024
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[#1b5dda] text-sm font-psemibold">
                Sick Leave
              </Text>
              <Text className="text-text-sub font-pregular text-xs text-right">
                Pending
              </Text>
            </View>
          </View>
          <View className="bg-gray-50 mt-2 p-4 rounded-xl flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                {/* Add check-in icon */}
              </View>
              <View>
                <Text className="text-text-primary text-md font-psemibold">
                  Apply Leave
                </Text>
                <Text className="text-text-sub text-sm font-pregular">
                  November 26, 2024
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[#1b5dda] text-sm font-psemibold">
                Sick Leave
              </Text>
              <Text className="text-text-sub font-pregular text-xs text-right">
                Pending
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
