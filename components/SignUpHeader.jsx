// app/components/Header.jsx
import React from "react";
import { View, Text } from "react-native";

const SignUpHeader = ({ step }) => (
  <View className="mb-12">
    <Text className="font-pextrabold text-2xl text-text-header">
      {step === 1
        ? "Create Your\nAttendease Account"
        : step === 2
        ? "Select Your Details"
        : "Review Your Information"}
    </Text>
    <Text className="text-md font-pregular pt-2 text-text-sub">
      {step === 1
        ? "Enter your basic information."
        : step === 2
        ? "Leave blank if not applicable."
        : "Check your details before proceeding."}
    </Text>
  </View>
);

export default SignUpHeader;
