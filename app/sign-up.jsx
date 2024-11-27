import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  RefreshControl,
  BackHandler,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function SignUp() {
  const [step, setStep] = useState(1); // Track the current step
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  // Create refs for the input fields
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or any refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 1500); // Adjust the timeout as needed
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3); // Add step 3
    } else {
      // Handle final submission (actual account creation)
      console.log("Creating Account", {
        firstName,
        lastName,
        email,
        password,
        department,
        shift,
      });
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  };

  // Modify the useEffect for back button handling
  useEffect(() => {
    const backAction = () => {
      if (step > 1) {
        handleBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [step]);

  // Add this function to render information items
  const InfoItem = ({ label, value }) => (
    <View className="mb-4">
      <Text className="text-sm font-pregular text-text-sub mb-1">{label}</Text>
      <View className="border border-gray-300 rounded-xl p-3">
        <Text className="text-md font-pregular">
          {value || "Not specified"}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={handlePressOutside}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View className="w-full min-h-full px-6 pt-8">
            <View className="mb-12">
              <Text className="font-pextrabold text-3xl text-text-header">
                {step === 1
                  ? "Create Your 👨‍💼 Attendease Account"
                  : step === 2
                  ? "Select Your Details 📋"
                  : "Review Your Information ✓"}
              </Text>
              <Text className="text-md font-pregular pt-2 text-text-sub">
                {step === 1
                  ? "Register to continue"
                  : step === 2
                  ? "Almost there, complete your registration"
                  : "Please review your information before creating your account"}
              </Text>
            </View>

            {step === 1 ? (
              <>
                {/* First Name */}
                <View className="w-full mb-4">
                  <Text className="text-sm font-pregular text-text-sub mb-1">
                    First Name
                  </Text>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Enter First Name"
                    className="border border-gray-300 text-md rounded-xl p-3"
                    returnKeyType="next" // Show "Next" on keyboard
                    onSubmitEditing={() => lastNameRef.current.focus()} // Focus on last name input
                  />
                </View>

                {/* Last Name */}
                <View className="w-full mb-4">
                  <Text className="text-sm font-pregular text-text-sub mb-1">
                    Last Name
                  </Text>
                  <TextInput
                    ref={lastNameRef} // Assign ref
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Enter Last Name"
                    className="border border-gray-300 text-md rounded-xl p-3"
                    returnKeyType="next" // Show "Next" on keyboard
                    onSubmitEditing={() => emailRef.current.focus()} // Focus on email input
                  />
                </View>

                {/* Email Address */}
                <View className="w-full mb-4">
                  <Text className="text-sm font-pregular text-text-sub mb-1">
                    Email Address
                  </Text>
                  <TextInput
                    ref={emailRef} // Assign ref
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter Email Address"
                    className="border border-gray-300 text-md rounded-xl p-3"
                    returnKeyType="next" // Show "Next" on keyboard
                    onSubmitEditing={() => passwordRef.current.focus()} // Focus on password input
                  />
                </View>

                {/* Password */}
                <View className="w-full mb-4">
                  <Text className="text-sm font-pregular text-text-sub mb-1">
                    Password
                  </Text>
                  <View className="relative">
                    <TextInput
                      ref={passwordRef} // Assign ref
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter Password"
                      secureTextEntry={!showPassword} // Toggle visibility
                      className="border border-gray-300 text-md rounded-xl p-3"
                      returnKeyType="next" // Show "Next" on keyboard
                      onSubmitEditing={() => confirmPasswordRef.current.focus()} // Focus on confirm password input
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
                      style={{ position: "absolute", right: 10, top: 10 }} // Position the eye icon
                    >
                      <Image
                        source={showPassword ? icons.eyeHide : icons.eye} // Change icon based on visibility
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Confirm Password */}
                <View className="w-full mb-6">
                  <Text className="text-sm font-pregular text-text-sub mb-1">
                    Confirm Password
                  </Text>
                  <View className="relative">
                    <TextInput
                      ref={confirmPasswordRef} // Assign ref
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Enter Confirm Password"
                      secureTextEntry={!showConfirmPassword} // Toggle visibility
                      className="border border-gray-300 text-md rounded-xl p-3"
                      returnKeyType="done" // Show "Done" on keyboard
                      onSubmitEditing={handleNext} // Call handleNext on submit
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      } // Toggle password visibility
                      style={{ position: "absolute", right: 10, top: 10 }} // Position the eye icon
                    >
                      <Image
                        source={showConfirmPassword ? icons.eyeHide : icons.eye} // Change icon based on visibility
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  className="border-2 border-my-blue w-full py-3 rounded-xl mb-4"
                  onPress={handleNext}
                >
                  <Text className="text-my-blue text-center font-semibold">
                    Next
                  </Text>
                </TouchableOpacity>

                {/* Already have an account? Login */}
                <Text className="text-center font-pregular text-text-sub">
                  Already have an account?{" "}
                  <Link href="/" className="text-my-blue-500 underline">
                    Login
                  </Link>
                </Text>
              </>
            ) : step === 2 ? (
              <>
                {/* Back Button */}
                <TouchableOpacity
                  onPress={handleBack}
                  className="mb-8 flex-row items-center"
                >
                  <Image
                    source={icons.arrow}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                </TouchableOpacity>

                {/* Message indicating optional fields */}
                <Text className="text-md font-pmedium text-text-sub mb-8">
                  You can leave these fields blank if not applicable.
                </Text>

                {/* Department Dropdown */}
                <View className="w-full mb-4">
                  <Text className="text-sm font-pregular text-text-sub mb-1">
                    Department
                  </Text>
                  <View className="border border-gray-300 rounded-xl">
                    <Picker
                      selectedValue={department}
                      onValueChange={(itemValue) => setDepartment(itemValue)}
                      style={{ height: 55, width: "100%" }}
                    >
                      <Picker.Item label="Select Department" value="" />
                      <Picker.Item label="HR" value="HR" />
                      <Picker.Item label="IT" value="IT" />
                      <Picker.Item label="Sales" value="Sales" />
                      <Picker.Item label="Marketing" value="Marketing" />
                    </Picker>
                  </View>
                </View>

                {/* Shift Dropdown */}
                <View className="w-full mb-6">
                  <Text className="text-sm font-pregular text-text-sub mb-1">
                    Shift
                  </Text>
                  <View className="border border-gray-300 rounded-xl">
                    <Picker
                      selectedValue={shift}
                      onValueChange={(itemValue) => setShift(itemValue)}
                      style={{ height: 55, width: "100%" }}
                    >
                      <Picker.Item label="Select Shift" value="" />
                      <Picker.Item label="Morning" value="Morning" />
                      <Picker.Item label="Afternoon" value="Afternoon" />
                      <Picker.Item label="Night" value="Night" />
                    </Picker>
                  </View>
                </View>

                <TouchableOpacity
                  className="border-2 border-my-blue w-full py-3 rounded-xl mb-4"
                  onPress={handleNext}
                >
                  <Text className="text-my-blue text-center font-semibold">
                    Next
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Back Button */}
                <TouchableOpacity
                  onPress={handleBack}
                  className="mb-8 flex-row items-center"
                >
                  <Image
                    source={icons.arrow}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                </TouchableOpacity>

                {/* Display all information */}
                <InfoItem label="First Name" value={firstName} />
                <InfoItem label="Last Name" value={lastName} />
                <InfoItem label="Email Address" value={email} />
                <InfoItem label="Department" value={department} />
                <InfoItem label="Shift" value={shift} />

                {/* Create Account Button */}
                <TouchableOpacity
                  className="bg-my-blue w-full py-3 rounded-xl mb-4 mt-6"
                  onPress={handleNext}
                >
                  <Text className="text-white text-center font-semibold">
                    Create Account
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <StatusBar backgroundColor="#1b5dda" barStyle="light" />
    </SafeAreaView>
  );
}
