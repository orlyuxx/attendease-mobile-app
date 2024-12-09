import React, { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "../constants"; // Import icons
import { API_BASE_URL } from "../constants/index.js"; // Import API base URL
import * as SecureStore from "expo-secure-store"; // Import SecureStore

const LoginInput = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onFocus,
      onBlur,
      isFocused,
      secureTextEntry,
      returnKeyType,
      onSubmitEditing,
    },
    ref
  ) => {
    return (
      <View className="w-full mb-4">
        <Text className="text-sm font-pregular text-text-sub mb-1">
          {label}
        </Text>
        <View className="flex-row items-center">
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            className={`border ${
              isFocused ? "border-my-blue-400" : "border-gray-300"
            } text-md rounded-xl p-3 flex-1 pr-10`}
            onFocus={onFocus}
            onBlur={onBlur}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            placeholder={secureTextEntry ? "Password" : "Email"}
          />
        </View>
      </View>
    );
  }
);

export default LoginInput;
