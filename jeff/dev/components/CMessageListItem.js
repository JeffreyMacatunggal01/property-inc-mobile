import { CustomMessage } from "../types/CustomMessage";
import { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

class CustomMessageListItem {
  constructor(message) {
    this.message = message;
  }
}

const CustomMessageListItem = ({ message }) => {
  console.log("Re-rendering: ", message.id);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{message.name}</Text>
      <Image source={{ uri: message.image }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
  },
  name: {
    height: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "darkslategrey",
    alignSelf: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
