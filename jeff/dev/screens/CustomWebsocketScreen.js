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
  RTCView,
} from "react-native-webrtc";

const WebSocketExample = () => {
  const [socketUrl, setSocketUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // WebRTC
  const [stream, setStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("Connected to signaling server");
      //   sendMessage(JSON.stringify({ type: "register", username }));
      sendMessage("Hello server");
    },
    onMessage: (event) => {
      console.log("event : ", event);

      // const data = JSON.parse(event.data);
      // console.log("Data : ", data);

      // if (lastMessage !== null) {
      //   setMessages((prevMessages) => [
      //     ...prevMessages,
      //     { id: Date.now(), message: lastMessage.data },
      //   ]);
      // }

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

  const start = async () => {
    console.log("start");
    if (!stream) {
      try {
        const s = await mediaDevices.getUserMedia({ video: true });
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    } else{
      console.log("Stream error!")
    }
  };

  const stop = () => {
    console.log("stop");
    if (stream) {
      stream.release();
      setStream(null);
    }
  };

  const initPeerConnection = async () => {

    start();
    // const stream = await mediaDevices.getUserMedia({
    //   audio: true,
    //   video: true,
    // });
    // setLocalStream(stream);

    try {
      const configuration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }, // Example STUN server
        ],
      };

      // Create the RTCPeerConnection
      const peerConnection = new RTCPeerConnection(configuration);

      peerConnection.addEventListener("connectionstatechange", (event) => {
        console.log("STATE CHANGES!");
        switch (peerConnection.connectionState) {
          case "closed":
            // You can handle the call being disconnected here.

            break;
        }
      });

      console.log("Peer : ", peerConnection);

      // peerConnection.onicecandidate = (event) => {
      //   if (event.candidate) {
      //     console.log("ICE Candidate:", event.candidate);
      //     // Handle the ICE candidate
      //   } else {
      //     console.log("All ICE candidates have been sent");
      //   }
      // };

      // const pc = new RTCPeerConnection({
      //   iceServers: [
      //     { urls: "stun:172.104.112.109:2096" }, //3478
      //     {
      //       urls: "turn:172.104.112.109:2096",
      //       username: "vinz1992",
      //       credential: "12341234",
      //     },
      //   ],
      // });

      // console.log("PC : ", pc);

      // // stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      // pc.onicecandidate = (event) => {
      //   console.log("Ice candidate event");
      //   if (event.candidate) {
      //     sendMessage(
      //       JSON.stringify({
      //         type: "candidate",
      //         candidate: event.candidate,
      //         sender: username,
      //         recipient,
      //       })
      //     );

      //     console.log("EVENT : ", event.candidate);
      //   }
      // };

      console.log("RTC PC created");
      setPeerConnection(peerConnection);
    } catch (err) {
      console.log("Error", err);
    }

    // stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // pc.ontrack = (event) => {
    //   console.log("TRACK EVENT");
    //   // console.log("Remote stream received:", event.streams[0]);
    // };

    // setPeerConnection(pc);
  };

  const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log("OFFER : ", offer);
    sendMessage(JSON.stringify({ ...offer, type: "offer" }));
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
        <Button title="Create Offer" onPress={createOffer} />
        <SafeAreaView>
          {stream && <RTCView streamURL={stream.toURL()} />}
        </SafeAreaView>
        {/* <FlatList
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
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default WebSocketExample;
