import { API_BASE_URL } from "../../constants";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

export const handleLogin = async (router, email, password) => {
  try {
    const loginUrl = `${API_BASE_URL}/api/login`;
    console.log("Attempting login to:", loginUrl);
    console.log("Sending data:", { email, password });

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error(`Server response is not valid JSON: ${responseText}`);
    }

    if (!response.ok) {
      if (data.errors) {
        throw new Error(Object.values(data.errors).flat().join(", "));
      }
      throw new Error(data.message || "Login failed");
    }

    // Store token
    await SecureStore.setItemAsync("authToken", data.token);

    // Store user ID using the correct column name
    if (data.user && data.user.user_id) {
      await SecureStore.setItemAsync("userId", data.user.user_id.toString());
      console.log("Stored user ID:", data.user.user_id);
    } else {
      console.warn("User ID not found in login response");
    }

    // Use replace instead of push to prevent going back to login
    router.replace("/(tabs)/home");

    // Show success toast after navigation
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Logged In Successfully",
        position: "top",
      });
    }, 100);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Function to retrieve the token
export const getAuthToken = async () => {
  return await SecureStore.getItemAsync("authToken");
};

// Function to retrieve user ID
export const getUserId = async () => {
  return await SecureStore.getItemAsync("userId");
};

// Example of using the token in another API call
export const fetchProtectedData = async () => {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/api/protected`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle the response...
};
