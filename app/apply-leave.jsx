import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";

const LeaveRequestForm = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null); // To track which date input is selected

  const [isFocusedLeaveType, setIsFocusedLeaveType] = useState(false);
  const [isFocusedReason, setIsFocusedReason] = useState(false);

  const router = useRouter();
  const startDateRef = useRef(null); // Add this line to create a reference for the start date input

  // Function to refresh the page
  const onRefresh = () => {
    setIsRefreshing(true);
    // Dismiss the keyboard to remove focus from inputs
    Keyboard.dismiss();
    // Reset input values
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    // Reset focused states
    setIsFocusedLeaveType(false);
    setIsFocusedReason(false);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Simulate a network request
  };

  // Function to handle date selection
  const onDateSelect = (day) => {
    const selectedDate = day.dateString;
    if (selectedDateType === "start") {
      setStartDate(selectedDate);
    } else if (selectedDateType === "end") {
      setEndDate(selectedDate);
    }
    setIsCalendarVisible(false); // Close the calendar modal
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View className="flex-row items-center mb-12 pb-4 border-b-2 border-gray-200">
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="arrow-back" size={20} color="#000" className="mr-2" />
            </TouchableOpacity>
            <Text className="text-lg font-pbold text-text-primary">
              Apply Leave
            </Text>
          </View>

          {/* Leave Type Input */}
          <Text className="text-sm font-pregular text-text-sub mb-1">
            Leave Type
          </Text>
          <TextInput
            value={leaveType}
            onChangeText={setLeaveType}
            className={`border ${
              isFocusedLeaveType ? "border-my-blue-400" : "border-gray-300"
            } text-md rounded-xl p-4 mb-6`}
            onFocus={() => setIsFocusedLeaveType(true)}
            onBlur={() => setIsFocusedLeaveType(false)}
            returnKeyType="next" // Set return key type to "next"
            onSubmitEditing={() => startDateRef.current.focus()} // Focus next input
            ref={startDateRef} // Add this line to assign the ref to the TextInput
          />

          {/* Start Date Input */}
          <Text className="text-sm font-pregular text-text-sub mb-1">
            Start Date
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedDateType("start");
              setIsCalendarVisible(true);
            }}
          >
            <TextInput
              value={startDate}
              placeholder="Select Start Date"
              editable={false} // Make it non-editable
              className={`border border-gray-300 text-sm rounded-xl p-4 mb-6`}
            />
          </TouchableOpacity>

          {/* End Date Input */}
          <Text className="text-sm font-pregular text-text-sub mb-1">
            End Date
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedDateType("end");
              setIsCalendarVisible(true);
            }}
          >
            <TextInput
              value={endDate}
              placeholder="Select End Date"
              editable={false} // Make it non-editable
              className={`border border-gray-300 text-sm rounded-xl p-4 mb-6`}
            />
          </TouchableOpacity>

          {/* Reason for Leave Input */}
          <Text className="text-sm font-pregular text-text-sub mb-1">
            Reason for Leave
          </Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            multiline={true} // Enable multiline input
            numberOfLines={4} // Set initial number of lines
            style={{ height: 100, textAlignVertical: "top" }} // Adjust height and align text to top
            className={`border ${
              isFocusedReason ? "border-my-blue-400" : "border-gray-300"
            } text-md rounded-xl p-4 mb-8`}
            onFocus={() => setIsFocusedReason(true)}
            onBlur={() => setIsFocusedReason(false)}
            returnKeyType="done" // Set return key type to "done"
            onSubmitEditing={() => {
              // Handle submission logic here
              Keyboard.dismiss();
            }}
          />

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-my-blue w-full py-3 rounded-xl mb-4"
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-psemibold">
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarVisible}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-center items-center bg-gray-50 bg-opacity-200">
          <View className="bg-white rounded-lg p-4">
            <Calendar
              onDayPress={onDateSelect}
              markedDates={{
                [startDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "#3991f8",
                },
                [endDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "#3991f8",
                },
              }}
            />
            <TouchableOpacity
              onPress={() => setIsCalendarVisible(false)}
              className="font-pregular text-text-header text-md border-lg "
            >
              <Text className="font-pmedium text-text-header text-md rounded-lg border-2 border-my-blue-400 p-2 text-center">
                Close
              </Text>
              {/* Customize text style */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LeaveRequestForm;
