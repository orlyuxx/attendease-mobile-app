"use client";

import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const UpdateUserDetails = async (userData) => {
  try {
    const fetchedToken = await SecureStore.getItemAsync("authToken");
    const userId = await SecureStore.getItemAsync("userId");

    if (!fetchedToken) {
      throw new Error("No authentication token found");
    }

    if (!userId) {
      throw new Error("No user ID found");
    }

    console.log("Updating user details for ID:", userId);
    console.log("Update data:", userData);

    const response = await fetch(
      `${API_BASE_URL}/api/updateUserDetails/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${fetchedToken}`,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
      throw new Error(
        `Server responded with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Update successful:", data);
    return data;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

export default UpdateUserDetails;
