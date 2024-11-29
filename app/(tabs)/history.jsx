import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import AttendanceHistory from "../../components/AttendanceHistory";
import LeavesHistory from "../../components/LeavesHistory";

const FilterButton = ({ label, active, onPress }) => (
  <Pressable
    onPress={onPress}
    className={`flex-1 p-2 rounded-lg ${
      active ? "bg-my-blue-400" : "bg-transparent"
    }`}
  >
    <Text
      className={`text-center text-sm ${
        active ? "text-white font-psemibold" : "text-text-sub font-pmedium"
      }`}
    >
      {label}
    </Text>
  </Pressable>
);

const History = () => {
  const [activeFilter, setActiveFilter] = useState("Attendance");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    console.log("Refreshing history...");
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const attendanceData = [
    {
      date: "19",
      day: "Fri",
      timeIn: "09:10",
      timeOut: "06:10",
      breakIn: "12:00",
      breakOut: "13:00",
      totalHrs: "09:00",
      status: "Present",
    },
    {
      date: "18",
      day: "Thu",
      timeIn: "--:--",
      timeOut: "--:--",
      breakIn: "--:--",
      breakOut: "--:--",
      totalHrs: "--:--",
      status: "Absent",
    },
    {
      date: "17",
      day: "Wed",
      timeIn: "09:10",
      timeOut: "04:10",
      breakIn: "12:00",
      breakOut: "01:00",
      totalHrs: "07:00",
      status: "On Leave",
    },
    {
      date: "16",
      day: "Tue",
      timeIn: "09:10",
      timeOut: "06:10",
      breakIn: "12:00",
      breakOut: "01:00",
      totalHrs: "09:00",
      status: "Present",
    },
  ];

  const leaveData = [
    {
      leaveType: "Sick Leave",
      status: "Approved",
      dateRange: "Oct 17, 2023",
    },
    {
      leaveType: "Vacation Leave",
      status: "Pending",
      dateRange: "Nov 1-3, 2023",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-6">
        <Text className="text-xl text-text-header font-psemibold">History</Text>
      </View>

      {/* Filter Buttons */}
      <View className="flex-row space-x-2 mb-6 p-2 mx-4 rounded-xl">
        <FilterButton
          label="Attendance"
          active={activeFilter === "Attendance"}
          onPress={() => setActiveFilter("Attendance")}
        />
        <FilterButton
          label="Leave"
          active={activeFilter === "Leave"}
          onPress={() => setActiveFilter("Leave")}
        />
        <FilterButton
          label="Pass Slip"
          active={activeFilter === "Pass Slip"}
          onPress={() => setActiveFilter("Pass Slip")}
        />
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 60 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeFilter === "Attendance" &&
          attendanceData.map((item, index) => (
            <AttendanceHistory key={index} {...item} />
          ))}

        {activeFilter === "Leave" && (
          <>
            {leaveData.length > 0 ? (
              leaveData.map((item, index) => (
                <LeavesHistory key={index} {...item} />
              ))
            ) : (
              <Text className="text-text-sub text-center mt-4">
                No leaves found
              </Text>
            )}
          </>
        )}

        {activeFilter === "Pass Slip" && (
          <Text className="text-text-sub text-center mt-4">
            No records found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
