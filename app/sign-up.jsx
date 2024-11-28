import {
  View,
  Text,
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
import SignUpInput from "../components/SignUpInput";
import InfoItem from "../components/ui/InfoItem";
import DropdownInput from "../components/ui/DropdownInput";
import SignUpHeader from "../components/SignUpHeader";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Dismiss the keyboard
    Keyboard.dismiss();

    // Reset input fields to initial values
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDepartment("");
    setShift("");

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate required fields
      // if (!firstName || !lastName || !email || !password || !confirmPassword) {
      //   alert("Please fill in all required fields.");
      //   return; // Prevent moving to the next step
      // }
      // if (password !== confirmPassword) {
      //   alert("Passwords do not match.");
      //   return; // Prevent moving to the next step
      // }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
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
            <SignUpHeader step={step} />

            {step === 1 ? (
              <>
                <SignUpInput
                  label={
                    <Text>
                      First Name<Text className="text-red-500">*</Text>
                    </Text>
                  }
                  value={firstName}
                  onChangeText={setFirstName}
                  inputRef={null}
                  onSubmitEditing={() => lastNameRef.current.focus()}
                />
                <SignUpInput
                  label={
                    <Text>
                      Last Name<Text className="text-red-500">*</Text>
                    </Text>
                  }
                  value={lastName}
                  onChangeText={setLastName}
                  inputRef={lastNameRef}
                  onSubmitEditing={() => emailRef.current.focus()}
                />
                <SignUpInput
                  label={
                    <Text>
                      Email Address<Text className="text-red-500">*</Text>
                    </Text>
                  }
                  value={email}
                  onChangeText={setEmail}
                  inputRef={emailRef}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
                <SignUpInput
                  label={
                    <Text>
                      Password<Text className="text-red-500">*</Text>
                    </Text>
                  }
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  showPassword={showPassword}
                  togglePasswordVisibility={() =>
                    setShowPassword(!showPassword)
                  }
                  inputRef={passwordRef}
                  onSubmitEditing={() => confirmPasswordRef.current.focus()}
                />
                <SignUpInput
                  label={
                    <Text className="font-medium text-md">
                      Confirm Password<Text className="text-red-500">*</Text>
                    </Text>
                  }
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                  showPassword={showConfirmPassword}
                  togglePasswordVisibility={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  inputRef={confirmPasswordRef}
                  onSubmitEditing={handleNext}
                />

                <TouchableOpacity
                  className="border-2 border-my-blue-500 w-full py-3 rounded-xl mt-4 mb-4"
                  onPress={handleNext}
                >
                  <Text className="text-my-blue-500 text-center font-semibold">
                    Next
                  </Text>
                </TouchableOpacity>

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
                  className="mb-12 flex-row items-center"
                >
                  <Image
                    source={icons.arrow}
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                </TouchableOpacity>

                {/* Department Dropdown */}
                <DropdownInput
                  label="Department"
                  selectedValue={department}
                  onValueChange={setDepartment}
                  items={[
                    { label: "Select Department", value: "" },
                    { label: "HR", value: "HR" },
                    { label: "IT", value: "IT" },
                    { label: "Sales", value: "Sales" },
                    { label: "Marketing", value: "Marketing" },
                  ]}
                />

                {/* Shift Dropdown */}
                <DropdownInput
                  label="Shift"
                  selectedValue={shift}
                  onValueChange={setShift}
                  items={[
                    { label: "Select Shift", value: "" },
                    { label: "Morning", value: "Morning" },
                    { label: "Afternoon", value: "Afternoon" },
                    { label: "Night", value: "Night" },
                  ]}
                />

                <TouchableOpacity
                  className="border-2 border-my-blue-500 w-full py-3 rounded-xl mt-4"
                  onPress={handleNext}
                >
                  <Text className="text-my-blue-500 text-center font-semibold">
                    Next
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* Back Button */}
                <TouchableOpacity
                  onPress={handleBack}
                  className="mb-12 flex-row items-center"
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
                  className="bg-my-blue w-full py-3 rounded-xl mt-4 mb-4"
                  activeOpacity={0.7}
                >
                  <Text className="text-white text-center font-semibold font-psemibold">
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
