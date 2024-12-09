"use client";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetShifts = () => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const token = await SecureStore.getItemAsync("authToken");

      try {
        const response = await fetch(`${API_BASE_URL}/api/shift`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response from GetShifts:", response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setShifts(data);
        console.log("Fetched Shifts:", data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <View className="container mx-auto p-4">
      <Text className="text-xl font-bold mb-4">Shifts</Text>
      <View className="min-w-full bg-white border border-gray-300">
        <View>
          <View className="flex flex-row">
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Shift Name
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Shift Start
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Shift End
            </Text>
          </View>
        </View>
        <View>
          {shifts.map((shift, index) => (
            <View key={index} className="flex flex-row">
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {shift.shift_name}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {shift.shift_start}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {shift.shift_end}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GetShifts;
