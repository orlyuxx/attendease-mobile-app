import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import AttendanceCard from "../../components/AttendanceCard";
import CalendarStrip from "../../components/CalendarStrip";
import Toast from "react-native-toast-message";
import GetUserDetails from "../../components/api/GetUserDetails";
import GetDepartments from "../../components/api/GetDepartments";

const Home = () => {
  const { refresh } = useLocalSearchParams();
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [departments, setDepartments] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Add this function to fetch user data
  const fetchUserData = async () => {
    try {
      const userResponse = await GetUserDetails(); // Fetch user details
      setUserData(userResponse); // Update state with user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (refresh) {
      // Refetch user data
      fetchUserData();
    }
  }, [refresh]);

  // Get department name helper function
  const getDepartmentName = (departmentId) => {
    if (!departments) return "Loading...";
    const department = departments.find(
      (dept) => dept.department_id === departmentId
    );
    return department ? department.department_name : "Unknown Department";
  };

  // Fetch user data and departments
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userResponse, departmentsResponse] = await Promise.all([
          GetUserDetails(),
          GetDepartments(),
        ]);

        setUserData(userResponse);
        setDepartments(departmentsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogAttendance = () => {
    // Your logic for logging attendance
    console.log("Logging attendance...");
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Your logic to fetch new data goes here
    console.log("Refreshing data...");
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header with Profile */}
          <View className="flex-row justify-between items-center px-6 mt-6">
            <View className="flex-row items-center gap-3">
              <Image
                source={
                  userData?.image ? { uri: userData.image } : images.profile
                }
                className="w-12 h-12 rounded-full border-2 border-gray-300 bg-gray-50"
              />
              <View>
                <Text className="text-text-header font-pblack text-lg">
                  {userData
                    ? `${userData.firstname} ${userData.lastname}`
                    : "Loading..."}
                </Text>
                <Text className="text-text-sub font-psemibold text-sm">
                  {getDepartmentName(userData?.department_id)}
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
          <View className="mb-4">
            <CalendarStrip />
          </View>

          {/* Today Attendance Section */}
          <View className="mt-8 px-6 mb-4">
            <Text className="text-md font-psemibold text-text-primary mb-4">
              Today's Attendance
            </Text>
            <View className="flex-row justify-between">
              <AttendanceCard
                title="Time In"
                icon="check-circle"
                time="10:20 AM"
                status="On Time"
                onPress={handleLogAttendance}
              />
              <AttendanceCard
                title="Time Out"
                icon="exit-to-app"
                time="07:00 PM"
                status="On Time"
                onPress={handleLogAttendance}
              />
            </View>

            <View className="mt-4 flex-row justify-between">
              <AttendanceCard
                title="Break In"
                icon="coffee"
                time="12:00 PM"
                status="On Time"
                onPress={handleLogAttendance}
              />
              <AttendanceCard
                title="Break Out"
                icon="alarm"
                time="12:57 PM"
                status="On Time"
                onPress={handleLogAttendance}
              />
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
                    <Icon name="check-circle" size={20} color="#1b5dda" />
                  </View>
                  <View>
                    <Text className="text-text-primary text-md font-psemibold">
                      Time In
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
                    <Icon name="exit-to-app" size={20} color="#1b5dda" />
                  </View>
                  <View>
                    <Text className="text-text-primary text-md font-psemibold">
                      Time Out
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
                    <Icon name="assignment" size={20} color="#1b5dda" />
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
                    <Icon name="assignment" size={20} color="#1b5dda" />
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
                    <Icon name="assignment" size={20} color="#1b5dda" />
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
        </ScrollView>
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default Home;
