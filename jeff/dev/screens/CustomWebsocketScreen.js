import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
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
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");

  // holds the websocket object
  const [socketObj, setSocketObj] = useState(null);
  // holds the webrtcpeerconnection
  const [peerConnectionObj, setPeerConnectionObj] = useState(null);
  // Will handle the local stream
  const [localStream, setLocalStream] = useState(null);
  // Will handle the remote stream
  const [remoteStream, setRemoteStream] = useState(null);
  // Will handle websocket status

  // logic for initializing websocket
  const startWebsocket = () => {
    setSocketObj("ws://172.104.112.109:8765");
  };

  // Logic to send message to websocket
  const { sendMessage, lastMessageV2, readyState } = useWebSocket(socketObj, {
    onOpen: () => {
      console.log("Successfully connected to Websocket/Signaling Server");
      sendMessage(username);
    },
    onMessage: (event) => {

      // On Message get the event type if  answer/offer/logged-in/message


      const data = JSON.parse(event.data);
      // console.log("Recv Data : ", event.data);
      // console.log("Event Data : ", JSON.stringify(event));
      console.log("DAta : ", data);
      // console.log("EVENT : ", JSON.stringify(event));
      // const data = JSON.parse(JSON.stringify(event));
      // Now you can access data as a JavaScript object
      // console.log(data);
      switch (data.type) {
        case "offer":
          console.log("Offer : ", data.offer);
          // remoteStream = MediaStream();
          break;
        case "answer":
          console.log("Answer : ", event);
          break;
        case "candidate":
          console.log("Candidate : ", event);
          break;
        case "message":
          console.log("Message from WebSocket : ", data);
          break;
      }
    },
    shouldReconnect: (closeEvent) => true, // Auto-reconnect on disconnect
  });

  // logic initialize WebRTC
  const startWebRTC = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 640, // Provide your own width, height and frame rate here
          minHeight: 480,
          minFrameRate: 30,
        },
        facingMode: "user", // or 'environment' for rear camera
      },
    });
    setLocalStream(stream);

    const configuration = {
      iceServers: [
        { urls: "stun:172.104.112.109:2096" }, //3478
        {
          urls: "turn:172.104.112.109:2096",
          username: "vinz1992",
          credential: "12341234",
        },
      ],
    };

    // c       

    // Create the RTCPeerConnection
    const pc = new RTCPeerConnection(configuration);

    // Set tracks for stream
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // Handle event on icecandidate recv
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("LOGS CANDIDATE FOUND!: ", event.candidate);
        sendMessage(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
            sender: username,
            recipient,
          })
        );
      }
    };

    setPeerConnectionObj(pc);
  };

  // Handle making the IceCandidates and Offers
  const makeOffer = async () => {
    // Create an offer to be used by the callee
    const offer = await peerConnectionObj.createOffer();
    // set the offer as local description

    await peerConnectionObj.setLocalDescription(offer);
    // send offer to signalling server via websocket
    sendMessage(
      JSON.stringify({ ...offer, type: "offer", sender: username, recipient })
    );
    console.log("OFFER : ", offer);
  };

  // const checkLocalStream = async () => {
  //   console.log(localStream.toURL());
  // };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>TEST HERE</Text>
        <Text>WebSocket Status: {connectionStatus}</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={(text) => setRecipient(text)}
          value={recipient}
          placeholder="Recipient"
        />
        <Button title="Initialize WebSocket" onPress={startWebsocket} />
        <Button title="Test WEBRTC" onPress={startWebRTC} />
        <Button title="Create Offer" onPress={makeOffer} />
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.video}
            objectFit="cover"
            mirror={true}
          />
        )}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.video}
            objectFit="cover"
            mirror={true}
          />
        )}

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

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "50%",
    backgroundColor: "black",
  },
});

export default WebSocketExample;
