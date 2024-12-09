"use client";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store"; // Ensure you import SecureStore
import { API_BASE_URL } from "../../constants";

const GetDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      // Retrieve the token from SecureStore
      const token = await SecureStore.getItemAsync("authToken");

      try {
        const response = await fetch(`${API_BASE_URL}/api/department`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the authorization header
          },
        });

        // Log the entire response object
        console.log("Response from GetDepartments:", response); // Log the response object

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDepartments(data); // Set the fetched departments
        console.log("Fetched Departments:", data); // Log the departments to the console
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array to run once on mount

  return (
    <View className="container mx-auto p-4">
      <Text className="text-xl font-bold mb-4">Departments</Text>
      <View className="min-w-full bg-white border border-gray-300">
        <View>
          <View>
            <Text className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left">
              Department Name
            </Text>
          </View>
        </View>
        <View>
          {departments.map((department, index) => (
            <View key={index}>
              <Text className="px-6 py-4 border-b border-gray-300">
                {department.department_name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GetDepartments;
