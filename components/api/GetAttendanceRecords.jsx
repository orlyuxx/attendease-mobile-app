"use client";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetAttendanceRecords = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = await SecureStore.getItemAsync("authToken");

      try {
        const response = await fetch(`${API_BASE_URL}/api/attendance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response from GetAttendance:", response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAttendanceRecords(data);
        console.log("Fetched Attendance Records:", data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <View className="container mx-auto p-4">
      <Text className="text-xl font-bold mb-4">Attendance Records</Text>
      <View className="min-w-full bg-white border border-gray-300">
        <View>
          <View className="flex flex-row">
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              User ID
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Date
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Time In
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Status
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Break In
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Break In Status
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Break Out
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Break Out Status
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Time Out
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Time Out Status
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Total Hours
            </Text>
          </View>
        </View>
        <View>
          {attendanceRecords.map((record, index) => (
            <View key={index} className="flex flex-row">
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.user_id}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.date}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.time_in}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.status}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.break_in}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.break_in_status}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.break_out}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.break_out_status}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.time_out}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.time_out_status}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {record.total_hours}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GetAttendanceRecords;
