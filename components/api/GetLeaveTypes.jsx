"use client";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetLeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      // Retrieve the token from SecureStore
      const token = await SecureStore.getItemAsync("authToken");

      try {
        const response = await fetch(`${API_BASE_URL}/api/leavetype`, {
          // Updated API endpoint
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the authorization header
          },
        });

        // Log the entire response object
        console.log("Response from GetLeaveTypes:", response); // Log the response object

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setLeaveTypes(data); // Set the fetched leave types
        console.log("Fetched Leave Types:", data); // Log the leave types to the console
      } catch (error) {
        console.error("Error fetching leave types:", error);
      }
    };

    fetchLeaveTypes();
  }, []); // Empty dependency array to run once on mount

  return (
    <View className="container mx-auto p-4">
      <Text className="text-xl font-bold mb-4">Leave Types</Text>
      <View className="min-w-full bg-white border border-gray-300">
        <View>
          <View>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left">
              Leave Type Name
            </Text>
          </View>
        </View>
        <View>
          {leaveTypes.map((leaveType, index) => (
            <View key={index}>
              <Text className="px-6 py-4 border-b border-gray-300">
                {leaveType.leave_name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GetLeaveTypes;
