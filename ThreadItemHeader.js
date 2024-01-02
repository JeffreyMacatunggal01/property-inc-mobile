import React from "react";
import { Text, View } from "react-native";
import { FontWeights } from "@src/styles/global";

const getStatus = (item) => {
  const idWithAdmin = 1;

  if (item.sender_id === 1) {
    return "(Admin)";
  }

  return "";
};
const ThreadItemHeader = (props) => {
  const { message, global, thread, item } = props;
  const name = message.name;

  // console.log(message);
  const isCurrentUserSender = thread?.currentUserId === message?.user?.user_id;

  return (
    <View style={[global.row, { justifyContent: "space-between", marginBottom: 2, marginTop: 2 }]}>
      <Text
        style={[
          global.text,
          {
            fontWeight: isCurrentUserSender ? FontWeights.semiBold : FontWeights.normal,
            color: isCurrentUserSender ? "#000000" : "#21759B",
          },
        ]}
      >
        {name}
      </Text>
      <Text style={[global.itemLightMeta]}>{message.date}</Text>
    </View>
  );
};

export default ThreadItemHeader;
