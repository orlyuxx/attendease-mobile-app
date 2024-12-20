"use client";

import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetUserDetails = async () => {
  try {
    // Get both the token and userId from SecureStore
    const fetchedToken = await SecureStore.getItemAsync("authToken");
    const userId = await SecureStore.getItemAsync("userId");

    if (!fetchedToken) {
      throw new Error("No authentication token found");
    }

    if (!userId) {
      throw new Error("No user ID found");
    }

    console.log("Fetching details for user ID:", userId);

    const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${fetchedToken}`,
      },
    });

    if (!response.ok) {
      console.log("Response status:", response.status);
      const errorText = await response.text();
      console.log("Error response:", errorText);
      throw new Error(
        `Server responded with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Fetched user data:", data);
    return data;
  } catch (error) {
    console.error("Detailed error:", error);
    throw error;
  }
};

export default GetUserDetails;
