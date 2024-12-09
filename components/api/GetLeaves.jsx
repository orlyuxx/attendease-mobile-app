"use client";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const token = await SecureStore.getItemAsync("authToken");

      try {
        const response = await fetch(`${API_BASE_URL}/api/leave`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response from GetLeaves:", response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setLeaves(data);
        console.log("Fetched Leaves:", data);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <View className="container mx-auto p-4">
      <Text className="text-xl font-bold mb-4">Leaves</Text>
      <View className="min-w-full bg-white border border-gray-300">
        <View>
          <View className="flex flex-row">
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              User ID
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Leave Type ID
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Leave Start
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Leave End
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Reason
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Status
            </Text>
          </View>
        </View>
        <View>
          {leaves.map((leave, index) => (
            <View key={index} className="flex flex-row">
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {leave.user_id}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {leave.leave_type_id}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {leave.leave_start}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {leave.leave_end}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {leave.reason}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {leave.status}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GetLeaves;
