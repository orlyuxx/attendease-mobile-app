import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6 mt-4"
      />
      {/* <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        numberOfLines={1}
        ellipsizeMode="tail"
      ></Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#1b5dda" barStyle="light-content" />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: { width: 120 },
          tabBarStyle: {
            // borderTopLeftRadius: 30,
            // borderTopRightRadius: 30,
            // borderTopWidth: 1, // Add border width
            // borderTopColor: "#000000", // Set border color
            position: "absolute",
            overflow: "hidden",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 3,
            shadowRadius: 6,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={focused ? "#1b5dda" : color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="leaves"
          options={{
            title: "Leave",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.leave}
                color={focused ? "#1b5dda" : "#71717A"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.history}
                color={focused ? "#1b5dda" : "#71717A"}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={focused ? "#1b5dda" : "#71717A"}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
