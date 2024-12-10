import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  RefreshControl,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import GetUserDetails from "../components/api/GetUserDetails";

const EditProfile = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create refs for the text inputs
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  // Focus states
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await GetUserDetails();

        // Pre-fill the form fields
        setFirstName(userData.firstname || "");
        setLastName(userData.lastname || "");
        setEmail(userData.email || "");
        // Don't set password as it's typically not returned from the API
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // Reset all fields to current user data instead of empty strings
    fetchUserData();
    Keyboard.dismiss();
    setRefreshing(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-text-sub font-pmedium">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="p-5 bg-gray-100"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-row items-center mb-12 pb-4 border-b-2 border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={20} color="#000" className="mr-2" />
        </TouchableOpacity>
        <Text className="text-lg font-pbold text-text-primary">
          Edit Profile
        </Text>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-pregular text-text-sub mb-1">
          First Name
        </Text>
        <TextInput
          className={`border ${
            firstNameFocused ? "border-my-blue-400" : "border-gray-300"
          } text-md rounded-xl p-3`}
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => setFirstNameFocused(true)} // Set focused state
          onBlur={() => setFirstNameFocused(false)} // Reset focused state
          returnKeyType="next" // Show "Next" button on keyboard
          onSubmitEditing={() => lastNameInput.current.focus()} // Move to last name input
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-pregular text-text-sub mb-1">
          Last Name
        </Text>
        <TextInput
          ref={lastNameInput} // Reference for last name input
          className={`border ${
            lastNameFocused ? "border-my-blue-400" : "border-gray-300"
          } text-md rounded-xl p-3`}
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => setLastNameFocused(true)} // Set focused state
          onBlur={() => setLastNameFocused(false)} // Reset focused state
          returnKeyType="next" // Show "Next" button on keyboard
          onSubmitEditing={() => emailInput.current.focus()} // Move to email input
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-pregular text-text-sub mb-1">Email</Text>
        <TextInput
          ref={emailInput} // Reference for email input
          className={`border ${
            emailFocused ? "border-my-blue-400" : "border-gray-300"
          } text-md rounded-xl p-3`}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocused(true)} // Set focused state
          onBlur={() => setEmailFocused(false)} // Reset focused state
          returnKeyType="next" // Show "Next" button on keyboard
          onSubmitEditing={() => passwordInput.current.focus()} // Move to password input
        />
      </View>

      {/* <View className="mb-4">
        <Text className="text-sm font-pregular text-text-sub mb-1">
          Password
        </Text>
        <TextInput
          ref={passwordInput} // Reference for password input
          className={`border ${
            passwordFocused ? "border-my-blue-400" : "border-gray-300"
          } text-md rounded-xl p-3`}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setPasswordFocused(true)} // Set focused state
          onBlur={() => setPasswordFocused(false)} // Reset focused state
          returnKeyType="done" // Show "Done" button on keyboard
          onSubmitEditing={Keyboard.dismiss} // Dismiss keyboard on submit
        />
      </View> */}

      <TouchableOpacity
        className="bg-my-blue w-full py-3 rounded-xl mt-8"
        activeOpacity={0.7}
      >
        <Text className="text-white text-center font-psemibold">
          Edit Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
