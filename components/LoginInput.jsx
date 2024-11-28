// app/components/LoginInput.jsx
import React from "react";
import { View, Text, TextInput } from "react-native";

const LoginInput = ({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  secureTextEntry,
  returnKeyType,
  onSubmitEditing,
  inputRef,
}) => {
  return (
    <View className="w-full mb-4">
      <Text className="text-sm font-pregular text-text-sub mb-1">{label}</Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className={`border ${
          isFocused ? "border-my-blue-400" : "border-gray-300"
        } text-md rounded-xl p-3`}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default LoginInput;
