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
            <View className="mb-32">
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

            <View className="w-full mb-4">
              <Text className="text-sm font-pregular text-text-sub mb-2">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Email Address"
                className={`border ${
                  emailFocused ? "border-my-blue-400" : "border-gray-300"
                } text-md rounded-xl p-3`}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            <View className="w-full mb-4">
              <Text className="text-sm font-pregular text-text-sub mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter Password"
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
              <Text className="text-text-primary font-pregular mb-4 self-end">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-my-blue w-full py-4 rounded-xl mb-4"
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-semibold font-psemibold">
                Login
              </Text>
            </TouchableOpacity>

            <Text className="text-text-sub font-pregular text-center">
              Didn't have an account?{" "}
              <Link
                href="/home"
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
