import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const LabelInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showPassword,
  togglePasswordVisibility,
  inputRef,
  onSubmitEditing,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View className="w-full mb-4">
      <Text className="text-sm font-pregular text-text-sub mb-1">{label}</Text>
      <View className="relative">
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          className={`border ${
            isFocused ? "border-my-blue-400" : "border-gray-300"
          } text-md rounded-xl p-3`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LabelInput;
