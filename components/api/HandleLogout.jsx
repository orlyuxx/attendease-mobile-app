import { API_BASE_URL } from "../../constants";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const handleLogout = async (router) => {
  try {
    const logoutUrl = `${API_BASE_URL}/api/logout`;
    console.log("Attempting logout to:", logoutUrl);

    // Retrieve the token from SecureStore
    const token = await SecureStore.getItemAsync("authToken");

    const response = await fetch(logoutUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseText = await response.text();
    console.log("Logout response:", responseText);

    if (!response.ok) {
      throw new Error("Logout failed. Please try again.");
    }

    // Clear the token from SecureStore
    await SecureStore.deleteItemAsync("authToken");

    // Redirect to the login page
    router.replace("/");

    // Show toast message after navigation
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Logged Out Successfully",
        position: "top",
      });
    }, 100);

    console.log("Logout successful");
  } catch (error) {
    console.error("Logout error:", error);
    throw error; // Re-throw the error for handling in the UI
  }
};
