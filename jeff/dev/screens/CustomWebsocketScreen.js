import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { useWebSocket, ReadyState } from "react-use-websocket";

const WebSocketExample = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // Replace 'ws://echo.websocket.org' with your WebSocket server URL
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://172.104.112.109:8765"
  );

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  // Add new messages to the list when received
  React.useEffect(() => {
    if (lastMessage !== null) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message: lastMessage.data },
      ]);
    }
  }, [lastMessage]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
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
      <Button title="Send" onPress={handleSend} />
      <View style={{ flex: 1 }}>
        <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
          Received Messages:
        </Text>
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
    </View>
  );
};

export default WebSocketExample;
