import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const StatCard = ({ label, value, bgColor }) => (
  <View className={`${bgColor} p-4 flex-1  rounded-xl mx-1 `}>
    <Text className="text-text-primary text-md font-psemibold mb-2">
      {label}
    </Text>
    <Text className="text-lg text-text-sub font-pbold">{value}</Text>
  </View>
);

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

const LeaveItem = ({ leaveType, status, dateRange }) => {
  const numberOfDays = 10;

  let statusColor, textColor, approvedBy;
  switch (status) {
    case "Rejected":
      statusColor = "bg-red-50";
      textColor = "text-red-600";
      approvedBy = "Admin Admin"; // Set approved by for rejected
      break;
    case "Approved":
      statusColor = "bg-green-50";
      textColor = "text-green-600";
      approvedBy = "Admin Admin"; // Set approved by for approved
      break;
    case "Pending":
      statusColor = "bg-yellow-50"; // Yellow background for pending
      textColor = "text-yellow-600"; // Yellow text for pending
      approvedBy = "----"; // Set approved by for pending
      break;
    default:
      statusColor = "bg-gray-50";
      textColor = "text-gray-600";
      approvedBy = "N/A"; // Default case
  }

  return (
    <View className="bg-white p-4 rounded-xl mb-4">
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

      <View className="flex-row space-x-4 mt-4">
        <View className="mr-6">
          <Text className="text-text-primary font-psemibold text-sm mb-1">
            No. of Days
          </Text>
          <Text className="text-text-sub font-pregular text-xs mt-1">
            {numberOfDays} Days
          </Text>
        </View>
        <View>
          <Text className="text-text-primary font-psemibold text-sm mb-1">
            {status === "Rejected" ? "Rejected By" : "Approved By"}
          </Text>
          <Text className="text-text-sub font-pregular text-xs mt-1">
            {approvedBy}
          </Text>
        </View>
      </View>
    </View>
  );
};

const AllLeaves = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const leaveItems = [
    {
      leaveType: "Sick Leave",
      status: "Approved",
      dateRange: "Dec 21, 2024 - Dec 30, 2024",
    },
    {
      leaveType: "Sick Leave",
      status: "Rejected",
      dateRange: "Dec 21, 2024 - Dec 30, 2024",
    },
    {
      leaveType: "Maternal Leave",
      status: "Pending",
      dateRange: "Jan 4, 2025 - Jan 6, 2025",
    },
  ];

  const filteredLeaves = leaveItems.filter((item) => {
    if (activeFilter === "All") return true;
    return item.status === activeFilter;
  });

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6 px-4 pt-4">
        <Text className="text-xl text-text-header font-psemibold">
          All Leaves
        </Text>
        <View className="flex-row space-x-3">
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </View>
      </View>

      {/* Fixed Content */}
      <View className="px-4">
        {/* Stats Cards - Row 1 */}
        <View className="flex-row mb-2">
          <StatCard label="Leave Balance" value="17" bgColor="bg-blue-50" />
          <StatCard label="Approved Leave" value="1" bgColor="bg-green-50" />
        </View>

        {/* Stats Cards - Row 2 */}
        <View className="flex-row mb-12">
          <StatCard label="Pending Leave" value="1" bgColor="bg-gray-100" />
          <StatCard label="Rejected Leave" value="1" bgColor="bg-red-50" />
        </View>

        {/* Filter Buttons */}
        <View className="flex-row space-x-2 mb-6 p-2 rounded-xl">
          <FilterButton
            label="All"
            active={activeFilter === "All"}
            onPress={() => setActiveFilter("All")}
          />
          <FilterButton
            label="Pending"
            active={activeFilter === "Pending"}
            onPress={() => setActiveFilter("Pending")}
          />
          <FilterButton
            label="Approved"
            active={activeFilter === "Approved"}
            onPress={() => setActiveFilter("Approved")}
          />
          <FilterButton
            label="Rejected"
            active={activeFilter === "Rejected"}
            onPress={() => setActiveFilter("Rejected")}
          />
        </View>
      </View>

      {/* Scrollable Leave Items */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 60 }}
      >
        {filteredLeaves.map((item, index) => (
          <LeaveItem
            key={index}
            leaveType={item.leaveType}
            status={item.status}
            dateRange={item.dateRange}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const PassSlip = () => {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center mb-6 px-4 pt-4">
        <Text className="text-xl text-text-header font-psemibold">
          Pass Slip
        </Text>
        <MaterialCommunityIcons name="plus" size={24} color="black" />
      </View>

      {/* Add your Pass Slip content here */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 60 }}
      >
        <Text className="text-text-sub">No pass slips found</Text>
      </ScrollView>
    </View>
  );
};

const Leaves = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
          textTransform: "none",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#3b82f6", // my-blue-400 equivalent
        },
      }}
    >
      <Tab.Screen name="All Leaves" component={AllLeaves} />
      <Tab.Screen name="Pass Slip" component={PassSlip} />
    </Tab.Navigator>
  );
};

export default Leaves;
