import React from "react";
import ReadMore from "@src/components/ReadMore";
import HTML from "react-native-render-html";
import htmlclean from "htmlclean";
import { Text, View } from "react-native";
import RenderHtml from "react-native-render-html";

const ThreadItemText = (props) => {
  const { message, global, thread, item, size, t } = props;
  const lastMessageId = thread.lastMessage.id;

  var marginBot = 2;
  if (item.id === lastMessageId) {
    marginBot = 100;
  }
  // console.log("ITEM HERE: ");
  // console.log("ITEM ID : " + item.id + " LAST ITEM ID : " + lastMessageId);
  // // console.log(item.id);
  const source = {
    html: message.message
  };

  return (
    <View
      style={[
        global.row,
        {
          justifyContent: "space-between",
          marginBottom: marginBot,
          marginTop: 2,
        },
      ]}
    >
      <RenderHtml source={ source } />
    </View>
  );
};

export default ThreadItemText;
