import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { images } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { handleLogout } from "../../components/api/HandleLogout";

import GetDepartments from "../../components/api/GetDepartments";
import GetLeaveTypes from "../../components/api/GetLeaveTypes";
import GetShifts from "../../components/api/GetShifts";
import GetLeaves from "../../components/api/GetLeaves";
import GetAttendanceRecords from "../../components/api/GetAttendanceRecords";
import GetPassSlips from "../../components/api/GetPassSlips";
import GetUserDetails from "../../components/api/GetUserDetails";
import { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch both user data and departments
        const [userResponse, departmentsResponse] = await Promise.all([
          GetUserDetails(),
          GetDepartments(),
        ]);

        setUserData(userResponse);
        setDepartments(departmentsResponse);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get department name function
  const getDepartmentName = (departmentId) => {
    if (!departments) return "Loading...";
    const department = departments.find(
      (dept) => dept.department_id === departmentId
    );
    return department ? department.department_name : "Unknown Department";
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-text-sub font-pmedium">Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-red-500 font-pmedium">Error: {error}</Text>
      </View>
    );
  }

  const onLogoutPress = async () => {
    try {
      await handleLogout(router);
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-6">
      {/* Check if data are fetched */}
      {/* <GetDepartments /> */}
      {/* <GetLeaveTypes /> */}
      {/* <GetShifts /> */}
      {/* <GetLeaves /> */}
      {/* <GetAttendanceRecords /> */}
      {/* <GetPassSlips /> */}

      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-24">
        <Text className="text-text-header text-xl font-psemibold">Profile</Text>
        <TouchableOpacity
          onPress={onLogoutPress}
          className="flex-row items-center"
        >
          <Text className="text-red-500 font-pmedium">Log out</Text>
          <Icon
            name="logout"
            size={20}
            color="#ef4444"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Info Section */}
      <View className="bg-gray-200 rounded-lg p-4 mb-5">
        <View className="items-center mb-3 relative">
          <Image
            source={userData?.image ? { uri: userData.image } : images.profile}
            className="w-28 h-28 rounded-full bg-gray-300 border-white border-4 -mt-16 mb-6"
          />
          <TouchableOpacity
            onPress={() => console.log("Change profile picture")}
            style={{
              position: "absolute",
              bottom: 100,
              right: 110,
              backgroundColor: "#f9fafb",
              borderRadius: 50,
              padding: 4,
            }}
          >
            <Icon name="camera-alt" size={18} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl text-text-header font-pbold">
            {userData
              ? `${userData.firstname} ${userData.lastname}`
              : "Loading..."}
          </Text>
          <Text className="text-sm text-text-sub font-pregular">
            {userData?.email || "Loading..."}
          </Text>
          <View className="flex-row justify-center mt-4 mb-2">
            <Text className="text-sm text-text-sub font-pregular mr-2">
              Full-Time •
            </Text>
            <Text className="text-sm text-text-sub font-pregular mr-2">
              {getDepartmentName(userData?.department_id)} •
            </Text>
            <Text className="text-sm text-text-sub font-pregular">
              Joined{" "}
              {userData?.created_at
                ? new Date(userData.created_at).getFullYear()
                : "Loading"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-blue-400 rounded-lg py-2 mt-2 mb-6"
          onPress={() => router.push("../edit-profile")}
        >
          <Text className="text-white text-center font-psemibold">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between bg-gray-200 mb-10 p-4 rounded-lg">
        <View className="flex-1 items-center">
          <Text className="text-sm text-text-sub font-pregular">
            Attendance
          </Text>
          <Text className="text-lg font-psemibold">
            {userData?.attendance_count || 0}
          </Text>
        </View>
        <View className="w-px bg-gray-300 h-full" />
        <View className="flex-1 items-center">
          <Text className="text-sm text-text-sub font-pregular">Absent</Text>
          <Text className="text-lg font-psemibold">
            {userData?.absent_count || 0}
          </Text>
        </View>
        <View className="w-px bg-gray-300 h-full" />
        <View className="flex-1 items-center">
          <Text className="text-sm text-text-sub font-pregular">Leave</Text>
          <Text className="text-lg font-psemibold">
            {userData?.leave_count || 0}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
