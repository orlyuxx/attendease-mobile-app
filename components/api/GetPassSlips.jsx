"use client";

import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetPassSlips = () => {
  const [passSlips, setPassSlips] = useState([]);

  useEffect(() => {
    const fetchPassSlips = async () => {
      const token = await SecureStore.getItemAsync("authToken");

      try {
        const response = await fetch(`${API_BASE_URL}/api/passslip`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response from GetPassSlips:", response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPassSlips(data);
        console.log("Fetched Pass Slips:", data);
      } catch (error) {
        console.error("Error fetching pass slips:", error);
      }
    };

    fetchPassSlips();
  }, []);

  return (
    <View className="container mx-auto p-4">
      <Text className="text-xl font-bold mb-4">Pass Slips</Text>
      <View className="min-w-full bg-white border border-gray-300">
        <View>
          <View className="flex flex-row">
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              User ID
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Reason
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Time Out
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Time In
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Pass Slip Image
            </Text>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left flex-1">
              Status
            </Text>
          </View>
        </View>
        <View>
          {passSlips.map((passSlip, index) => (
            <View key={index} className="flex flex-row">
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {passSlip.user_id}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {passSlip.reason}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {passSlip.time_out}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {passSlip.time_in}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
              <View className="px-6 py-4 border-b border-gray-300 flex-1">
                <Image
                  source={{ uri: passSlip.pass_slip_image }} // Assuming pass_slip_image is a URL
                  style={{ width: 50, height: 50 }} // Adjust size as needed
                />
              </View>
              <Text className="px-6 py-4 border-b border-gray-300 flex-1">
                {passSlip.status}{" "}
                {/* Adjust this field based on your data structure */}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GetPassSlips;
