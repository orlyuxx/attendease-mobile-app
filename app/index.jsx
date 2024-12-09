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
import { images } from "../constants";
import { Link } from "expo-router";
import LoginInput from "../components/LoginInput";
import { useRouter } from "expo-router";
import { handleLogin } from "../components/api/HandleLogin";
import Toast from "react-native-toast-message";

export default function App() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const passwordInputRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const onLoginPress = async () => {
    try {
      setIsLoading(true);
      await handleLogin(router, email, password);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "An error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
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

            <View className="items-center my-4">
              <Image
                source={images.employee}
                className="w-64 h-64"
                resizeMode="contain"
              />
            </View>

            <LoginInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              isFocused={emailFocused}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current.focus();
              }}
            />

            <LoginInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              isFocused={passwordFocused}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              secureTextEntry={true}
              ref={passwordInputRef}
            />

            <TouchableOpacity className="mb-2 self-end">
              <Text className="text-text-sub font-pregular mb-2 self-end">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`bg-my-blue w-full py-3 rounded-xl mb-4 ${
                isLoading ? "opacity-70" : ""
              }`}
              activeOpacity={0.7}
              onPress={onLoginPress}
              disabled={isLoading}
            >
              <Text className="text-white text-center font-semibold font-psemibold">
                {isLoading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>

            <Text className="text-text-sub font-pregular text-center">
              Didn't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-pregular text-my-blue-500 underline"
              >
                Register
              </Link>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <StatusBar backgroundColor="#1b5dda" barStyle="light-content" />
      <Toast />
    </SafeAreaView>
  );
}
