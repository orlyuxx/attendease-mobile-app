import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { images } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white p-5">
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-24">
        <Text className="text-text-header text-xl font-psemibold">Profile</Text>
        <TouchableOpacity
          onPress={() => {
            /* Add your login function here */
          }}
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
            source={images.profile}
            className="w-28 h-28 rounded-full bg-gray-300 border-white border-4 -mt-16 mb-6"
          />
          <TouchableOpacity
            onPress={() => {
              // Call your function to change the profile picture here
              console.log("Change profile picture");
            }}
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
            Orlando Donesa
          </Text>
          <Text className="text-sm text-text-sub font-pregular">
            orlandodonesa@gmail.com
          </Text>
          <View className="flex-row justify-center mt-4 mb-2">
            <Text className="text-sm text-text-sub font-pregular mr-2">
              Full Time •
            </Text>
            <Text className="text-sm text-text-sub font-pregular mr-2">
              IT Department •
            </Text>
            <Text className="text-sm text-text-sub font-pregular">
              Joined 2021
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
          <Text className="text-lg font-psemibold">21</Text>
        </View>
        <View className="w-px bg-gray-300 h-full" />
        <View className="flex-1 items-center">
          <Text className="text-sm text-text-sub font-pregular">Absent</Text>
          <Text className="text-lg font-psemibold">2</Text>
        </View>
        <View className="w-px bg-gray-300 h-full" />
        <View className="flex-1 items-center">
          <Text className="text-sm text-text-sub font-pregular">Leave</Text>
          <Text className="text-lg font-psemibold">17</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
