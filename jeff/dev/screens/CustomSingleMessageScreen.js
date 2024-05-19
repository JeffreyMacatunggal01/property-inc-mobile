import React, { useReducer, useState, useEffect } from "react";
// import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
// import Pusher from "pusher-js";
import axios from "axios";
// How to use react-redux within BuddyBoss App
// import needed modules
import { useSelector } from "react-redux";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
  View,
  Text,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});

const CustomSingleMessageScreen = (props) => {
  // within this props are
  // route, navigation & isFocused
  // {
  //   "navigation": {
  //   "isActive": true
  //   },
  //   "route": {
  //   "key": "MessagesCreatePostScreen-SySYcCXH3gGJZRa3Kmp23",
  //   "name": "MessagesCreatePostScreen",
  //   "params": {
  //   "item_id": 235
  //   }
  //   },
  //   "isFocused": true
  // }
  //

  // store interest
  // get selector to all messages fetch at MessageScreen
  const messages = useSelector((state) => state.messages);
  // const config = useSelector((state) => state.config);
  const auth = useSelector((state) => state.auth);
  // const firebase = useSelector((state) => state.firebase);
  const user = useSelector((state) => state.user);  
  // const user = state.user;

  useFocusEffect(
    React.useCallback(() => {
      console.log("This will run when the screen is focused");

      return () => {
        console.log("This will run when the screen goes out of focus");
        // Any cleanup actions if necessary
      };
    }, [])
  );



  // make sure the make one instance of axios only

  let instance;
  if (axios.defaults) {
    instance = axios;
    axios.defaults.headers.common["accessToken"] = auth.token;
  }

  // test ui for sending message
  const [inputValue, setInputValue] = useState("");

  const showState = async () => {
    console.log(state);
  };
  // handle sending message externally
  const handleButtonClick2 = async () => {
    await instance
      .get("https://property.inc/wp-json/buddyboss/v1/messages")
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  };

  // handle sending message externally
  const handleButtonClick = async () => {
    const data = {
      id: 328,
      message: `${inputValue}`,
    };

    await instance
      .post("https://property.inc/wp-json/buddyboss/v1/messages", data)
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
      });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue} // Update state with input changes
        placeholder="Message to send"
      />
      <Button title="Show State" onPress={showState} />
      <Button
        title="Post Message"
        onPress={handleButtonClick} // Handle button click
      />
      <Button onPress={handleButtonClick2} title="Get Messages" />

      <Button
        onPress={async () => {
          console.log(props);
        }}
        title="Socket"
      />
    </View>
  );
};

export default CustomSingleMessageScreen;
