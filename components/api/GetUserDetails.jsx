"use client";

import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../constants";

const GetUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const userId = "loggedInUserId";
  const [token, setToken] = useState(null); // Added state for token

  useEffect(() => {
    const fetchUserDetails = async () => {
      // Retrieve the token from SecureStore
      const fetchedToken = await SecureStore.getItemAsync("authToken");
      setToken(fetchedToken); // Set the token in state

      try {
        const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${fetchedToken}`, // Use fetchedToken here
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Removed token from dependency array

  // ... existing code for rendering user details ...
};

export default GetUserDetails;
