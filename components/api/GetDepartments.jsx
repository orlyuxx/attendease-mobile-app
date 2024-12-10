"use client";

import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetDepartments = async () => {
  try {
    const fetchedToken = await SecureStore.getItemAsync("authToken");
    if (!fetchedToken) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/api/department`, {
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
    console.log("Fetched departments:", data);
    return data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export default GetDepartments;
