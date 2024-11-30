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
import LoginInput from "../components/LoginInput";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
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

  const handleLogin = () => {
    router.push("/(tabs)/home");
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
                setTimeout(() => {
                  passwordInputRef.current.focus();
                }, 0.5);
              }}
            />

            <LoginInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              isFocused={passwordFocused}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              secureTextEntry={!passwordVisible}
              inputRef={passwordInputRef}
            />

            <TouchableOpacity className="mb-2 self-end">
              <Text className="text-text-sub font-pregular mb-2 self-end">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-my-blue w-full py-3 rounded-xl mb-4"
              activeOpacity={0.7}
              onPress={handleLogin}
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
      <StatusBar backgroundColor="#1b5dda" barStyle="light-content" />
    </SafeAreaView>
  );
}
