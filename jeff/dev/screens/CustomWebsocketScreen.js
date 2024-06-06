import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import useWebSocket, { ReadyState } from "react-use-websocket";

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from "react-native-webrtc";

const WebSocketExample = () => {
  const [socketUrl, setSocketUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // WebRTC
  const [peerConnection, setPeerConnection] = useState(null);
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("Connected to signaling server");
      //   sendMessage(JSON.stringify({ type: "register", username }));
      // sendMessage("Hello server");
    },
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      console.log("Data : ", data);

      if (lastMessage !== null) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), message: lastMessage.data },
        ]);
      }

      //   handleSignalingData(data);
      // Add new messages to the list when received
      //   React.useEffect(() => {
      //     if (lastMessage !== null) {
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { id: Date.now(), message: lastMessage.data },
      // ]);
      //     }
      //   }, [lastMessage]);
    },
    shouldReconnect: (closeEvent) => true, // Auto-reconnect on disconnect
  });

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const initWebSocket = () => {
    setSocketUrl("ws://172.104.112.109:8765");
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // WebRTC
  const initPeerConnection = async () => {
    // const stream = await mediaDevices.getUserMedia({
    //   audio: true,
    //   video: true,
    // });
    // setLocalStream(stream);

    try {
      const pc = new RTCPeerConnection();

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("ICE CANDIDATE : ", event.candidate);

          // sendMessage(
          //   JSON.stringify({
          //     type: "candidate",
          //     candidate: event.candidate,
          //     sender: username,
          //     recipient,
          //   })
          // );
        }
      };

      console.log("RTC PC created");
    } catch (err) {
      console.log("Error", err);
    }

    //   {
    //   iceServers: [
    //     { urls: "stun:webrtc.icodeph.com:2096" }, //3478
    //     {
    //       urls: "turn:webrtc.icodeph.com:2096",
    //       username: "vinz1992",
    //       credential: "12341234",
    //     },
    //   ],
    // });

    // stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // pc.ontrack = (event) => {
    //   console.log("Remote stream received:", event.streams[0]);
    // };

    // setPeerConnection(pc);
  };

  //   const [inputValue, setInputValue] = useState("");
  //   const [messages, setMessages] = useState([]);

  //   // Replace 'ws://echo.websocket.org' with your WebSocket server URL
  //   const { sendMessage, lastMessage, readyState } = useWebSocket(
  //     "ws://172.104.112.109:8765"
  //   );

  //   const handleSend = () => {
  //     if (inputValue.trim() !== "") {
  //       sendMessage(inputValue);
  //       setInputValue("");
  //     }
  //   };

  // // Add new messages to the list when received
  // React.useEffect(() => {
  //   if (lastMessage !== null) {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { id: Date.now(), message: lastMessage.data },
  //     ]);
  //   }
  // }, [lastMessage]);

  //   return (
  //     <View style={{ flex: 1, padding: 20 }}>
  // <TextInput
  //   style={{
  //     height: 40,
  //     borderColor: "gray",
  //     borderWidth: 1,
  //     marginBottom: 10,
  //   }}
  //   onChangeText={(text) => setInputValue(text)}
  //   value={inputValue}
  //   placeholder="Type your message"
  // />
  //       <Button title="Send" onPress={handleSend} />
  //       <View style={{ flex: 1 }}>
  //         <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
  //           Received Messages:
  //         </Text>
  //   <FlatList
  //     data={messages}
  //     renderItem={({ item }) => (
  //       <Text
  //         style={{
  //           padding: 10,
  //           borderBottomWidth: 1,
  //           borderBottomColor: "#ccc",
  //         }}
  //       >
  //         {item.message}
  //       </Text>
  //     )}
  //     keyExtractor={(item) => item.id.toString()}
  //   />
  //       </View>
  //     </View>
  //   );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>TEST HERE</Text>
        <Text>WebSocket Status: {connectionStatus}</Text>
        <Button title="Initialize WebSocket" onPress={initWebSocket} />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          placeholder="Type your message"
        />
        <Button title="Send Message" onPress={handleSend} />
        <Button title="Test WEBRTC" onPress={initPeerConnection} />
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Text
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              {item.message}
            </Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default WebSocketExample;
