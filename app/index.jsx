import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../constants";
import { Link } from "expo-router";
import { hide } from "expo-splash-screen";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const passwordInputRef = React.useRef(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setEmail("");
    setPassword("");
    setEmailFocused(false);
    setPasswordFocused(false);
    Keyboard.dismiss();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handlePressOutside = () => {
    Keyboard.dismiss();
    setEmailFocused(false);
    setPasswordFocused(false);
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={handlePressOutside}
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View className="w-full min-h-full px-6 pt-8">
            <View>
              <Text className="font-pextrabold text-3xl text-text-header">
                Welcome Back 👋
              </Text>
              <Text className="font-pextrabold text-3xl text-text-header">
                to Attendease
              </Text>
              <Text className="text-md font-pregular pt-2 text-text-sub">
                Hello there, login to continue
              </Text>
            </View>

            <View className="items-center">
              <Image
                source={images.employee}
                className="w-64 h-64"
                resizeMode="contain"
              />
            </View>

            <View className="w-full mb-4">
              <Text className="text-sm font-pregular text-text-sub mb-1">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className={`border ${
                  emailFocused ? "border-my-blue-400" : "border-gray-300"
                } text-md rounded-xl p-3`}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  setTimeout(() => {
                    passwordInputRef.current.focus();
                  }, 0.5);
                }}
              />
            </View>

            <View className="w-full mb-2">
              <Text className="text-sm font-pregular text-text-sub mb-1">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  ref={passwordInputRef}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  className={`border ${
                    passwordFocused ? "border-my-blue-400" : "border-gray-300"
                  } rounded-xl p-3 pr-10`}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  <Image
                    source={passwordVisible ? icons.eye : icons.eyeHide}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="mb-2 self-end">
              <Text className="text-text-sub font-pregular mb-2 self-end">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-my-blue w-full py-3 rounded-xl mb-4"
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-semibold font-psemibold">
                Login
              </Text>
            </TouchableOpacity>

            <Text className="text-text-sub font-pregular text-center">
              Didn't have an account?{" "}
              <Link
                href="/sign-up"
                className=" font-pregular text-my-blue-500 underline"
              >
                Register
              </Link>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <StatusBar backgroundColor="#1b5dda" barStyle="light" />
    </SafeAreaView>
  );
}
