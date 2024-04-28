import React from "react";
import { Notifications } from "react-native-push-notification";
import { Text, View } from "react-native";
import MessagesScreen from "@src/containers/Custom/MessagesScreen";
// import { getExternalCodeSetup } from "@src/externalCode/externalRepo";
// const externalCodeSetup = getExternalCodeSetup();
import axios from "axios";

const MyCustomScreen = (props) => {
  // Notifications.addListener(handleNotification);
  // const handleNotification = (notification) => {
  //   console.log("Received notification:", notification);
  //   // Handle the notification as needed
  // };

  let instance;
  if (axios.defaults) {
    instance = axios;
    console.log("AN AXIOS INSTANCE IS ALREADY PRESENT");
    instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        // console.log("INTERCEPTED : ", JSON.stringify(config));
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log("Response : ", JSON.stringify(response));
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MessagesScreen
        {...props}
        screenTitle="My Messages"
        hideNavigationHeader={true}
      />
      <Text>Hello from Custom Message Screen</Text>
    </View>
  );
};

export default MyCustomScreen;
